import cheerio from "cheerio";
import { generateJsonContent } from "@/utils";

interface Course {
  name: string;
  volumeNumber: string;
}

export default class WaterAnalyzer implements Analyzer {
  protected static instance: WaterAnalyzer;

  static getInstance() {
    if (!WaterAnalyzer.instance) {
      WaterAnalyzer.instance = new WaterAnalyzer();
    }
    return WaterAnalyzer.instance;
  }

  public toAnalyzer(html: string, filePath: string) {
    // 將 html 傳入 getInfo()
    const courseInfo = this.getInfo(html);

    // 將 data物件 傳入 generateJsonContent()
    const fileContent = generateJsonContent(courseInfo, filePath);

    return JSON.stringify(fileContent);
  }

  // 傳入 html 並回傳 Data 物件
  protected getInfo(html: string) {
    const $ = cheerio.load(html);
    const infos: Course[] = [];

    $(".reservoir").map((_index, element) => {
      const name = $(element).find(".name").eq(0).text();
      const volume = $(element).find(".volumn").eq(0).text();
      // 過濾字串，只保留數字
      const volumeNumber = volume.replace(/[^\d|.]/g, "");

      infos.push({ name, volumeNumber });
    });

    return { time: Date.now(), data: infos };
  }
}
