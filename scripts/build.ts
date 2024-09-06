import { build } from "esbuild"; // eslint-disable-line import/no-extraneous-dependencies

// - We cannot use top-level await because the project uses CommonJS.
// - We have to use CommonJS because esbuild generates a bundle with the following run-time error
//   otherwise: Error: Dynamic require of "os" is not supported
// eslint-disable-next-line @typescript-eslint/no-floating-promises
build({
  entryPoints: ["./src/main.ts"],
  bundle: true,
  outfile: "./dist/main.js",
  platform: "node",
});
