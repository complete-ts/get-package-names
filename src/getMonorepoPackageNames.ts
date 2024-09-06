import fs from "node:fs";
import path from "node:path";
import { isDirectory, isFile } from "./file.js";
import { isObject } from "./types.js";

export function getMonorepoPackageNames(
  monorepoPath: string,
  scriptName?: string,
): readonly string[] {
  const packagesPath = path.join(monorepoPath, "packages");
  if (!isDirectory(packagesPath)) {
    throw new Error(
      `Failed to find the monorepo "packages" directory at: ${packagesPath}`,
    );
  }

  const packageNames: string[] = [];

  const fileNames = fs.readdirSync(packagesPath);
  for (const fileName of fileNames) {
    const filePath = path.join(packagesPath, fileName);
    if (isDirectory(filePath)) {
      packageNames.push(fileName);
    }
  }

  if (scriptName === undefined || scriptName === "") {
    return packageNames;
  }

  return packageNames.filter((packageName) => {
    const packageJSONPath = path.join(
      packagesPath,
      packageName,
      "package.json",
    );

    return packageJSONHasScript(packageJSONPath, scriptName);
  });
}

/**
 * Helper function to check if a "package.json" file has a particular script.
 *
 * @param packageJSONPath The path to the "package.json" file.
 * @param scriptName The name of the script to check for.
 */
function packageJSONHasScript(
  packageJSONPath: string,
  scriptName: string,
): boolean {
  if (!isFile(packageJSONPath)) {
    return false;
  }

  let packageJSON: unknown;
  try {
    const packageJSONContents = fs.readFileSync(packageJSONPath, "utf8");
    packageJSON = JSON.parse(packageJSONContents) as unknown;
  } catch {
    return false;
  }

  if (!isObject(packageJSON)) {
    return false;
  }

  const { scripts } = packageJSON;
  if (!isObject(scripts)) {
    return false;
  }

  const script = scripts[scriptName];
  return script !== undefined;
}
