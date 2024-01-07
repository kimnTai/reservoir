import * as esbuild from "esbuild";

esbuild
  .build({
    bundle: true,
    minify: true,
    entryPoints: ["src/app.ts"],
    outfile: "dist/app.js",
    format: "esm",
    platform: "node",
    packages: "external",
  })
  .catch(() => process.exit(1));
