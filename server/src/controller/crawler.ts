import fs from "fs";
import path from "path";
import "reflect-metadata";
import type { Request, Response } from "express";
import { controller, use, get } from "../decorator";
import { getResponseData } from "../utils";
import Crawler from "../utils/crawler";
import Analyzer from "../utils/waterAnalyzer";
import { checkLogin } from "../middleware";

@controller("/api")
export default class CrawlerController {
  @get("/getData")
  @use(checkLogin)
  getData(_req: Request, res: Response) {
    // const url = `https://www.taiwanstat.com/realtime/power/`;
    const url = `https://water.taiwanstat.com/`;
    const analyzer = Analyzer.getInstance();
    new Crawler(url, analyzer);
    res.json(getResponseData<responseResult.getData>(true));
  }

  @get("/showData")
  @use(checkLogin)
  showData(_req: Request, res: Response) {
    try {
      const position = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(position, "utf-8");
      const data: responseResult.showData = JSON.parse(result);
      res.json(getResponseData(data));
    } catch (e) {
      res.json(getResponseData<responseResult.showData>(false, "數據不存在"));
    }
  }
}
