"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
    }
    DellAnalyzer.getInstance = function () {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    };
    // 傳入 html 並回傳 Data 物件
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItem = $(".course-item");
        var courseInfos = [];
        courseItem.map(function (index, element) {
            var descs = $(element).find(".course-desc");
            var title = descs.eq(0).text();
            var img = $(element).find(".course-img").attr("src");
            var courseImg = "http://www.dell-lee.com" + img;
            courseInfos.push({ title: title, courseImg: courseImg });
        });
        return { time: new Date().getTime(), data: courseInfos };
    };
    // 取得檔案內容方法
    DellAnalyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        // 判斷該路徑文件是否存在
        if (fs_1.default.existsSync(filePath)) {
            // 先讀取已存在文件內容
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    DellAnalyzer.prototype.ToAnalyzer = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html); // 將 html 傳入 getCourseInfo()
        var fileContent = this.generateJsonContent(courseInfo, filePath); // 將 data物件 傳入 generateJsonContent()
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
