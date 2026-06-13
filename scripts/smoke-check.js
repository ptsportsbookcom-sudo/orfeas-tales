const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const errors = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function fail(message) {
  errors.push(message);
}

function stripVersion(assetPath) {
  return assetPath.split("?")[0];
}

function checkSyntax(file) {
  try {
    new vm.Script(read(file), { filename: file });
  } catch (error) {
    fail(`${file} syntax error: ${error.message}`);
  }
}

function checkIndex() {
  const html = read("index.html");

  if (/<style[\s>]/i.test(html)) fail("index.html must not contain inline <style> blocks.");
  if (/\sonclick=/i.test(html)) fail("index.html must not contain inline onclick handlers.");

  const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>/gi)];
  if (inlineScripts.length) fail("index.html must not contain inline <script> blocks.");

  for (const file of ["styles.css", "stories-data.js", "app.js"]) {
    const match = html.match(new RegExp(`${file.replace(".", "\\.")}\\?v=(\\d+)`));
    if (!match) fail(`index.html must load ${file} with a ?v= cache-busting value.`);
  }

  for (const storyId of [1, 2, 3, 4]) {
    if (!html.includes(`data-action="show-story-text" data-story="${storyId}"`)) {
      fail(`Story ${storyId} Read button is not wired with data-action.`);
    }
    if (!html.includes(`data-action="show-wal" data-story="${storyId}"`)) {
      fail(`Story ${storyId} Watch & Listen button is not wired with data-action.`);
    }
  }
}

function loadStoryData() {
  const code = `${read("stories-data.js")}
globalThis.__orfeasData = { characters, audioFiles, storyText, storyImages };`;
  const context = {};
  vm.createContext(context);
  try {
    vm.runInContext(code, context, { filename: "stories-data.js" });
  } catch (error) {
    fail(`stories-data.js runtime error: ${error.message}`);
    return null;
  }
  return context.__orfeasData;
}

function checkStoryData() {
  const data = loadStoryData();
  if (!data) return;

  if (!Array.isArray(data.characters) || data.characters.length < 4) {
    fail("stories-data.js must define at least the live characters.");
  }

  for (const storyId of [1, 2, 3, 4]) {
    const audio = data.audioFiles && data.audioFiles[storyId];
    if (!audio || !audio.en || !audio.gr) {
      fail(`Story ${storyId} must have EN and GR audio mappings.`);
    }

    const text = data.storyText && data.storyText[storyId];
    if (!text || !text.en || !text.gr) {
      fail(`Story ${storyId} must have EN and GR story text.`);
    }

    const images = data.storyImages && data.storyImages[storyId];
    if (!Array.isArray(images) || images.length === 0) {
      fail(`Story ${storyId} must have story image mappings.`);
    }
  }

  const assetPaths = [];
  for (const character of data.characters || []) {
    if (character.file) assetPaths.push(character.file);
  }
  for (const storyAudio of Object.values(data.audioFiles || {})) {
    for (const audioPath of Object.values(storyAudio || {})) assetPaths.push(audioPath);
  }
  for (const storyImages of Object.values(data.storyImages || {})) {
    for (const image of storyImages || []) {
      if (image.src) assetPaths.push(image.src);
    }
  }

  for (const assetPath of assetPaths) {
    const localPath = stripVersion(assetPath);
    if (!exists(localPath)) fail(`Referenced asset is missing locally: ${assetPath}`);
  }
}

function checkApp() {
  const app = read("app.js");
  const functionNames = [...app.matchAll(/function\s+([A-Za-z0-9_$]+)\s*\(/g)].map(match => match[1]);
  const duplicates = [...new Set(functionNames.filter((name, index) => functionNames.indexOf(name) !== index))];
  if (duplicates.length) fail(`app.js has duplicate function declarations: ${duplicates.join(", ")}`);

  const showPage = app.match(/function\s+showPage\s*\([^)]*\)\s*{([\s\S]*?)\n}/);
  if (!showPage) {
    fail("app.js must define showPage().");
  } else if (/walStop|walExitFullscreen|audioEl\.pause|speechSynthesis/.test(showPage[1])) {
    fail("showPage() must not perform audio/fullscreen cleanup.");
  }

  if (!/document\.addEventListener\(['"]click['"]/.test(app)) {
    fail("app.js must attach delegated click handling.");
  }
}

function checkVercelConfig() {
  let config;
  try {
    config = JSON.parse(read("vercel.json"));
  } catch (error) {
    fail(`vercel.json is invalid JSON: ${error.message}`);
    return;
  }

  if (!JSON.stringify(config).includes("Cache-Control")) {
    fail("vercel.json must keep Cache-Control headers.");
  }

  if (config.buildCommand !== "node scripts/smoke-check.js") {
    fail('vercel.json must run "node scripts/smoke-check.js" before deploy.');
  }
}

checkSyntax("stories-data.js");
checkSyntax("app.js");
checkIndex();
checkStoryData();
checkApp();
checkVercelConfig();

if (errors.length) {
  console.error("Smoke checks failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Smoke checks passed.");
