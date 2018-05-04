"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mandrill = require('mandrill-api/mandrill');
const lodash_1 = require("lodash");
const server_1 = require("../server");
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
        if (server_1.Bedrock.env === 'production' || forceProd) {
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
    }
    catch (ex) {
        return Promise.reject(ex);
    }
};
const checkRecipients = (recipients) => {
    recipients.forEach(recipient => {
        if (!(recipient)) {
            throw new Error('recipient');
        }
        if (!lodash_1.isString(recipient.email)) {
            throw new Error('recipient.email');
        }
        if (!lodash_1.isString(recipient.firstName)) {
            throw new Error('recipient.firstName');
        }
        if (!lodash_1.isString(recipient.lastName)) {
            throw new Error('recipient.lastName');
        }
    });
};
class Recipient {
}
exports.Recipient = Recipient;
// Actual service code
const sendMails = (subject, content, recipients) => {
    try {
        checkRecipients(recipients);
    }
    catch (ex) {
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
const sendMail = (subject, content, recipient) => {
    try {
        checkRecipients([recipient]);
    }
    catch (ex) {
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
const sendMessage = (message) => {
    const async = true;
    const ip_pool = 'Main Pool';
    return new Promise((resolve, reject) => {
        mandrillAPI.client.messages.send({
            message,
            async,
            ip_pool,
            send_at: '2000-01-01 00:00:00',
        }, result => resolve(result), err => {
            server_1.Bedrock.log.server(['service', 'fatal'], err);
            return reject(err);
        });
    });
};
exports.MailerService = {
    init,
    sendMail,
    sendMails,
};
//# sourceMappingURL=mailer.js.map