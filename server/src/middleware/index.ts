import { RequestHandler } from "express";
import { getResponseData, isLogin } from "@/utils";

export const checkLogin: RequestHandler = (req, res, next) => {
  if (isLogin(req)) {
    next();
  } else {
    res.json(getResponseData(null, "請先登入"));
  }
};
