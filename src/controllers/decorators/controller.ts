import 'reflect-metadata';
import { AppRouter } from '../../appRouter';
import { Methods } from './Methods';
import { MetaDataKeys } from './MetaDataKeys';

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();

    for(let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetaDataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetaDataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetaDataKeys.middleware, target, key) || [];

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routeHandler)
      }
    }
  }
}
