import { isArray, isPlainObject, isFunction } from 'lodash';
import { Decoration } from './types';

export const checkParams = (services: any[],
  models: any[],
  registers: any[],
  decorations: Decoration[],
  routesConfig: any) => {
  const areInitables = (targets: any[], message) => {
    if (!isArray(targets)) {
      throw new Error(`${message}`);
    }
    targets.forEach(target => {
      if (!isFunction(target.init)) {
        throw new Error(`${message}.init is not a function for ${target}`);
      }
    });
  };
  const areCallables = (targets: any[], message) => {
    if (!isArray(targets)) {
      throw new Error(`${message}`);
    }
    targets.forEach(target => {
      if (!isFunction(target)) {
        throw new Error(`${message} is not a function, got: ${JSON.stringify(target)}`);
      }
    });
  };
  areInitables(services, 'services');
  areInitables(models, 'models');
  areCallables(registers, 'registers');
  if (!isArray(decorations)) {
    throw new Error('decorations');
  }
  areCallables(decorations.map(decoration => decoration.method), 'decorations');
  if (!isPlainObject(routesConfig)) {
    throw new Error('routes');
  }
  return true;
};
