import type { Request, Response } from "express";
import { controller, get } from "../decorator";

@controller("/")
export default class health {
  @get("/")
  check(req: Request, res: Response) {
    const healthCheck = {
      status: true,
      message: "OK",
      uptime: process.uptime(),
      timestamp: Date.now(),
      host: req.headers.host,
    };
    res.send(healthCheck);
  }
}
