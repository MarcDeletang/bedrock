const importApp = require('../../app');
const importMock = require('../../app/mocks/mailer.ts');
const importBase = require('../base.js');
const { MailerService } = importApp;
const { mockMandrill } = importMock;
const { rejectGenerator, handleResolveSnap, handleRejectSnap } = importBase;

const apiKey = 'foo';
const address = 'bar';
const name = 'baz';

const email = 'foo@bar.baz';
const firstName = 'foo';
const lastName = 'baz';

const html = '';
const subject = '';
const from_email = email;
const from_name = email;

const config = {
  mailer: {
    apiKey,
    address,
    name,
  },
};

const recipient = {
  email,
  firstName,
  lastName,
};

const failInit = rejectGenerator(MailerService.init);

describe('Testing the mailer service initialisation', () => {
  it('Check the service shape', () => {
    expect(MailerService).toMatchSnapshot();
  });

  it('Reject with error (config.mailer)', failInit({}, mockMandrill));

  it('Reject with error (config.mailer.apiKey)', failInit({ mailer: {} }, mockMandrill));

  it('Reject with error (config.mailer.address)', failInit({ mailer: { apiKey } }, mockMandrill));

  it('Reject with error (config.mailer.name)', failInit({ mailer: { apiKey, address } }, mockMandrill));

  it('Load in prod without error', () => {
    return handleResolveSnap(MailerService.init, config, mockMandrill, true);
  });

  it('Load without error', () => {
    return handleResolveSnap(MailerService.init, config, mockMandrill);
  });

});

const failSendMail = rejectGenerator(MailerService.sendMail);

describe('Testing the mailer', () => {
  it('Send mail no error', () => {
    return handleResolveSnap(MailerService.sendMail, 'subject', 'content', recipient);
  });

  it('Send mails no error', () => {
    return handleResolveSnap(MailerService.sendMails, 'subject', 'content', [recipient]);
  });

  it('Send mails error recipient', () => {
    return handleRejectSnap(MailerService.sendMails, 42, 'content', null);
  });

  it('Send mail error recipient', failSendMail(42, 'content', null));

  it('Send mail error recipient email', failSendMail(42, 'content', {}));

  it('Send mail error recipient firstName', failSendMail(42, 'content', { email }));

  it('Send mail error recipient lastName', failSendMail(42, 'content', { email, firstName }));

  it('Send mail error subject', failSendMail(42, 'content', recipient));

});
