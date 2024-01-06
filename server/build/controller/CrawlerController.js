"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerController = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
var crawler_1 = __importDefault(require("../utils/crawler"));
var waterAnalyzer_1 = __importDefault(require("../utils/waterAnalyzer"));
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    console.log("checkLogin 中間件");
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(null, "請先登入"));
    }
};
var test = function (req, res, next) {
    console.log("test 中間件");
    next();
};
var CrawlerController = /** @class */ (function () {
    function CrawlerController() {
    }
    CrawlerController.prototype.getData = function (req, res) {
        // const url = `https://www.taiwanstat.com/realtime/power/`;
        var url = "https://water.taiwanstat.com/";
        var analyzer = waterAnalyzer_1.default.getInstance();
        new crawler_1.default(url, analyzer);
        res.json((0, util_1.getResponseData)(true));
    };
    CrawlerController.prototype.showData = function (req, res) {
        try {
            var position = path_1.default.resolve(__dirname, "../../data/course.json");
            var result = fs_1.default.readFileSync(position, "utf-8");
            var data = JSON.parse(result);
            res.json((0, util_1.getResponseData)(data));
        }
        catch (e) {
            res.json((0, util_1.getResponseData)(false, "數據不存在"));
        }
    };
    __decorate([
        (0, decorator_1.get)("/getData"),
        (0, decorator_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawlerController.prototype, "getData", null);
    __decorate([
        (0, decorator_1.get)("/showData"),
        (0, decorator_1.use)(checkLogin),
        (0, decorator_1.use)(test),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawlerController.prototype, "showData", null);
    CrawlerController = __decorate([
        (0, decorator_1.controller)("/api")
    ], CrawlerController);
    return CrawlerController;
}());
exports.CrawlerController = CrawlerController;
