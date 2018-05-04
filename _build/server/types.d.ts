export declare type Bedrock = {
    hapi: any;
    log: any;
    config: any;
    env: string;
    init(services: Initable[], models: Initable[], registers: (() => Promise<any>)[], decorations: Decoration[], routesConfig: any, hapiEvents: HapiEvent[]): Promise<any>;
};
export declare type Initable = {
    init(Bedrock: Bedrock): Promise<any>;
};
export declare type Decoration = {
    target: string;
    name: string;
    method: () => any;
};
export declare type HapiEvent = {
    name: string;
    method: () => Promise<any>;
};
