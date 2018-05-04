"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = require("./loaders");
const checks_1 = require("./checks");
const logger_1 = require("../mocks/logger");
const verbose = process.env.VERBOSE_INIT;
const verboseLog = (message) => {
    if (verbose) {
        exports.Bedrock.log.server(['info'], message);
    }
    return true;
};
exports.Bedrock = {
    init: (services, models, registers, decorations, routesConfig, hapiEvents) => {
        try {
            if (!process.env.NODE_ENV) {
                throw new Error('process.env.NODE_ENV must be set');
            }
            verboseLog('Checking params');
            checks_1.checkParams(services, models, registers, decorations, routesConfig);
            verboseLog('Loading config');
            exports.Bedrock.config = loaders_1.loadConfig();
            verboseLog('Loading hapi');
            exports.Bedrock.hapi = loaders_1.loadHapi(exports.Bedrock.config);
            verboseLog('Loading hapi logger');
            exports.Bedrock.log = loaders_1.loadHapiLogger(exports.Bedrock);
            verboseLog('Loading decorations');
            loaders_1.decorate(exports.Bedrock, decorations);
            loaders_1.setHapiEvents(exports.Bedrock, hapiEvents);
            verboseLog('Loading services');
            return loaders_1.callInit(exports.Bedrock, services)
                .then(() => verboseLog('Loading models') && loaders_1.callInit(exports.Bedrock, models))
                .then(() => verboseLog('Loading registers') && loaders_1.call(exports.Bedrock, registers))
                .then(() => verboseLog('Loading routing') && loaders_1.loadRouting(exports.Bedrock, routesConfig))
                .then(() => exports.Bedrock);
        }
        catch (ex) {
            return Promise.reject(ex);
        }
    },
    hapi: null,
    log: logger_1.mockLogger,
    config: null,
    env: process.env.NODE_ENV,
};
//# sourceMappingURL=index.js.map