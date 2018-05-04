"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("hapi");
exports.callInit = (app, targets) => {
    return Promise.all(targets.map(target => target.init(app)));
};
exports.call = (app, targets) => {
    return Promise.all(targets.map(target => target(app)));
};
const getControllers = (root) => {
    let configs = [];
    Object.keys(root).map(key => {
        if (root[key].path) {
            configs.push(root[key]);
        }
        else {
            configs = [...configs, ...getControllers(root[key])];
        }
    });
    return configs;
};
exports.loadRouting = (app, routesConfig) => {
    const controllers = getControllers(routesConfig);
    try {
        controllers.forEach((controller) => app.hapi.route(controller));
        return Promise.resolve(app);
    }
    catch (ex) {
        return Promise.reject(ex);
    }
};
exports.loadHapi = (config) => {
    if (!config.hapi) {
        throw new Error('config.hapi');
    }
    if (!config.hapi.constructor) {
        throw new Error('config.hapi.constructor');
    }
    if (!config.hapi.connections) {
        throw new Error('config.hapi.connections');
    }
    const server = new hapi_1.Server(config.hapi.constructor);
    config.hapi.connections.forEach(connection => server.connection(connection));
    return server;
};
exports.loadConfig = () => require('config');
exports.loadHapiLogger = (app) => ({
    server: (...message) => app.hapi.log(...message),
    request: (request, ...message) => request.log(...message),
});
exports.decorate = (app, decorations) => {
    decorations.forEach(decoration => {
        const { target, name, method } = decoration;
        app.hapi.decorate(target, name, method);
    });
};
exports.setHapiEvents = (app, events) => {
    events.forEach(event => {
        const { name, method } = event;
        app.hapi.ext(name, method);
    });
};
//# sourceMappingURL=loaders.js.map