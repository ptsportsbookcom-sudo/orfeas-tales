// Publish only the site's dependency closure. Source media stays in Git unchanged.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'site-dist');
const reportOnly = process.argv.includes('--report-only');
const inventoryArg = process.argv.indexOf('--inventory');
const inventory = inventoryArg < 0 ? null : new Map(JSON.parse(fs.readFileSync(process.argv[inventoryArg + 1], 'utf8')).tree.filter(x => x.type === 'blob').map(x => [x.path, x]));
if (inventory && !reportOnly) throw new Error('Inventory mode is only for planning; it cannot build or bypass file verification.');
const required = new Set();
function add(value) {
  if (typeof value !== 'string') return;
  const clean = value.split(/[?#]/)[0];
  if (!clean || /^(?:[a-z]+:|\/\/|#)/i.test(clean)) return;
  const name = decodeURIComponent(clean).replace(/^\.\//, '').replace(/^\//, '');
  if (name.includes('\\') || name.split('/').includes('..') || path.isAbsolute(name)) throw new Error(`Unsafe asset path: ${value}`);
  const exists = inventory ? inventory.has(name) : fs.existsSync(path.join(root, name));
  if (!exists) throw new Error(`Missing website dependency: ${name}`);
  required.add(name);
}
function visit(value) {
  if (typeof value === 'string' && /\.(?:png|webp|jpe?g|gif|svg|ico|mp3|aac|wav|m4a|ogg|mp4|webm|txt|woff2?)(?:[?#].*)?$/i.test(value)) add(value);
  else if (value && typeof value === 'object') Object.values(value).forEach(visit);
}
const entries = ['index.html', 'app.js', 'stories-data.js', 'styles.css', 'story13-compat.js', 'robots.txt', 'sitemap.xml'];
// Keep the existing standalone authoring helper available at its current URL.
if (inventory ? inventory.has('tts-generator.html') : fs.existsSync(path.join(root, 'tts-generator.html'))) entries.push('tts-generator.html');
entries.forEach(add);
const context = {};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'stories-data.js'), 'utf8') + '\n;globalThis.siteAssets = {characters, audioFiles, storyText, storyImages};', context, {timeout: 5000});
visit(context.siteAssets);
// Include literal dependencies too: HTML metadata, background music and CSS URLs.
for (const entry of entries) {
  const source = fs.readFileSync(path.join(root, entry), 'utf8');
  for (const match of (entry.endsWith('.html') ? source : '').matchAll(/(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi)) {
    if (!match[1].includes('${') && !match[1].startsWith('?')) add(match[1]);
  }
  for (const match of (entry.endsWith('.css') ? source : '').matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/gi)) add(match[1]);
  for (const match of (entry.endsWith('.js') ? source : '').matchAll(/["'`]([^"'`\r\n<>]*?\.(?:png|webp|jpe?g|gif|svg|ico|mp3|aac|wav|m4a|ogg|mp4|webm|txt|woff2?)(?:\?[^"'`\r\n<>]*)?)["'`]/gi)) {
    if (!match[1].includes('${') && !match[1].includes(' ' + '+')) add(match[1]);
  }
}
const files = [...required].sort();
const totalBytes = files.reduce((sum, file) => sum + (inventory ? inventory.get(file).size : fs.statSync(path.join(root, file)).size), 0);
const budget = JSON.parse(fs.readFileSync(path.join(root, 'scripts/site-budget.json'), 'utf8'));
if (totalBytes > budget.maxBytes) throw new Error(`Site output ${totalBytes} bytes exceeds reviewed budget ${budget.maxBytes}; review media growth before deploying.`);
if (reportOnly) {
  console.log(JSON.stringify({files: files.length, totalBytes, paths: files}, null, 2));
  process.exit(0);
}
// Refuse a stale folder rather than delete anything or publish old files.
if (fs.existsSync(output)) throw new Error('site-dist already exists. Use a fresh checkout for a reproducible build.');
fs.mkdirSync(output);
for (const file of files) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.copyFileSync(path.join(root, file), destination);
  const hash = target => crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex');
  if (hash(path.join(root, file)) !== hash(destination)) throw new Error(`Copy verification failed: ${file}`);
}
console.log(`Verified ${files.length} published files, ${totalBytes} bytes. Original media unchanged.`);
