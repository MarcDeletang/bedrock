import { isString } from 'lodash';

export const mockMandrill = {
  messages: {
    send: (config, success, error) => {
      if (isString(config.message.subject)) {
        return success(config);
      }
      return error({ err: 'Invalid subject', message: config.message.subject });
    },
  },
  address: 'foo',
  name: 'bar',
};
