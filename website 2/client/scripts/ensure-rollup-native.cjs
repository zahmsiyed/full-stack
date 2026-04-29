const { execFileSync } = require("node:child_process");
const { createRequire } = require("node:module");
const { arch, platform, report } = require("node:process");

if (platform !== "linux" || arch !== "x64") {
  process.exit(0);
}

const requireFromProject = createRequire(`${process.cwd()}/package.json`);
const isMusl = !report.getReport().header.glibcVersionRuntime;
const packageName = isMusl
  ? "@rollup/rollup-linux-x64-musl"
  : "@rollup/rollup-linux-x64-gnu";

try {
  requireFromProject.resolve(packageName);
} catch {
  console.log(`Installing missing Rollup native package: ${packageName}`);
  execFileSync(
    "npm",
    ["install", "--no-save", "--include=optional", `${packageName}@4.60.1`],
    { stdio: "inherit" }
  );
}
