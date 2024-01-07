import fs from "fs";
import cheerio from "cheerio";

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
  protected static instance: DellAnalyzer;

  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }

  public toAnalyzer(html: string, filePath: string) {
    // 將 html 傳入 getCourseInfo()
    const courseInfo = this.getCourseInfo(html);
    // 將 data物件 傳入 generateJsonContent()
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }

  // 傳入 html 並回傳 Data 物件
  protected getCourseInfo(html: string) {
    const $ = cheerio.load(html);

    const courseInfos: Course[] = [];
    $(".course-item").map((_index, element) => {
      const desc = $(element).find(".course-desc");
      const title = desc.eq(0).text();
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
}
