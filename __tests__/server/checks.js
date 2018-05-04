const importChecks = require('../../app/server/checks.ts');
const importBase = require('../base.js');
const { checkParams } = importChecks;
const { throwGenerator, snapGenerator, generateIt } = importBase;

const valid = { init: () => true };

const services = [valid];
const models = [valid];
const registers = [() => true];
const decorations = [{ target: 'request', name: 'test', method: () => true }];
const routes = {};

const checkParamsThrow = throwGenerator(checkParams);

const testsThrows = [
  { m: 'checks invalid services', p: [true] },
  { m: 'checks invalid services', p: [null] },
  { m: 'checks invalid services', p: [{}] },
  { m: 'checks invalid services.init', p: [[{}]] },
  { m: 'checks invalid services.init', p: [[{ init: true }]] },
  { m: 'checks invalid models', p: [[], true] },
  { m: 'checks invalid models', p: [[], null] },
  { m: 'checks invalid models', p: [[], {}] },
  { m: 'checks invalid models.init', p: [[], [{}]] },
  { m: 'checks invalid models.init', p: [[], [{ init: true }]] },
  { m: 'checks invalid registers', p: [[], [], true] },
  { m: 'checks invalid registers', p: [[], [], null] },
  { m: 'checks invalid registers', p: [[], [], {}] },
  { m: 'checks invalid registers.init', p: [[], [], [{}]] },
  { m: 'checks invalid registers.init', p: [[], [], [{ init: true }]] },
];

describe('Testing the server checks', () => {

  it('Check valid empty params', () => {
    expect(checkParams([], [], [], [], {})).toMatchSnapshot();
  });

  testsThrows.map(test => generateIt(test.m, checkParamsThrow, test.p));

  it('Check valid not empty params', () => {
    expect(checkParams(services, models, registers, decorations, routes)).toMatchSnapshot();
  });

});
