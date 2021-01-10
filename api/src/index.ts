import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as telemetry from 'erxes-telemetry';
import * as express from 'express';
import * as fs from 'fs';
import * as helmet from 'helmet';
import { createServer } from 'http';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as request from 'request';
import { filterXSS } from 'xss';
import { initApolloServer } from './apolloClient';
import { buildFile } from './data/modules/fileExporter/exporter';
import { templateExport } from './data/modules/fileExporter/templateExport';
import {
  authCookieOptions,
  deleteFile,
  frontendEnv,
  getEnv,
  getSubServiceDomain,
  handleUnsubscription,
  readFileRequest,
  registerOnboardHistory
} from './data/utils';
import {
  updateContactsValidationStatus,
  updateContactValidationStatus
} from './data/verifierUtils';
import { connect, mongoStatus } from './db/connection';
import { Users } from './db/models';
import initWatchers from './db/watchers';
import { debugBase, debugExternalApi, debugInit } from './debuggers';
import {
  identifyCustomer,
  trackCustomEvent,
  trackViewPageEvent,
  updateCustomerProperty
} from './events';
import { initMemoryStorage } from './inmemoryStorage';
import { initBroker } from './messageBroker';
import { importer, uploader } from './middlewares/fileMiddleware';
import userMiddleware from './middlewares/userMiddleware';
import webhookMiddleware from './middlewares/webhookMiddleware';
import widgetsMiddleware from './middlewares/widgetsMiddleware';
import init from './startup';

// load environment variables
dotenv.config();

const { NODE_ENV, JWT_TOKEN_SECRET } = process.env;

if (!JWT_TOKEN_SECRET) {
  throw new Error('Please configure JWT_TOKEN_SECRET environment variable.');
}

const pipeRequest = (req: any, res: any, next: any, url: string) => {
  return req.pipe(
    request
      .post(url)
      .on('response', response => {
        if (response.statusCode !== 200) {
          return next(response.statusMessage);
        }

        return response.pipe(res);
      })
      .on('error', e => {
        debugExternalApi(`Error from pipe ${e.message}`);
        next(e);
      })
  );
};

const handleTelnyxWebhook = (req, res, next, hookName: string) => {
  const ENGAGES_API_DOMAIN = getSubServiceDomain({
    name: 'ENGAGES_API_DOMAIN'
  });

  if (NODE_ENV === 'test') {
    return res.json(req.body);
  }

  return pipeRequest(
    req,
    res,
    next,
    `${ENGAGES_API_DOMAIN}/telnyx/${hookName}`
  );
};

const MAIN_APP_DOMAIN = getEnv({ name: 'MAIN_APP_DOMAIN' });
const WIDGETS_DOMAIN = getSubServiceDomain({ name: 'WIDGETS_DOMAIN' });
const INTEGRATIONS_API_DOMAIN = getSubServiceDomain({
  name: 'INTEGRATIONS_API_DOMAIN'
});
const CLIENT_PORTAL_DOMAIN = getSubServiceDomain({
  name: 'CLIENT_PORTAL_DOMAIN'
});
const DASHBOARD_DOMAIN = getSubServiceDomain({
  name: 'DASHBOARD_DOMAIN'
});

export const app = express();

Sentry.init({
  dsn:
    process.env.NODE_ENV === 'development'
      ? 'https://8e173a20ee1147a9a12cce71f62a8188@sentry.erxes.io/5'
      : 'https://369f3d770a2a4cfd820cd1958ab34f5a@sentry.erxes.io/8',

  integrations: [
    new Tracing.Integrations.Mongo(),
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({
      // to trace all requests to the default router
      app
      // alternatively, you can specify the routes you want to trace:
      // router: someRouter,
    })
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.disable('x-powered-by');

// handle engage trackers
app.post(`/service/engage/tracker`, async (req, res, next) => {
  const ENGAGES_API_DOMAIN = getSubServiceDomain({
    name: 'ENGAGES_API_DOMAIN'
  });

  debugBase('SES notification received ======');

  return pipeRequest(
    req,
    res,
    next,
    `${ENGAGES_API_DOMAIN}/service/engage/tracker`
  );
});

app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    limit: '15mb'
  })
);

