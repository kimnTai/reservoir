import "reflect-metadata";
import type { RequestHandler } from "express";
import type CrawlerController from "../controller/crawler";
import type LoginController from "../controller/login";

// 中間件
export function use(middleware: RequestHandler) {
  return function (target: CrawlerController | LoginController, key: string) {
    const originMiddlewares =
      Reflect.getMetadata("middlewares", target, key) || [];
    originMiddlewares.push(middleware);
    Reflect.defineMetadata("middlewares", originMiddlewares, target, key);
  };
}
