import { build } from "esbuild";

await build({
  entryPoints: ["./src/main.ts"],
  bundle: true,
  outfile: "./dist/main.js",
  platform: "node",
});
