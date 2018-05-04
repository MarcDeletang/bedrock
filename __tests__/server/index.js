const importApp = require('../../app');
const importBase = require('../base.js');
const { Bedrock } = importApp;
const { rejectGenerator, handleResolveSnap, handleRejectSnap } = importBase;

const services = [];
const models = [];
const registers = [];
const decorations = [];
const routes = {};

describe('Testing the server initialisation', () => {

  it('Check server shape', () => {
    expect(Bedrock).toMatchSnapshot();
  });

  it('Reject with error (services)', () => {
    return handleRejectSnap(Bedrock.init);
  });

  it('Reject with error (models)', () => {
    return handleRejectSnap(Bedrock.init, services);
  });

  it('Reject with error (registers)', () => {
    return handleRejectSnap(Bedrock.init, services, models);
  });

    it('Reject with error (decorations)', () => {
    return handleRejectSnap(Bedrock.init, services, models, registers);
  });
  
  it('Reject with error (routes)', () => {
    return handleRejectSnap(Bedrock.init, services, models, registers, decorations);
  });

  it('Reject with error (env)', () => {
    delete process.env.NODE_ENV;
    return handleRejectSnap(Bedrock.init, {})
      .then(() => process.env.NODE_ENV = 'test');
  });

  it('Load without error', ()=> {
    return Bedrock.init(services, models, registers, decorations, routes, []).then(Bedrock=> expect(true).toBeTruthy());
  });

});
