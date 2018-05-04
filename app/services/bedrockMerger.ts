export const BedrockConfigMergerService = {
  merge: (...configs) => {
    let services = [];
    let models = [];
    let registers = [];
    let decorations = [];
    const controllers = {};
    let hapiEvents = [];

    configs.forEach((config, idx) => {
      services = [...services, ...config.services];
      models = [...models, ...config.models];
      registers = [...registers, ...config.registers];
      decorations = [...decorations, ...config.decorations];
      hapiEvents = [ ...hapiEvents, ...config.hapiEvents];
      controllers[idx] = config.controllers;
    });
    return { services, models, registers, decorations, controllers, hapiEvents };
  },
};
