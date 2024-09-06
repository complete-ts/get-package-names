import { $s, buildScript } from "isaacscript-common-node";

await buildScript(() => {
  $s`esbuild --bundle --outfile=./dist/main.js --platform=node ./src/main.ts`;
});
