import fs from "node:fs";
export function getMonorepoPackageNames(cwd, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
scriptName) {
    const fileList = fs.readdirSync(cwd);
    console.log("DEBUG fileList:", fileList);
    return [];
    /*
    const fromDirToUse = fromDir ?? dirOfCaller();
    const monorepoRoot = findPackageRoot(fromDirToUse);
    const packagesPath = path.join(monorepoRoot, "packages");
    if (!isDirectory(packagesPath)) {
      throw new Error(
        `The monorepo packages directory does not exist at: ${packagesPath}`,
      );
    }
  
    const packageNames: string[] = [];
  
    const fileNames = getFileNamesInDirectory(packagesPath);
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
      if (!isFile(packageJSONPath)) {
        return false;
      }
  
      return packageJSONHasScript(packageJSONPath, scriptName);
    });
    */
}
