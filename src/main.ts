import core from "@actions/core";
import { getMonorepoPackageNames } from "./getMonorepoPackageNames.js";

const cwd = process.cwd();
console.log("DEBUG cwd:", cwd);
const scriptName = core.getInput("scriptName");
console.log("DEBUG scriptFilter:", scriptName);
const packageNames = getMonorepoPackageNames(cwd, scriptName);
core.setOutput("packageNames", packageNames);
