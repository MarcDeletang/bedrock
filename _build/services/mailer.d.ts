export declare class Recipient {
    email: any;
    firstName: any;
    lastName: any;
}
export declare const MailerService: {
    init: (config: any, mockMandrill: any, forceProd?: boolean) => Promise<never>;
    sendMail: (subject: string, content: string, recipient: Recipient) => Promise<never>;
    sendMails: (subject: string, content: string, recipients: Recipient[]) => Promise<never>;
};