// relay telnyx sms web hook
app.post(`/telnyx/webhook`, (req, res, next) => {
  return handleTelnyxWebhook(req, res, next, 'webhook');
});

// relay telnyx sms web hook fail over url
app.post(`/telnyx/webhook-failover`, (req, res, next) => {
  return handleTelnyxWebhook(req, res, next, 'webhook-failover');
});

app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: [
    MAIN_APP_DOMAIN,
    WIDGETS_DOMAIN,
    CLIENT_PORTAL_DOMAIN,
    DASHBOARD_DOMAIN
  ]
};

app.use(cors(corsOptions));

app.use(helmet({ frameguard: { action: 'sameorigin' } }));

app.get('/initial-setup', async (req: any, res) => {
  const userCount = await Users.countDocuments();

  if (userCount === 0) {
    return res.send('no owner');
  }

  const envMaps = JSON.parse(req.query.envs || '{}');

  for (const key of Object.keys(envMaps)) {
    res.cookie(key, envMaps[key], authCookieOptions(req.secure));
  }

  return res.send('success');
});

app.post('/webhooks/:id', webhookMiddleware);
app.get('/script-manager', cors({ origin: '*' }), widgetsMiddleware);

// events
app.post('/events-receive', async (req, res) => {
  const { name, customerId, attributes } = req.body;

  try {
    const response =
      name === 'pageView'
        ? await trackViewPageEvent({ customerId, attributes })
        : await trackCustomEvent({ name, customerId, attributes });
    return res.json(response);
  } catch (e) {
    debugBase(e.message);
    return res.json({ status: 'success' });
  }
});

app.post('/events-identify-customer', async (req, res) => {
  const { args } = req.body;

  try {
    const response = await identifyCustomer(args);
    return res.json(response);
  } catch (e) {
    debugBase(e.message);
    return res.json({});
  }
});

app.post('/events-update-customer-property', async (req, res) => {
  try {
    const response = await updateCustomerProperty(req.body);
    return res.json(response);
  } catch (e) {
    debugBase(e.message);
    return res.json({});
  }
});

app.use(userMiddleware);

app.use('/static', express.static(path.join(__dirname, 'private')));

app.get('/download-template', async (req: any, res) => {
  const name = req.query.name;

  registerOnboardHistory({ type: `${name}Download`, user: req.user });

  return res.redirect(
    `${frontendEnv({ name: 'API_URL', req })}/static/importTemplates/${name}`
  );
});

// for health check
app.get('/health', async (_req, res, next) => {
  try {
    await mongoStatus();
  } catch (e) {
    debugBase('MongoDB is not running');
    return next(e);
  }

  res.end('ok');
});

// export board
app.get('/file-export', async (req: any, res) => {
  const { query, user } = req;

  let result: { name: string; response: string };

  try {
    result = await buildFile(query, user);

    res.attachment(`${result.name}.xlsx`);

    return res.send(result.response);
  } catch (e) {
    return res.end(filterXSS(e.message));
  }
});

app.get('/template-export', async (req: any, res) => {
  const { importType } = req.query;

  try {
    const { name, response } = await templateExport(req.query);

    res.attachment(`${name}.${importType}`);
    return res.send(response);
  } catch (e) {
    return res.end(filterXSS(e.message));
  }
});

// read file
app.get('/read-file', async (req: any, res) => {
  const key = req.query.key;

  if (!key) {
    return res.send('Invalid key');
  }

  try {
    const response = await readFileRequest(key);

    res.attachment(key);

    return res.send(response);
  } catch (e) {
    return res.end(filterXSS(e.message));
  }
});

