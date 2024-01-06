import express from "express";
import cookieSession from "cookie-session";
import "./controller/LoginController";
import "./controller/CrawlerController";
import router from "./router";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["teacher dell"],
    maxAge: 24 * 60 * 60 * 1000, // 24 小時
  })
);
app.use(router);

// 聽 http://localhost:7001
app.listen(7001, () => {
  console.log("伺服器啟動中...");
});
