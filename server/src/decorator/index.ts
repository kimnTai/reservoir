import type { RequestHandler } from "express";
import router from "@/router";

type METHODS = "get" | "post" | "put";

export function controller(root: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Object.getOwnPropertyNames(constructor.prototype).forEach((key) => {
      const path: string = Reflect.getMetadata(
        "path",
        constructor.prototype,
        key
      );
      const method: METHODS = Reflect.getMetadata(
        "method",
        constructor.prototype,
        key
      );
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        "middlewares",
        constructor.prototype,
        key
      );

      if (!path || !method) {
        return;
      }

      // root 是不是 = '/'
      const fullPath = root === "/" ? path : `${root}${path}`;
      const handler = constructor.prototype[key];

      if (middlewares && middlewares.length) {
        router[method](fullPath, ...middlewares, handler);
      } else {
        router[method](fullPath, handler);
      }
    });
  };
}

export function use(middleware: RequestHandler) {
  return function (
    target: any,
    propertyKey: string,
    _descriptor: PropertyDescriptor
  ) {
    const originMiddlewares =
      Reflect.getMetadata("middlewares", target, propertyKey) || [];

    originMiddlewares.push(middleware);

    Reflect.defineMetadata(
      "middlewares",
      originMiddlewares,
      target,
      propertyKey
    );
  };
}

export const get = getRequestDecorator("get");
export const post = getRequestDecorator("post");
export const put = getRequestDecorator("put");

// 工廠
function getRequestDecorator(type: METHODS) {
  return (path: string) => {
    // target 指的是 prototype
    return function (
      target: any,
      propertyKey: string,
      _descriptor: PropertyDescriptor
    ) {
      Reflect.defineMetadata("path", path, target, propertyKey);
      Reflect.defineMetadata("method", type, target, propertyKey);
    };
  };
}
