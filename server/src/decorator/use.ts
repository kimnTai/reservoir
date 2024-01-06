import "reflect-metadata";
import { RequestHandler } from "express";
import { CrawlerController, LoginController } from "../controller";

// 中間件
export function use(middleware: RequestHandler) {
  return function (target: CrawlerController | LoginController, key: string) {
    const originMiddlewares =
      Reflect.getMetadata("middlewares", target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata("middlewares", originMiddlewares, target, key);
  };
}
