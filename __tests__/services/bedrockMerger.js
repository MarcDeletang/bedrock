const importApp = require('../../app');

const { BedrockConfigMergerService } = importApp;

const promise = () => Promise.resolve(true);

const services = [];
const models = [];
const registers = [];
const decorations = [];
const controllers = {};
const hapiEvents = [];

const services2 = [{ init: promise, foo: 'bar' }];
const models2 = [{ init: promise }];
const registers2 = [promise];
const decorations2 = [{ target: 'foo', name: 'bar', method: promise }];
const controllers2 = {
  foo: {
    PATH: 'HELLO',
    handler: () => true,
  }
};

const hapiEvents2 = [
  { name: 'onPreAuth', method: ()=> true }
];

describe('Testing bedrock config merger', () => {

  it('Check the service shape', () => {
    expect(BedrockConfigMergerService).toMatchSnapshot();
  });

  it('Testing merge empty params', () => {
    const config1 = { services, models, registers, decorations, controllers, hapiEvents };
    const config2 = { services, models, registers, decorations, controllers, hapiEvents };
    expect(BedrockConfigMergerService.merge(config1, config2)).toMatchSnapshot();
  });

  it('Testing merge empty and not empty', () => {
    const config1 = { services, models, registers, decorations, controllers, hapiEvents };
    const config2 = {
      services: services2,
      models: models2,
      registers: registers2,
      decorations: decorations2,
      controllers: controllers2,
      hapiEvents: hapiEvents2,
    };
    expect(BedrockConfigMergerService.merge(config1, config2)).toMatchSnapshot();
  });

  it('Testing merge not empty and not empty', () => {
    const config1 = {
      services: services2,
      models: models2,
      registers: registers2,
      decorations: decorations2,
      controllers: controllers2,
      hapiEvents: hapiEvents2,
    };
    const config2 = {
      services: services2,
      models: models2,
      registers: registers2,
      decorations: decorations2,
      controllers: controllers2,
      hapiEvents: hapiEvents2,
    };
    expect(BedrockConfigMergerService.merge(config1, config2)).toMatchSnapshot();
  });

});
