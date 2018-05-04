"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Knex = require("knex");
let knex = null;
const configInit = (knexConfig) => {
    knex = Knex(knexConfig);
    objection_1.Model.knex(knex);
    return Promise.resolve(objection_1.Model);
};
const init = app => configInit(app.config.postgres);
const close = cb => knex.destroy(cb);
exports.PostgresWrapper = {
    init,
    close,
};
//# sourceMappingURL=PostgresWrapper.js.map