import fs from "fs";
import cheerio from "cheerio";
import { Analyzer } from "./crawler";

interface Course {
  title: string;
  courseImg: string;
}
interface CourseResult {
  time: number;
  data: Course[];
}
interface Content {
  [propName: number]: Course[];
}

export default class DellAnalyzer implements Analyzer {
  private static instance: DellAnalyzer;
  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }
  // 傳入 html 並回傳 Data 物件
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItem = $(".course-item");
    const courseInfos: Course[] = [];
    courseItem.map((index, element) => {
      const descs = $(element).find(".course-desc");
      const title = descs.eq(0).text();
      const img = $(element).find(".course-img").attr("src");
      const courseImg = `http://www.dell-lee.com${img}`;
      courseInfos.push({ title, courseImg });
    });
    return { time: new Date().getTime(), data: courseInfos };
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
    const courseInfo = this.getCourseInfo(html); // 將 html 傳入 getCourseInfo()
    const fileContent = this.generateJsonContent(courseInfo, filePath); // 將 data物件 傳入 generateJsonContent()
    return JSON.stringify(fileContent);
  }
  private constructor() {}
}
