import type { Request } from "express";
import fs from "fs";

export const getResponseData = <T>(data: T, message?: string) => {
  if (message) {
    return { status: false, data, message };
  }
  return { status: true, data };
};

export const isLogin = (req: Request) => {
  return !!(req.session ? req.session.login : false);
};

export function generateJsonContent<U, T extends { time: number; data: U[] }>(
  courseInfo: T,
  filePath: string
) {
  let fileContent: Record<number, U[]> = {};
  // 判斷該路徑文件是否存在
  if (fs.existsSync(filePath)) {
    // 先讀取已存在文件內容
    fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  fileContent[courseInfo.time] = courseInfo.data;

  return fileContent;
}
