import * as fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "path";

export async function getData() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const position = path.resolve(__dirname, "../../data/course.json");

  const result = await fs.readFile(position, "utf-8");

  const data: responseResult["showData"] = JSON.parse(result);

  return data;
}
