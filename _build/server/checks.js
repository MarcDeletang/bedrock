"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.checkParams = (services, models, registers, decorations, routesConfig) => {
    const areInitables = (targets, message) => {
        if (!lodash_1.isArray(targets)) {
            throw new Error(`${message}`);
        }
        targets.forEach(target => {
            if (!lodash_1.isFunction(target.init)) {
                throw new Error(`${message}.init is not a function for ${target}`);
            }
        });
    };
    const areCallables = (targets, message) => {
        if (!lodash_1.isArray(targets)) {
            throw new Error(`${message}`);
        }
        targets.forEach(target => {
            if (!lodash_1.isFunction(target)) {
                throw new Error(`${message} is not a function, got: ${JSON.stringify(target)}`);
            }
        });
    };
    areInitables(services, 'services');
    areInitables(models, 'models');
    areCallables(registers, 'registers');
    if (!lodash_1.isArray(decorations)) {
        throw new Error('decorations');
    }
    areCallables(decorations.map(decoration => decoration.method), 'decorations');
    if (!lodash_1.isPlainObject(routesConfig)) {
        throw new Error('routes');
    }
    return true;
};
//# sourceMappingURL=checks.js.map