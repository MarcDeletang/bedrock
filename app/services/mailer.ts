const mandrill = require('mandrill-api/mandrill');
import { isString } from 'lodash';
import { Bedrock } from '../server';

const mandrillAPI = {
  client: null,
  address: null,
  name: null,
};

const checkConfig = (config) => {
  const { mailer } = config;

  if (!mailer) {
    throw new Error('config.mailer');
  }
  if (!mailer.apiKey) {
    throw new Error('config.mailer.apiKey');
  }
  if (!mailer.address) {
    throw new Error('config.mailer.address');
  }
  if (!mailer.name) {
    throw new Error('config.mailer.name');
  }
};

const init = (config, mockMandrill, forceProd = false) => {
  try {
    if (Bedrock.env === 'production' || forceProd) {
      checkConfig(config);
      mandrillAPI.client = new mandrill.Mandrill(config.mailer.apiKey);
      mandrillAPI.address = config.mailer.address;
      mandrillAPI.name = config.mailer.name;
      return Promise.resolve(mandrillAPI);
    }
    if (mockMandrill) {
      checkConfig(config);
      mandrillAPI.client = mockMandrill;
      mandrillAPI.address = config.mailer.address;
      mandrillAPI.name = config.mailer.name;
      return Promise.resolve(mandrillAPI);
    }
    return Promise.reject('Unknow env');
  } catch (ex) {
    return Promise.reject(ex);
  }
};

const checkRecipients = (recipients: Recipient[]) => {
  recipients.forEach(recipient => {
    if (!(recipient)) {
      throw new Error('recipient');
    }
    if (!isString(recipient.email)) {
      throw new Error('recipient.email');
    }
    if (!isString(recipient.firstName)) {
      throw new Error('recipient.firstName');
    }
    if (!isString(recipient.lastName)) {
      throw new Error('recipient.lastName');
    }
  });
};
export class Recipient {
  public email;
  public firstName;
  public lastName;
}

// Actual service code

const sendMails = (subject: string, content: string, recipients: Recipient[]) => {
  try {
    checkRecipients(recipients);
  } catch (ex) {
    return Promise.reject(ex);
  }
  const message = {
    html: content,
    subject: subject,
    from_email: mandrillAPI.address,
    from_name: mandrillAPI.name,
    to: recipients.map(recipient => ({
      email: recipient.email,
      name: recipient.firstName + ' ' + recipient.lastName,
      type: 'to',
    })),
  };
  return sendMessage(message);
};

const sendMail = (subject: string, content: string, recipient: Recipient) => {
  try {
    checkRecipients([recipient]);
  } catch (ex) {
    return Promise.reject(ex);
  }
  const message = {
    html: content,
    subject: subject,
    from_email: mandrillAPI.address,
    from_name: mandrillAPI.name,
    to: [{
      email: recipient.email,
      name: recipient.firstName + ' ' + recipient.lastName,
      type: 'to',
    }],
  };
  return sendMessage(message);
};

const sendMessage = (message: any) => {
  const async = true;
  const ip_pool = 'Main Pool';

  return new Promise((resolve, reject) => {
    mandrillAPI.client.messages.send({
      message,
      async,
      ip_pool,
      send_at: '2000-01-01 00:00:00',
    }, result => resolve(result),
      err => {
        Bedrock.log.server(['service', 'fatal'], err);
        return reject(err);
      });
  });
};

export const MailerService = {
  init,
  sendMail,
  sendMails,
};
