const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const errors = [];
const STORY6_PANEL_ORDER = ["01", "19", "03", "04", "05", "15", "07", "08", "13", "09", "10", "11", "12", "14", "06", "16", "17", "18", "02"];

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

function validatePng(file) {
  const localPath = path.join(root, file);
  const buffer = fs.readFileSync(localPath);
  const signature = "89504e470d0a1a0a";
  if (buffer.length < 12 || buffer.subarray(0, 8).toString("hex") !== signature) {
    fail(`PNG asset has an invalid signature: ${file}`);
    return;
  }

  let offset = 8;
  let foundEnd = false;
  while (offset + 12 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    const chunkEnd = offset + 12 + length;
    if (!/^[A-Za-z]{4}$/.test(type) || chunkEnd > buffer.length) {
      fail(`PNG asset has an invalid chunk: ${file}`);
      return;
    }
    offset = chunkEnd;
    if (type === "IEND") {
      foundEnd = true;
      break;
    }
  }

  if (!foundEnd) fail(`PNG asset is missing IEND chunk: ${file}`);
}

function numericKeys(object) {
  return Object.keys(object || {})
    .map(key => Number(key))
    .filter(Number.isInteger)
    .sort((a, b) => a - b);
}

function liveStoryIds(data) {
  return [...new Set([
    ...numericKeys(data && data.audioFiles),
    ...numericKeys(data && data.storyText),
    ...numericKeys(data && data.storyImages),
  ])].sort((a, b) => a - b);
}

function checkSyntax(file) {
  try {
    new vm.Script(read(file), { filename: file });
  } catch (error) {
    fail(`${file} syntax error: ${error.message}`);
  }
}

function checkIndex(data) {
  const html = read("index.html");
  const storyIds = liveStoryIds(data);

  if (/<style[\s>]/i.test(html)) fail("index.html must not contain inline <style> blocks.");
  if (/\sonclick=/i.test(html)) fail("index.html must not contain inline onclick handlers.");

  const inlineScripts = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>/gi)];
  if (inlineScripts.length) fail("index.html must not contain inline <script> blocks.");

  for (const file of ["styles.css", "stories-data.js", "app.js"]) {
    const match = html.match(new RegExp(`${file.replace(".", "\\.")}\\?v=(\\d+)`));
    if (!match) fail(`index.html must load ${file} with a ?v= cache-busting value.`);
  }

  const heroBadge = html.match(/<div class="hero-badge">(\d+) Episodes Now Live<\/div>/);
  if (!heroBadge || Number(heroBadge[1]) !== storyIds.length) {
    fail(`Homepage hero story count must match live stories (${storyIds.length}).`);
  }

  const storiesStat = html.match(/<span class="stat-value">(\d+)<\/span>\s*<span class="stat-label">Stories Available<\/span>/);
  if (!storiesStat || Number(storiesStat[1]) !== storyIds.length) {
    fail(`Homepage Stories Available stat must match live stories (${storyIds.length}).`);
  }

  for (const storyId of storyIds) {
    if (!html.includes(`data-action="show-story-text" data-story="${storyId}"`)) {
      fail(`Story ${storyId} Read button is not wired with data-action.`);
    }
  }

  for (const storyId of storyIds) {
    if (!html.includes(`data-action="show-wal" data-story="${storyId}"`)) {
      fail(`Story ${storyId} Watch & Listen button is not wired with data-action.`);
    }
  }

  for (let page = 1; page <= 5; page += 1) {
    if (!html.includes(`id="s6p-${page}"`)) fail(`Story 6 Watch & Listen page ${page} is missing.`);
  }
  const story6WalPanels = html.match(/src="story6\/panels\/panel_\d{2}\.webp\?v=\d+"/g) || [];
  if (story6WalPanels.length !== 19) {
    fail(`Story 6 Watch & Listen must reference 19 panels; found ${story6WalPanels.length}.`);
  }
  const story6WalOrder = story6WalPanels.map(src => src.match(/panel_(\d{2})/)[1]);
  if (JSON.stringify(story6WalOrder) !== JSON.stringify(STORY6_PANEL_ORDER)) {
    fail(`Story 6 Watch & Listen panel order is incorrect: ${story6WalOrder.join(", ")}.`);
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

function checkStoryData(data) {
  if (!data) return;
  const storyIds = liveStoryIds(data);

  if (!Array.isArray(data.characters) || data.characters.length < 4) {
    fail("stories-data.js must define at least the live characters.");
  }

  if (storyIds.length === 0) {
    fail("stories-data.js must define at least one live story.");
  }

  for (const storyId of storyIds) {
    const audio = data.audioFiles && data.audioFiles[storyId];
    if (!audio || !audio.en || !audio.gr) {
      fail(`Story ${storyId} must have EN and GR audio mappings.`);
    }
  }

  for (const storyId of storyIds) {
    const text = data.storyText && data.storyText[storyId];
    if (!text || !text.en || !text.gr) {
      fail(`Story ${storyId} must have EN and GR story text.`);
    }

    const images = data.storyImages && data.storyImages[storyId];
    if (!Array.isArray(images) || images.length === 0) {
      fail(`Story ${storyId} must have story image mappings.`);
    }
  }

  const story6ReadOrder = (data.storyImages[6] || []).map(image => {
    const match = image.src && image.src.match(/panel_(\d{2})/);
    return match ? match[1] : "missing";
  });
  if (JSON.stringify(story6ReadOrder) !== JSON.stringify(STORY6_PANEL_ORDER)) {
    fail(`Story 6 Read panel order is incorrect: ${story6ReadOrder.join(", ")}.`);
  }

  const story7ReadPanels = (data.storyImages[7] || []).map(image => {
    const match = image.src && image.src.match(/s7p(\d{2})/);
    return match ? match[1] : "missing";
  });
  const expectedStory7Panels = Array.from({ length: 20 }, (_, index) => String(index + 1).padStart(2, "0"));
  if (JSON.stringify(story7ReadPanels) !== JSON.stringify(expectedStory7Panels)) {
    fail(`Story 7 Read panel order is incorrect: ${story7ReadPanels.join(", ")}.`);
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
    else if (/\.png$/i.test(localPath)) validatePng(localPath);
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

  if (!/walStoryId\s*===\s*6/.test(app) || !/s6p-/.test(app) || !/comic-s6-nav/.test(app)) {
    fail("app.js must configure Story 6 Watch & Listen navigation.");
  }

  if (!/DYNAMIC_WAL_STORY_IDS\s*=\s*\[5,\s*6,\s*7,\s*8,\s*9,\s*10,\s*11\]/.test(app) || !/usesDynamicWalStory\(walStoryId\)/.test(app) || !/renderDynamicComicPages\(walStoryId/.test(app) || !/comic-dynamic-nav/.test(app)) {
    fail("app.js must configure data-driven Watch & Listen navigation for later stories including Story 11.");
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
const storyData = loadStoryData();
checkIndex(storyData);
checkStoryData(storyData);
checkApp();
checkVercelConfig();

if (errors.length) {
  console.error("Smoke checks failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Smoke checks passed.");
