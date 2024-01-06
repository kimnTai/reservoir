import fs from "fs";
import path from "path";
import superagent from "superagent";

// 負責單獨爬取內容
export default class Crawler {
  private filePath = path.resolve(__dirname, "../../data/course.json");

  constructor(
    private url: string,
    private analyzer: Analyzer
  ) {
    this.initSpiderProcess();
  }

  // 將邏輯過程拆分出來 (controller ?) -> 避免耦合
  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    // 將分析交給 analyzer (class)，並且 analyzer 必須回傳字串
    const fileContent = this.analyzer.toAnalyzer(html, this.filePath);

    // 將 courseInfo 傳入 writeFile()F
    fs.writeFileSync(this.filePath, fileContent);

    console.log("爬蟲已完成");
  }

  // 獲取 html 方法
  private async getRawHtml() {
    const result = await superagent.get(this.url);

    console.log(result);

    return result.text;
  }
}
