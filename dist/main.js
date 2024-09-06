import * as core from "@actions/core";
import { getMonorepoPackageNames } from "./getMonorepoPackageNames.js";
try {
    main();
}
catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    core.setFailed(message);
}
function main() {
    const cwd = process.cwd();
    console.log("DEBUG cwd:", cwd);
    const scriptName = core.getInput("script-name"); // Must match the value in "action.yml"
    console.log("DEBUG scriptFilter:", scriptName);
    const packageNames = getMonorepoPackageNames(cwd, scriptName);
    core.setOutput("package-names", packageNames); // Must match the value in "action.yml"
}
