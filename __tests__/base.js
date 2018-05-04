const handleRejectSnap = (method, ...args) => method(...args)
  .catch(result => expect(result).toMatchSnapshot());

const handleResolveSnap = (method, ...args) => method(...args)
  .then(result => expect(result).toMatchSnapshot());

const rejectGenerator =
  (method) => (...args) => () => handleRejectSnap(method, ...args);
const resolveGenerator =
  (method) => (...args) => () => handleRejectSnap(method, ...args);

const handleThrowSnap
  = (method, ...args) => expect(() => method(...args)).toThrowErrorMatchingSnapshot();

const throwGenerator =
  (method) => (...args) => () => handleThrowSnap(method, ...args);

const generateIt = (message, method, args) => it(message, method(...args));

describe('This is a base test file', () => {
  it('Is stupid', () => {
    expect(true).toBeTruthy();
  });
});

module.exports = {
  handleRejectSnap,
  handleResolveSnap,
  rejectGenerator,
  resolveGenerator,
  handleThrowSnap,
  throwGenerator,
  generateIt,
};
