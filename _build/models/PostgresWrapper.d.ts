import { Model } from 'objection';
export declare const PostgresWrapper: {
    init: (app: any) => Promise<typeof Model>;
    close: (cb: any) => any;
};
