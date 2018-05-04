"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.mockMandrill = {
    messages: {
        send: (config, success, error) => {
            if (lodash_1.isString(config.message.subject)) {
                return success(config);
            }
            return error({ err: 'Invalid subject', message: config.message.subject });
        },
    },
    address: 'foo',
    name: 'bar',
};
//# sourceMappingURL=mailer.js.map