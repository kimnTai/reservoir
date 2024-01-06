import { CrawlerController, LoginController } from "../controller";

export enum Methods {
  get = "get",
  post = "post",
}

// 工廠
function getRequestDecorator(type: Methods) {
  return function (path: string) {
    // target 指的是 prototype
    return function (target: CrawlerController | LoginController, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
