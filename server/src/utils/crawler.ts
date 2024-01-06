import fs from "fs";
import path from "path";
import superagent from "superagent";

export interface Analyzer {
  ToAnalyzer: (html: string, filePath: string) => string;
}

// 負責單獨爬取內容
class Crawler {
  private filePath = path.resolve(__dirname, "../../data/course.json");
  // 獲取 html 方法
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  // 寫入檔案方法
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  // 將邏輯過程拆分出來 (controller ?) -> 避免耦合
  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    // 將分析交給 analyzer (class)，並且 analyzer 必須回傳字串
    const fileContent = this.analyzer.ToAnalyzer(html, this.filePath);
    // 將 courseInfo 傳入 writeFile()
    this.writeFile(fileContent);
    console.log("爬蟲已完成");
  }
  // 構造器
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}

export default Crawler;
