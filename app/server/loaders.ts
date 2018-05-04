import { Server } from 'hapi';
import  { Bedrock, Decoration, HapiEvent } from './types';

export const callInit = (app: Bedrock, targets: any[]) => {
  return Promise.all(targets.map(target => target.init(app)));
};

export const call = (app: Bedrock, targets: any[]) => {
  return Promise.all(targets.map(target => target(app)));
};

const getControllers = (root) => {
  let configs = [];

  Object.keys(root).map(key => {
    if (root[key].path) {
      configs.push(root[key]);
    } else {
      configs = [...configs, ...getControllers(root[key])];
    }
  });
  return configs;
};

export const loadRouting = (app: Bedrock, routesConfig: any) => {
  const controllers = getControllers(routesConfig);

  try {
    controllers.forEach((controller) => app.hapi.route(controller));
    return Promise.resolve(app);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

export const loadHapi = (config) => {
  if (!config.hapi) {
    throw new Error('config.hapi');
  }
  if (!config.hapi.constructor) {
    throw new Error('config.hapi.constructor');
  }
  if (!config.hapi.connections) {
    throw new Error('config.hapi.connections');
  }
  const server = new Server(config.hapi.constructor);
  config.hapi.connections.forEach(connection => server.connection(connection));
  return server;
};

export const loadConfig = () => require('config');

export const loadHapiLogger = (app: Bedrock) => ({
  server: (...message) => app.hapi.log(...message),
  request: (request, ...message) => request.log(...message),
});

export const decorate = (app: Bedrock, decorations: Decoration[]) => {
  decorations.forEach(decoration => {
    const { target, name, method } = decoration;
    app.hapi.decorate(target, name, method);
  });
};

export const setHapiEvents = (app: Bedrock, events: HapiEvent[]) => {
  events.forEach(event => {
    const { name, method } = event;

    app.hapi.ext(name, method);
  });
};
