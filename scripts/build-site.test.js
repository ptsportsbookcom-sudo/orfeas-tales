const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'orfeas-build-'));
  fs.mkdirSync(path.join(root, 'scripts'));
  fs.copyFileSync(path.join(__dirname, 'build-site.js'), path.join(root, 'scripts/build-site.js'));
  const put = (name, content) => {fs.mkdirSync(path.dirname(path.join(root, name)), {recursive:true}); fs.writeFileSync(path.join(root, name), content);};
  put('scripts/site-budget.json', JSON.stringify({maxBytes:100000}));
  put('index.html', '<img src="story1/panel.png?v=1"><audio src="music/The Pyre.mp3"></audio>');
  put('stories-data.js', `const characters=[{file:'characters/a.webp'}]; const audioFiles={1:{gr:'story1/original.aac'}}; const storyText={1:{en:{textFile:'story1/en.txt'}}}; const storyImages={1:[{src:'story1/panel.png'}]};`);
  for (const name of ['app.js','styles.css','story13-compat.js','robots.txt','sitemap.xml']) put(name, '');
  for (const name of ['story1/panel.png','music/The Pyre.mp3','characters/a.webp','story1/original.aac','story1/en.txt','story1/unused.png','_old_release/duplicate.mp3']) put(name, 'original bytes '+name);
  const run = (...args) => spawnSync(process.execPath, ['scripts/build-site.js', ...args], {cwd:root, encoding:'utf8'});
  return {root,put,run};
}

test('copies exact required bytes including AAC, fetched text and music; excludes source extras', () => {
  const f=fixture(); const result=f.run(); assert.equal(result.status,0,result.stderr);
  for (const name of ['story1/panel.png','music/The Pyre.mp3','characters/a.webp','story1/original.aac','story1/en.txt']) assert.deepEqual(fs.readFileSync(path.join(f.root,'site-dist',name)), fs.readFileSync(path.join(f.root,name)));
  assert.equal(fs.existsSync(path.join(f.root,'site-dist/story1/unused.png')),false);
  assert.equal(fs.existsSync(path.join(f.root,'site-dist/_old_release')),false);
  assert.equal(fs.existsSync(path.join(f.root,'story1/unused.png')),true);
});
test('missing dependencies stop a deployment', () => {
  const f=fixture(); f.put('index.html','<img src="missing.png">'); const result=f.run(); assert.notEqual(result.status,0); assert.match(result.stderr,/Missing website dependency/); assert.equal(fs.existsSync(path.join(f.root,'site-dist')),false);
});
test('excess size stops a deployment', () => {
  const f=fixture(); f.put('scripts/site-budget.json','{"maxBytes":1}'); const result=f.run(); assert.notEqual(result.status,0); assert.match(result.stderr,/exceeds reviewed budget/);
});
test('path traversal stops a deployment', () => {
  const f=fixture(); f.put('index.html','<img src="%2e%2e/outside.png">'); const result=f.run(); assert.notEqual(result.status,0); assert.match(result.stderr,/Unsafe asset path/);
});
test('stale output is rejected without deleting any files', () => {
  const f=fixture(); f.put('site-dist/keep.txt','keep'); const result=f.run(); assert.notEqual(result.status,0); assert.match(result.stderr,/already exists/); assert.equal(fs.readFileSync(path.join(f.root,'site-dist/keep.txt'),'utf8'),'keep');
});
