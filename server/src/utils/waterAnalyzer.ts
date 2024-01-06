import fs from "fs";
import cheerio from "cheerio";
import { Analyzer } from "./crawler";

interface Course {
  name: string;
  volumeNumber: string;
}
interface CourseResult {
  time: number;
  data: Course[];
}
interface Content {
  [propName: number]: Course[];
}

export default class PowerAnalyzer implements Analyzer {
  private static instance: PowerAnalyzer;
  static getInstance() {
    if (!PowerAnalyzer.instance) {
      PowerAnalyzer.instance = new PowerAnalyzer();
    }
    return PowerAnalyzer.instance;
  }
  // 傳入 html 並回傳 Data 物件
  private getInfo(html: string) {
    const $ = cheerio.load(html);
    const infos: Course[] = [];
    const item = $(".reservoir");
    item.map((index, element) => {
      const name = $(element).find(".name").eq(0).text();
      const volume = $(element).find(".volumn").eq(0).text();
      // 過濾字串，只保留數字
      const volumeNumber = volume.replace(/[^\d|.]/g, "");
      infos.push({ name, volumeNumber });
    });
    return { time: new Date().getTime(), data: infos };
  }
  // 取得檔案內容方法
  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    // 判斷該路徑文件是否存在
    if (fs.existsSync(filePath)) {
      // 先讀取已存在文件內容
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public ToAnalyzer(html: string, filePath: string) {
    // 將 html 傳入 getInfo()
    const courseInfo = this.getInfo(html);
    // 將 data物件 傳入 generateJsonContent()
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
  private constructor() {}
}
