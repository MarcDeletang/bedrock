const importMock = require('../../app/mocks/logger.ts');
const { mockLogger, log } = importMock;

const request = {};
const tags = ['hello:)'];
const message = 'world :D';

// Those tests should never fail, even with
// console activated (returns undefined)
describe('Testing the logger', () => {
  it('Check the logger properties', () => {
    expect(mockLogger).toMatchSnapshot();
  });

  it('Check the logger server method', () => {
    expect(mockLogger.server(tags, message)).toMatchSnapshot();
  });

  it('Check the logger request method', () => {
    expect(mockLogger.request(request, tags, message)).toMatchSnapshot();
  });

  it('Check the log method (coverage)', () => {
    expect(log(tags, message, null, true)).toMatchSnapshot();
  });

});
