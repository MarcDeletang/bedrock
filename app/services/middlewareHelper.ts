export type Controller = (request: any, reply: any) => Promise<any> | any;

export type Middleware = (controller: Controller)
  => Controller;

export const MiddlewareHelperService = {
  compose: (toBeWrap: Controller, ...wrappers: Middleware[]) => {
    let wrapped = toBeWrap;

    wrappers.forEach(wrapper => {
      wrapped = wrapper(wrapped);
    });
    return wrapped;
  },
};
