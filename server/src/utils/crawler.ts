import fs from "fs";
import path from "path";

// 負責單獨爬取內容
export default class Crawler {
  private filePath = path.resolve(__dirname, "../../data/course.json");

  constructor(
    private url: string,
    private analyzer: Analyzer
  ) {
    this.initSpiderProcess();
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    // 將分析交給 analyzer (class)，並且 analyzer 必須回傳字串
    const fileContent = this.analyzer.toAnalyzer(html, this.filePath);

    // 將 courseInfo 傳入 writeFile()
    fs.writeFileSync(this.filePath, fileContent);

    console.log("爬蟲已完成");
  }

  // 獲取 html 方法
  private async getRawHtml() {
    const result = await fetch(this.url).then((res) => res.text());

    return result;
  }
}
