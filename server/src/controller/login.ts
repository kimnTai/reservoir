import type { Request, Response } from "express";
import { controller, get, post } from "@/decorator";
import { getResponseData, isLogin } from "@/utils";

@controller("/api")
export default class LoginController {
  @get("/isLogin")
  isLogin(req: Request, res: Response) {
    const result = getResponseData(isLogin(req));
    res.json(result);
  }

  @post("/login")
  login(req: Request, res: Response) {
    if (isLogin(req)) {
      res.json(getResponseData(true));
      return;
    }

    if (req.body.password === "123" && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
      return;
    }

    res.json(getResponseData(false, "登入失敗"));
  }

  @get("/logout")
  logout(req: Request, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }
}
