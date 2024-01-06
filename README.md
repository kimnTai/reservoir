TypeScript 爬蟲
---
- 運用 **組合模式** 將功能拆為 爬取( crawler.ts ) 與分析( dellAnalyzer.ts ) 兩類
- 保持方法 單一職則原則
- 運用 **單例模式** 要求 Analyzer 不能被外部實例化
- 使用 Express 框架撰寫 API
- 

爬取網站 [連結](http://www.dell-lee.com/) 標題與圖片

- 安裝 `npm install`
- 編譯 `npm run build`
- 執行 `npm run start`
- 打開瀏覽器輸入網址 http://localhost:7001
- 輸入密碼 123
- 即可產生 course.json 於 data 資料夾中

![](https://i.imgur.com/f8mpCyB.jpg)