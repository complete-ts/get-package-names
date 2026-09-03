import { build } from "esbuild";

await build({
  bundle: true,
  entryPoints: ["./src/main.ts"],
  outfile: "./dist/main.js",
  platform: "node",
});
