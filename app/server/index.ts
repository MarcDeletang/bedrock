import {
  loadConfig,
  callInit,
  call,
  decorate,
  loadRouting,
  loadHapi,
  loadHapiLogger,
  setHapiEvents,
} from './loaders';
import { Bedrock as BedrockType} from './types';
import { checkParams } from './checks';
import { mockLogger, MockLogger } from '../mocks/logger';
const verbose = process.env.VERBOSE_INIT;

const verboseLog = (message) => {
  if (verbose) {
    Bedrock.log.server(['info'], message);
  }
  return true;
};

export const Bedrock: BedrockType = {
  init: (services,
    models,
    registers,
    decorations,
    routesConfig,
    hapiEvents) => {
    try {
      if (!process.env.NODE_ENV) {
        throw new Error('process.env.NODE_ENV must be set');
      }
      verboseLog('Checking params');
      checkParams(services, models, registers, decorations, routesConfig);
      verboseLog('Loading config');
      Bedrock.config = loadConfig();
      verboseLog('Loading hapi');
      Bedrock.hapi = loadHapi(Bedrock.config);
      verboseLog('Loading hapi logger');
      Bedrock.log = loadHapiLogger(Bedrock);
      verboseLog('Loading decorations');
      decorate(Bedrock, decorations);
      setHapiEvents(Bedrock, hapiEvents);
      verboseLog('Loading services');
      return callInit(Bedrock, services)
        .then(() => verboseLog('Loading models') && callInit(Bedrock, models))
        .then(() => verboseLog('Loading registers') && call(Bedrock, registers))
        .then(() => verboseLog('Loading routing') && loadRouting(Bedrock, routesConfig))
        .then(() => Bedrock);
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
  hapi: null,
  log: mockLogger as MockLogger,
  config: null,
  env: process.env.NODE_ENV,
};
