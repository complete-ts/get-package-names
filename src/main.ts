import * as core from "@actions/core";
import { getMonorepoPackageNames } from "./getMonorepoPackageNames.js";

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : "unknown error";
  core.setFailed(message);
}

function main() {
  /**
   * The current working directory at this point will be the checked out repository. For example,
   * "/home/runner/work/foo/foo". (The double "foo" is not a typo because GitHub Actions checks out
   * the repository in a directory of the same name.)
   */
  const cwd = process.cwd();

  const scriptName = core.getInput("script-name"); // Must match the value in "action.yml"
  const packageNames = getMonorepoPackageNames(cwd, scriptName);
  core.setOutput("package-names", packageNames); // Must match the value in "action.yml"
}
