"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
require("./controller/CrawlerController");
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: ["teacher dell"],
    maxAge: 24 * 60 * 60 * 1000, // 24 小時
}));
app.use(router_1.default);
// 聽 http://localhost:7001
app.listen(7001, function () {
    console.log("伺服器啟動中...");
});
