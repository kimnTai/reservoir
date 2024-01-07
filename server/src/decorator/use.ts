import type { RequestHandler } from "express";

// 中間件
export function use(middleware: RequestHandler) {
  return function (target: Object, key: string) {
    const originMiddlewares =
      Reflect.getMetadata("middlewares", target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata("middlewares", originMiddlewares, target, key);
  };
}
