import type { Request, Response } from "express";
import { controller, get, use } from "@/decorator";
import { checkLogin } from "@/middleware";
import { getData } from "@/model";
import { getResponseData } from "@/utils";
import Crawler from "@/utils/crawler";
import waterAnalyzer from "@/utils/waterAnalyzer";

@controller("/api")
export default class CrawlerController {
  @get("/getData")
  @use(checkLogin)
  getData(_req: Request, res: Response) {
    const url = `https://water.taiwanstat.com/`;
    const analyzer = waterAnalyzer.getInstance();

    new Crawler(url, analyzer);

    res.json(getResponseData(true));
  }

  @get("/showData")
  @use(checkLogin)
  async showData(_req: Request, res: Response) {
    try {
      const data = await getData();

      res.json(getResponseData(data));
    } catch (e) {
      res.json(getResponseData(false, "數據不存在"));
    }
  }
}
