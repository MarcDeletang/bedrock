import { Model } from 'objection';
import * as Knex from 'knex';

let knex = null;

const configInit = (knexConfig) => {
  knex = Knex(knexConfig);
  Model.knex(knex);
  return Promise.resolve(Model);
};

const init = app => configInit(app.config.postgres);
const close = cb => knex.destroy(cb);

export const PostgresWrapper = {
  init,
  close,
};
