(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8502],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return u},kt:function(){return d}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=s(t),d=a,k=m["".concat(p,".").concat(d)]||m[d]||c[d]||o;return t?r.createElement(k,i(i({ref:n},u),{},{components:t})):r.createElement(k,i({ref:n},u))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},82085:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return i},metadata:function(){return l},toc:function(){return p},default:function(){return u}});var r=t(74034),a=t(79973),o=(t(67294),t(3905)),i={id:"plugin",title:"Plugin development",sidebar_label:"Plugins"},l={unversionedId:"developer/plugin",id:"developer/plugin",isDocsHomePage:!1,title:"Plugin development",description:"Important notes",source:"@site/docs/developer/plugin.md",sourceDirName:"developer",slug:"/developer/plugin",permalink:"/developer/plugin",editUrl:"https://github.com/erxes/erxes/edit/develop/docs/docs/developer/plugin.md",version:"current",lastUpdatedBy:"BatAmar Battulga",lastUpdatedAt:1654312438,formattedLastUpdatedAt:"6/4/2022",sidebar_label:"Plugins",frontMatter:{id:"plugin",title:"Plugin development",sidebar_label:"Plugins"},sidebar:"docs",previous:{title:"Developing erxes",permalink:"/developer/developer"},next:{title:"Documentation Guide",permalink:"/developer/documentation_guide"}},p=[{value:"Important notes",id:"important-notes",children:[]},{value:"Installing erxes",id:"installing-erxes",children:[]},{value:"Installing dependencies using docker",id:"installing-dependencies-using-docker",children:[]},{value:"Plugin api",id:"plugin-api",children:[]},{value:"Plugin ui",id:"plugin-ui",children:[]},{value:"Running",id:"running",children:[]},{value:"UI configs",id:"ui-configs",children:[]}],s={toc:p};function u(e){var n=e.components,t=(0,a.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"important-notes"},"Important notes"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u041c\u0430\u0448 \u043e\u043b\u043e\u043d \u043f\u043b\u0430\u0433\u0438\u043d \u0443\u0443\u0434 \u0431\u0430\u0439\u0445 \u0442\u0443\u043b \u04e9\u04e9\u0440\u0441\u0434\u0438\u0439\u043d \u043f\u043b\u0430\u0433\u0438\u043d\u0434\u0430\u0430 \u0442\u043e\u0445\u0438\u0440\u0441\u043e\u043d \u0434\u0430\u0432\u0445\u0446\u0430\u0445\u0433\u04af\u0439 \u043d\u044d\u0440 \u0441\u043e\u043d\u0433\u043e\u0445\n\u0448\u0430\u0430\u0440\u0434\u043b\u0430\u0433\u0430\u0442\u0430\u0439. \u0423\u0433 \u043d\u044d\u0440 \u043d\u044c api \u0438\u0439\u043d graphql query, mutation \u044d\u044d\u0441 \u044d\u0445\u043b\u044d\u044d\u0434 \u043c\u0430\u0448 \u043e\u043b\u043e\u043d \u0433\u0430\u0437\u0430\u0440 \u0430\u0448\u0438\u0433\u043b\u0430\u0433\u0434\u0430\u043d\u0430")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u0411\u04af\u0445 graphql type, query, mutation \u0437\u0430\u0430\u0432\u0430\u043b plugin \u043d\u0438\u0439\u0445\u0430\u0430 \u043d\u044d\u0440\u044d\u044d\u0440 \u044d\u0445\u044d\u043b\u0441\u044d\u043d \u0431\u0430\u0439\u0445 \u0451\u0441\u0442\u043e\u0439")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"\u0411\u04af\u0445 database collection \u0438\u0439\u043d \u043d\u044d\u0440\u04af\u04af\u0434 \u0437\u0430\u0430\u0432\u0430\u043b plugin \u043d\u0438\u0439\u0445\u0430\u0430 \u043d\u044d\u0440\u044d\u044d\u0440 \u044d\u0445\u044d\u043b\u0441\u044d\u043d \u0431\u0430\u0439\u0445 \u0451\u0441\u0442\u043e\u0439"))),(0,o.kt)("h3",{id:"installing-erxes"},"Installing erxes"),(0,o.kt)("p",null,"Erxes \u0438\u0439\u0433 \u0430\u0436\u0438\u043b\u0443\u0443\u043b\u0430\u0445\u044b\u043d \u0442\u0443\u043b\u0434 \u0434\u043e\u043e\u0440\u0445 software \u0443\u0443\u0434\u044b\u0433 \u0441\u0443\u0443\u043b\u0433\u0430\u0441\u0430\u043d \u0431\u0430\u0439\u0445 \u0448\u0430\u0430\u0440\u0434\u043b\u0430\u0433\u0430\u0442\u0430\u0439"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"},"Git")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"http://nodejs.org"},"Node.js")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://yarnpkg.com"},"Yarn")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.docker.com"},"Docker"))),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u0422\u0430\u0442\u0430\u0445")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git clone git@github.com:erxes/erxes.git\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"federation branch \u0440\u0443\u0443 \u0448\u0438\u043b\u0436\u0438\u0445")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git checkout federation\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"node modules \u0441\u0443\u0443\u043b\u0433\u0430\u0445")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd erxes\nyarn install\n")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"pm2 \u0441\u0443\u0443\u043b\u0433\u0430\u0445")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo npm install -g pm2\n")),(0,o.kt)("h3",{id:"installing-dependencies-using-docker"},"Installing dependencies using docker"),(0,o.kt)("p",null,"docker-compose.yml file \u0438\u0439\u0433 \u0434\u043e\u043e\u0440\u0445 \u0430\u0433\u0443\u0443\u043b\u0433\u0430\u0442\u0430\u0439\u0433\u0430\u0430\u0440 \u04af\u04af\u0441\u0433\u044d\u043d\u044d"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'version: \'3.6\'\nservices:\n  mongo:\n    hostname: mongo\n    image: mongo:4.0.10\n    # container_name: mongo\n    ports:\n      - "27017:27017"\n    networks:\n      - erxes-net\n    healthcheck:\n      test: test $$(echo "rs.initiate().ok || rs.status().ok" | mongo --quiet) -eq 1\n      interval: 2s\n      timeout: 2s\n      retries: 200\n    command: ["--replSet", "rs0", "--bind_ip_all"]\n    extra_hosts:\n      - "mongo:127.0.0.1"\n    volumes:\n      - ./data/db:/data/db\n\n  redis:\n    image: \'redis\'\n    # container_name: redis\n    command: redis-server --requirepass pass\n    ports:\n      - "6379:6379"\n    networks:\n      - erxes-net\n\n  rabbitmq:\n    image: rabbitmq:3.7.17-management\n    # container_name: rabbitmq\n    restart: unless-stopped\n    hostname: rabbitmq\n    ports:\n      - "15672:15672"\n      - "5672:5672"\n    networks:\n      - erxes-net\n    # RabbitMQ data will be saved into ./rabbitmq-data folder.\n    volumes:\n      - ./rabbitmq-data:/var/lib/rabbitmq\n\nnetworks:\n  erxes-net:\n    driver: bridge\n')),(0,o.kt)("p",null,"\u0422\u044d\u0433\u044d\u044d\u0434 \u0443\u0433 \u0444\u0430\u0439\u043b \u0431\u0430\u0439\u0433\u0430\u0430 \u0445\u0430\u0432\u0442\u0430\u0441 \u0434\u043e\u0442\u043e\u0440\u043e\u043e"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"docker-compose up -d\n")),(0,o.kt)("h3",{id:"plugin-api"},"Plugin api"),(0,o.kt)("p",null,"api \u0445\u044d\u0441\u044d\u0433 \u043d\u044c \u0434\u044d\u044d\u0440 \u0445\u04e9\u0433\u0436\u04af\u04af\u043b\u044d\u043b\u0442 \u0445\u0438\u0439\u0445\u0438\u0439\u043d \u0442\u0443\u043b\u0434 \u0434\u043e\u043e\u0440\u0445 \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0443\u0443\u0434\u0438\u0439\u0433 \u044d\u0437\u044d\u043c\u0448\u0441\u044d\u043d \u0431\u0430\u0439\u0445 \u0448\u0430\u0430\u0440\u0434\u043b\u0430\u0433\u0430\u0442\u0430\u0439."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/"},"Typescript")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://graphql.org/graphql-js/"},"GraphQL")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://expressjs.com"},"Express.js")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.mongodb.com"},"MongoDB")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://redis.io"},"Redis")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.rabbitmq.com"},"RabbitMQ"))),(0,o.kt)("p",null,"api \u0445\u0430\u0432\u0442\u0430\u0441 \u04af\u04af\u0441\u0433\u044d\u0445"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd erxes\nyarn create-plugin-api demo\n")),(0,o.kt)("h3",{id:"plugin-ui"},"Plugin ui"),(0,o.kt)("p",null,"ui \u0445\u044d\u0441\u044d\u0433 \u043d\u044c \u0434\u044d\u044d\u0440 \u0445\u04e9\u0433\u0436\u04af\u04af\u043b\u044d\u043b\u0442 \u0445\u0438\u0439\u0445\u0438\u0439\u043d \u0442\u0443\u043b\u0434 \u0434\u043e\u043e\u0440\u0445 \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0443\u0443\u0434\u0438\u0439\u0433 \u044d\u0437\u044d\u043c\u0448\u0441\u044d\u043d \u0431\u0430\u0439\u0445 \u0448\u0430\u0430\u0440\u0434\u043b\u0430\u0433\u0430\u0442\u0430\u0439."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://www.typescriptlang.org/"},"Typescript")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://webpack.js.org/"},"Webpack")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://reactjs.org"},"ReactJS"))),(0,o.kt)("p",null,"ui \u0445\u0430\u0432\u0442\u0430\u0441 \u04af\u04af\u0441\u0433\u044d\u0445"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd erxes\nyarn create-plugin-ui demo\n")),(0,o.kt)("h3",{id:"running"},"Running"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd erxes/cli\nyarn install\n")),(0,o.kt)("p",null,"configs.json \u0444\u0430\u0439\u043b\u044b\u0433 \u0434\u043e\u043e\u0440\u0445 \u0431\u0430\u0439\u0434\u043b\u0430\u0430\u0440 \u0437\u0430\u0441\u043d\u0430"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'{\n    "jwt_token_secret": "token",\n    "client_portal_domains": "",\n    "elasticsearch": {},\n    "redis": {\n        "password": "pass"\n    },\n    "mongo": {\n        "username": "",\n        "password": ""\n    },\n    "rabbitmq": {\n        "cookie": "",\n        "user": "",\n        "pass": "",\n        "vhost": ""\n    },\n    "plugins": [\n        {\n            "name": "demo", "ui": "local"\n        }\n    ]\n}\n')),(0,o.kt)("p",null,"\u04ae\u04af\u043d\u0438\u0439 \u0434\u0430\u0440\u0430\u0430"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd packages/gateway\nyarn dev\n")),(0,o.kt)("p",null,"ctl + c \u0434\u0430\u0440\u0436 \u0437\u043e\u0433\u0441\u043e\u043e\u0433\u043e\u043e\u0434"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd ../../cli\n")),(0,o.kt)("p",null,"Ubuntu \u0434\u044d\u044d\u0440"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"./bin/erxes.js dev --bash --deps\n")),(0,o.kt)("p",null,"Mac \u0434\u044d\u044d\u0440"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"./bin/erxes.js dev --deps\n")),(0,o.kt)("p",null,"\u041a\u043e\u043c\u043c\u0430\u043d\u0434 \u04e9\u0433\u0436 \u0430\u0441\u0430\u0430\u043d\u0430"),(0,o.kt)("h3",{id:"ui-configs"},"UI configs"),(0,o.kt)("p",null,"UI \u0438\u0439\u043d navigation \u0445\u044d\u0441\u044d\u0433\u0442 \u0448\u0438\u043d\u044d \u0446\u044d\u0441 \u0445\u0430\u0440\u0443\u0443\u043b\u0445\u044b\u043d \u0442\u0443\u043b\u0434"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"packages/plugin-demo-ui/src/configs.js \u0444\u0430\u0439\u043b\u044b\u043d menus \u0445\u044d\u0441\u044d\u0433\u0442 \u0448\u0438\u043d\u044d \u0431\u043b\u043e\u043a \u043d\u044d\u043c\u043d\u044d")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"}," menus: [\n    {\n      text: 'Demos',\n      to: '/demos',\n      image: '/images/icons/erxes-18.svg',\n      location: 'settings',\n      scope: 'demo'\n    },\n\n\n    {\n      text: 'Demo new menu',\n      to: '/demos-new',\n      image: '/images/icons/erxes-18.svg',\n      location: 'mainNavigation',\n      scope: 'demo'\n    }\n  ]\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"packages/plugin-demo-ui/src/routes.tsx \u0434\u0430\u0440\u0430\u0430\u0445 \u0431\u0430\u0439\u0434\u043b\u0430\u0430\u0440 \u0437\u0430\u0441\u043d\u0430")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"import asyncComponent from '@erxes/ui/src/components/AsyncComponent';\nimport React from 'react';\nimport { Route } from 'react-router-dom';\n\nconst List = asyncComponent(() =>\n  import(/* webpackChunkName: \"List - Demos\" */ './containers/List')\n);\n\nconst New = asyncComponent(() =>\n  import(/* webpackChunkName: \"List - Demos\" */ './containers/New')\n);\n\nconst demos = ({ history }) => {\n  return <List history={history} />;\n};\n\nconst demoNew = ({ history }) => {\n  return <New />;\n};\n\nconst routes = () => {\n  return (\n    <>\n      <Route path=\"/demos/\" component={demos} />;\n      <Route path=\"/demos-new/\" component={demoNew} />;\n    </>\n  );\n};\n\nexport default routes;\n\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"packages/plugin-demo-ui/src/containers/New.tsx \u0444\u0430\u0439\u043b\u044b\u0433 \u0434\u0430\u0440\u0430\u0430\u0445 \u0430\u0433\u0443\u0443\u043b\u0433\u0430\u0442\u0430\u0439 \u04af\u04af\u0441\u0433\u044d\u044d\u0440\u044d\u0439")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"import React from 'react';\nimport New from '../components/New';\n\nclass NewContainer extends React.Component {\n  render() {\n    return <New {...this.props} />;\n  }\n}\n\nexport default NewContainer;\n")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"packages/plugin-demo-ui/src/components/New.tsx \u0444\u0430\u0439\u043b\u044b\u0433 \u0434\u0430\u0440\u0430\u0430\u0445 \u0430\u0433\u0443\u0443\u043b\u0433\u0430\u0442\u0430\u0439 \u04af\u04af\u0441\u0433\u044d\u044d\u0440\u044d\u0439")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"import React from 'react';\n\nclass New extends React.Component {\n  render() {\n    return (\n      <div>New</div>\n    );\n  }\n}\n\nexport default New;\n\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"./bin/erxes.js dev --ignoreRun\n")))}u.isMDXComponent=!0}}]);