import { Server } from 'hapi';
import { Bedrock, Decoration, HapiEvent } from './types';
export declare const callInit: (app: Bedrock, targets: any[]) => Promise<any[]>;
export declare const call: (app: Bedrock, targets: any[]) => Promise<any[]>;
export declare const loadRouting: (app: Bedrock, routesConfig: any) => Promise<never>;
export declare const loadHapi: (config: any) => Server;
export declare const loadConfig: () => any;
export declare const loadHapiLogger: (app: Bedrock) => {
    server: (...message: any[]) => any;
    request: (request: any, ...message: any[]) => any;
};
export declare const decorate: (app: Bedrock, decorations: Decoration[]) => void;
export declare const setHapiEvents: (app: Bedrock, events: HapiEvent[]) => void;
