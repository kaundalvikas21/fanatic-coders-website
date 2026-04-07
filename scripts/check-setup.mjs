#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const failures = [];

function majorFrom(versionString) {
  const match = String(versionString).match(/^v?(\d+)/);
  return match ? Number(match[1]) : NaN;
}

function logCheck(name, ok, detail) {
  const status = ok ? "[OK]" : "[FAIL]";
  console.log(`${status} ${name}: ${detail}`);
  if (!ok) failures.push(name);
}

function parseNpmMajor() {
  const userAgent = process.env.npm_config_user_agent || "";
  const match = userAgent.match(/npm\/(\d+)/);
  return match ? Number(match[1]) : NaN;
}

const nodeMajor = majorFrom(process.version);
const npmMajor = parseNpmMajor();

logCheck(
  "Node.js version",
  Number.isInteger(nodeMajor) && nodeMajor >= 20 && nodeMajor <= 22,
  `found ${process.version}, expected major 20-22 (recommended: 22 from .nvmrc)`
);

logCheck(
  "npm version",
  Number.isInteger(npmMajor) && npmMajor >= 10,
  Number.isInteger(npmMajor)
    ? `found major ${npmMajor}, expected major 10+`
    : "npm version not detected from npm user agent; run via npm scripts"
);

const lockFile = path.join(projectRoot, "package-lock.json");
logCheck("Lockfile", fs.existsSync(lockFile), "package-lock.json is required for npm ci");

const nodeModulesDir = path.join(projectRoot, "node_modules");
logCheck("Dependencies folder", fs.existsSync(nodeModulesDir), "node_modules exists");

const astroBin = path.join(projectRoot, "node_modules", ".bin", "astro");
logCheck("Astro CLI", fs.existsSync(astroBin), "node_modules/.bin/astro is present");

const svelteVitePluginPkg = path.join(
  projectRoot,
  "node_modules",
  "@sveltejs",
  "vite-plugin-svelte",
  "package.json"
);
logCheck(
  "Svelte Vite plugin",
  fs.existsSync(svelteVitePluginPkg),
  "node_modules/@sveltejs/vite-plugin-svelte/package.json is present"
);

if (failures.length > 0) {
  console.error("\nSetup checks failed.");
  console.error("Run: npm ci");
  process.exit(1);
}

console.log("\nSetup checks passed. You can run: npm run dev");
