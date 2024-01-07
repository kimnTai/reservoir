import cheerio from "cheerio";
import { generateJsonContent } from "@/utils";

interface Course {
  title: string;
  courseImg: string;
}

export default class BaseAnalyzer implements Analyzer {
  protected static instance: BaseAnalyzer;

  static getInstance() {
    if (!BaseAnalyzer.instance) {
      BaseAnalyzer.instance = new BaseAnalyzer();
    }
    return BaseAnalyzer.instance;
  }

  public toAnalyzer(html: string, filePath: string) {
    // 將 html 傳入 getCourseInfo()
    const courseInfo = this.getCourseInfo(html);
    // 將 data物件 傳入 generateJsonContent()
    const fileContent = generateJsonContent(courseInfo, filePath);
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
}
