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

app.use((_req, res) => {
  res.status(404).send({
    status: false,
    message: "無此路由資訊",
  });
});

const PORT = 7001;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
