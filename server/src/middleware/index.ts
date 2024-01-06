import { RequestHandler } from "express";
import { getResponseData, isLogin } from "../utils/util";

export const checkLogin: RequestHandler = (req, res, next) => {
  next();
  return;
  if (isLogin(req)) {
  } else {
    res.json(getResponseData(null, "請先登入"));
  }
};
