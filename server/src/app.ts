import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "reflect-metadata";

import "@/controller/crawler";
import "@/controller/health";
import "@/controller/login";
import router from "@/router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
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

process.on("uncaughtException", (error) => {
  console.error("未捕獲的異常！");
  console.error(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("未捕捉到的 rejection :", promise, "原因：", reason);
});
