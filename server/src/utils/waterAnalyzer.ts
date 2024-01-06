import cheerio from "cheerio";
import DellAnalyzer from "./analyzer";

interface Course {
  name: string;
  volumeNumber: string;
}

export default class PowerAnalyzer extends DellAnalyzer {
  static getInstance() {
    if (!PowerAnalyzer.instance) {
      PowerAnalyzer.instance = new PowerAnalyzer();
    }
    return PowerAnalyzer.instance;
  }

  // 傳入 html 並回傳 Data 物件
  protected getInfo(html: string) {
    const $ = cheerio.load(html);
    const infos: Course[] = [];
    const item = $(".reservoir");
    item.map((_index, element) => {
      const name = $(element).find(".name").eq(0).text();
      const volume = $(element).find(".volumn").eq(0).text();
      // 過濾字串，只保留數字
      const volumeNumber = volume.replace(/[^\d|.]/g, "");
      infos.push({ name, volumeNumber });
    });
    return { time: new Date().getTime(), data: infos };
  }
}