// get mail attachment file
app.get('/read-mail-attachment', async (req: any, res) => {
  const {
    messageId,
    attachmentId,
    kind,
    integrationId,
    filename,
    contentType
  } = req.query;

  if (!messageId || !attachmentId || !integrationId || !contentType) {
    return res.status(404).send('Attachment not found');
  }

  const integrationPath = kind.includes('nylas') ? 'nylas' : kind;

  res.redirect(
    `${INTEGRATIONS_API_DOMAIN}/${integrationPath}/get-attachment?messageId=${messageId}&attachmentId=${attachmentId}&integrationId=${integrationId}&filename=${filename}&contentType=${contentType}&userId=${req.user._id}`
  );
});

// delete file
app.post('/delete-file', async (req: any, res) => {
  // require login
  if (!req.user) {
    return res.end('foribidden');
  }

  const status = await deleteFile(req.body.fileName);

  if (status === 'ok') {
    return res.send(status);
  }

  return res.status(500).send(status);
});

app.post('/upload-file', uploader);

app.post('/upload-file&responseType=json', uploader);

// redirect to integration
app.get('/connect-integration', async (req: any, res, _next) => {
  if (!req.user) {
    return res.end('forbidden');
  }

  const { link, kind, type } = req.query;
  let url = `${INTEGRATIONS_API_DOMAIN}/${link}?kind=${kind}&userId=${req.user._id}`;

  if (type) {
    url = `${url}&type=${type}`;
  }

  return res.redirect(url);
});

// file import
app.post('/import-file', importer);

// unsubscribe
app.get('/unsubscribe', async (req: any, res) => {
  await handleUnsubscription(req.query);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  const template = fs.readFileSync(
    __dirname + '/private/emailTemplates/unsubscribe.html'
  );

  return res.send(template);
});

// verifier web hook
app.post(`/verifier/webhook`, async (req, res) => {
  const { emails, phones, email, phone } = req.body;

  if (email) {
    await updateContactValidationStatus(email);
  } else if (emails) {
    await updateContactsValidationStatus('email', emails);
  } else if (phone) {
    await updateContactValidationStatus(phone);
  } else if (phones) {
    await updateContactsValidationStatus('phone', phones);
  }

  return res.send('success');
});

// Error handling middleware
app.use((error, _req, res, _next) => {
  console.error(error.stack);
  res.status(500).send(error.message);
});

app.use(Sentry.Handlers.errorHandler());

// Wrap the Express server
const httpServer = createServer(app);

const PORT = getEnv({ name: 'PORT' });
const MONGO_URL = getEnv({ name: 'MONGO_URL' });
const TEST_MONGO_URL = getEnv({ name: 'TEST_MONGO_URL' });

httpServer.listen(PORT, () => {
  let mongoUrl = MONGO_URL;

  if (NODE_ENV === 'test') {
    mongoUrl = TEST_MONGO_URL;
  }

  initApolloServer(app).then(apolloServer => {
    apolloServer.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

    // subscriptions server
    apolloServer.installSubscriptionHandlers(httpServer);
  });

  // connect to mongo database
  connect(mongoUrl).then(async () => {
    initBroker(app).catch(e => {
      debugBase(`Error ocurred during message broker init ${e.message}`);
    });

    initMemoryStorage();

    initWatchers();

    init()
      .then(() => {
        telemetry.trackCli('server_started');
        telemetry.startBackgroundUpdate();

        debugBase('Startup successfully started');
      })
      .catch(e => {
        debugBase(`Error occured while starting init: ${e.message}`);
      });
  });

  debugInit(`GraphQL Server is now running on ${PORT}`);
});

// GRACEFULL SHUTDOWN
process.stdin.resume(); // so the program will not close instantly

// If the Node process ends, close the Mongoose connection
if (NODE_ENV === 'production') {
  (['SIGINT', 'SIGTERM'] as NodeJS.Signals[]).forEach(sig => {
    process.on(sig, () => {
      // Stops the server from accepting new connections and finishes existing connections.
      httpServer.close((error: Error | undefined) => {
        if (error) {
          console.error(error.message);
          process.exit(1);
        }

        mongoose.connection.close(() => {
          console.log('Mongoose connection disconnected');
          process.exit(0);
        });
      });
    });
  });
}
