import {
  ClientPortals,
  Companies,
  Customers,
  Tasks,
  Tickets
} from '../../../db/models';
import { IClientPortal } from '../../../db/models/definitions/clientPortal';
import { BOARD_STATUSES } from '../../../db/models/definitions/constants';
import { checkPermission } from '../../permissions/wrappers';
import { findCustomer } from '../../utils';

interface ICreateCard {
  type: string;
  email: string;
  subject: string;
  description: string;
  priority: string;
  stageId: string;
}

const configClientPortalMutations = {
  clientPortalConfigUpdate(_root, args: IClientPortal) {
    return ClientPortals.createOrUpdateConfig(args);
  },

  clientPortalRemove(_root, { _id }: { _id: string }) {
    return ClientPortals.deleteOne({ _id });
  },

  async clientPortalCreateCustomer(
    _root,
    args: {
      configId: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }
  ) {
    await ClientPortals.getConfig(args.configId);

    const doc: any = {
      firstName: args.firstName,
      lastName: args.lastName,
      state: 'customer'
    };

    if (args.email) {
      doc.primaryEmail = args.email;
    }

    if (args.phone) {
      doc.primaryPhone = args.phone;
    }

    const customer = await findCustomer(doc);

    if (customer) {
      return customer;
    }

    return Customers.createCustomer(doc);
  },

  async clientPortalCreateCompany(
    _root,
    args: {
      configId: string;
      companyName: string;
      email: string;
    }
  ) {
    await ClientPortals.getConfig(args.configId);

    return Companies.createCompany({
      primaryName: args.companyName,
      primaryEmail: args.email,
      names: [args.companyName],
      emails: [args.email]
    });
  },

  async clientPortalCreateCard(
    _root,
    { type, email, subject, priority, description, stageId }: ICreateCard
  ) {
    const customer = await Customers.findOne({
      primaryEmail: email
    }).lean();

    if (!customer) {
      throw new Error('Customer not registered');
    }

    const collection = type === 'ticket' ? Tickets : Tasks;

    return collection.create({
      userId: customer._id,
      name: subject,
      description,
      priority,
      stageId,
      status: BOARD_STATUSES.ACTIVE
    });
  }
};

checkPermission(
  configClientPortalMutations,
  'clientPortalConfigUpdate',
  'manageClientPortal'
);

checkPermission(
  configClientPortalMutations,
  'clientPortalRemove',
  'manageClientPortal'
);

export default configClientPortalMutations;
