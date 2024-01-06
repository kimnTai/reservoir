import type { Request, Response, RequestHandler } from "express";
import { controller, get, post } from "../decorator";
import { getResponseData, isLogin } from "../utils";

@controller("/api")
export default class LoginController {
  @get("/isLogin")
  isLogin(req: Request, res: Response) {
    const result = getResponseData<responseResult.isLogin>(isLogin(req));
    res.json(result);
  }

  @post("/login")
  login(req: Request, res: Response) {
    if (isLogin(req)) {
      res.json(getResponseData<responseResult.login>(true));
    } else {
      const { password } = req.body;
      if (password === "123" && req.session) {
        req.session.login = true;
        res.json(getResponseData<responseResult.login>(true));
      } else {
        res.json(getResponseData<responseResult.login>(false, "登入失敗"));
      }
    }
  }

  @get("/logout")
  logout(req: Request, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<responseResult.logout>(true));
  }
}
