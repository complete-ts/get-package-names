import fs from "node:fs";

/** Helper function to synchronously check if the provided path exists and is a directory. */
export function isDirectory(filePath: string): boolean {
  return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
}

/** Helper function to synchronously check if the provided path exists and is a file. */
export function isFile(filePath: string): boolean {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

/**
 * Helper function to narrow an unknown value to an object (i.e. a TypeScript record).
 *
 * Under the hood, this checks for `typeof variable === "object"`, `variable !== null`, and
 * `!Array.isArray(variable)`.
 */
export function isObject(
  variable: unknown,
): variable is Record<string, unknown> {
  return (
    typeof variable === "object"
    && variable !== null
    && !Array.isArray(variable)
  );
}
