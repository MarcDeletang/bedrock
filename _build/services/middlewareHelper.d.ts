export declare type Controller = (request: any, reply: any) => Promise<any> | any;
export declare type Middleware = (controller: Controller) => Controller;
export declare const MiddlewareHelperService: {
    compose: (toBeWrap: Controller, ...wrappers: Middleware[]) => Controller;
};
