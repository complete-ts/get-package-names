import core from "@actions/core";
import { getMonorepoPackageNames } from "./getMonorepoPackageNames.js";

const cwd = process.cwd();
console.log("DEBUG cwd:", cwd);
const scriptName = core.getInput("script-name"); // Must match the value in "action.yml"
console.log("DEBUG scriptFilter:", scriptName);
const packageNames = getMonorepoPackageNames(cwd, scriptName);
core.setOutput("package-names", packageNames); // Must match the value in "action.yml"
