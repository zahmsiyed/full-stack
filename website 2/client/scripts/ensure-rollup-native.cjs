const { execFileSync } = require("node:child_process");
const { createRequire } = require("node:module");
const { arch, platform, report } = require("node:process");

if (platform !== "linux" || arch !== "x64") {
  process.exit(0);
}

const requireFromProject = createRequire(`${process.cwd()}/package.json`);
const isMusl = !report.getReport().header.glibcVersionRuntime;
const nativePackages = [
  {
    name: isMusl
      ? "@rollup/rollup-linux-x64-musl"
      : "@rollup/rollup-linux-x64-gnu",
    version: "4.60.1",
  },
  {
    name: isMusl
      ? "lightningcss-linux-x64-musl"
      : "lightningcss-linux-x64-gnu",
    version: "1.30.1",
  },
  {
    name: isMusl
      ? "@tailwindcss/oxide-linux-x64-musl"
      : "@tailwindcss/oxide-linux-x64-gnu",
    version: "4.1.12",
  },
];

for (const nativePackage of nativePackages) {
  try {
    requireFromProject.resolve(nativePackage.name);
  } catch {
    console.log(`Installing missing native package: ${nativePackage.name}`);
    execFileSync(
      "npm",
      [
        "install",
        "--no-save",
        "--include=optional",
        `${nativePackage.name}@${nativePackage.version}`,
      ],
      { stdio: "inherit" }
    );
  }
}
