import { $, lintScript } from "complete-node";

// - We cannot use top-level await because the project uses CommonJS.
// - We have to use CommonJS because esbuild generates a bundle with the following run-time error
//   otherwise: Error: Dynamic require of "os" is not supported
// eslint-disable-next-line @typescript-eslint/no-floating-promises
lintScript(async () => {
  const promises = [
    // Use Prettier to check formatting.
    // - "--log-level=warn" makes it only output errors.
    $`prettier --log-level=warn --check .`,

    // Type-check the code using the TypeScript compiler.
    $`tsc --noEmit`,

    // Use ESLint to lint the TypeScript.
    // - "--max-warnings 0" makes warnings fail, since we set all ESLint errors to warnings.
    $`eslint --max-warnings 0 .`,

    // Check for unused files, dependencies, and exports.
    $`knip --no-progress`,

    // Spell check every file using CSpell.
    // - "--no-progress" and "--no-summary" make it only output errors.
    $`cspell --no-progress --no-summary .`,

    // Check for unused CSpell words.
    $`cspell-check-unused-words`,

    // @template-customization-start

    /// checkCompiledOutputMatches // TODO: add to complete

    // @template-customization-end
  ];

  await Promise.all(promises);
});
