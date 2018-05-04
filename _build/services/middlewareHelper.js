"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareHelperService = {
    compose: (toBeWrap, ...wrappers) => {
        let wrapped = toBeWrap;
        wrappers.forEach(wrapper => {
            wrapped = wrapper(wrapped);
        });
        return wrapped;
    },
};
//# sourceMappingURL=middlewareHelper.js.map