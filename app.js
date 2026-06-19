// ── ORFEAS TALES — APP.JS ────────────────────────────────────────────────────
// All behaviour. No inline onclick handlers anywhere.
// Data lives in stories-data.js (loaded before this file).

// ── WAL STATE ────────────────────────────────────────────────
let walStoryId = 1;
let walLang = 'en';
let walPlaying = false;
let walSyncOn = true;
let walSyncPausedUntil = 0;
let walFullscreenOn = false;
let walSpeechUtterance = null;

// ── NAVIGATION ───────────────────────────────────────────────
const VALID_PAGES = new Set(['home', 'stories', 'characters', 'story-reader', 'comic']);
let currentPageName = 'home';

function getUrlForPage(name) {
  const url = new URL(location.href);
  if (name === 'home') url.searchParams.delete('page');
  else url.searchParams.set('page', name);
  return url.pathname + url.search + url.hash;
}

// Call this before showPage() whenever audio/fullscreen cleanup is needed.
// Wrapped in try/catch so failures never block navigation.
function beforePageChange(nextPage) {
  if (nextPage !== 'comic') {
    try { walExitFullscreen({ updateHistory: false }); } catch (e) {}
    try { const wb = document.getElementById('wal-bar'); if (wb) wb.classList.add('hidden'); } catch (e) {}
    try { walStop(); } catch (e) {}
  }
}

// Pure navigation: validate page, switch DOM, update history.
// No audio/fullscreen side-effects here.
function showPage(name, options = {}) {
  if (!VALID_PAGES.has(name)) name = 'home';
  const previousPageName = currentPageName;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  closeNav();
  window.scrollTo(0, 0);
  currentPageName = name;
  if (options.updateHistory !== false && previousPageName !== name) {
    history.pushState({ orfeasPage: name }, '', getUrlForPage(name));
  }
}

const initialPage = VALID_PAGES.has(new URLSearchParams(location.search).get('page'))
  ? new URLSearchParams(location.search).get('page')
  : 'home';
history.replaceState({ orfeasPage: initialPage }, '', getUrlForPage(initialPage));
if (initialPage !== 'home') showPage(initialPage, { updateHistory: false });

window.addEventListener('popstate', e => {
  if (walFullscreenOn) {
    try { walExitFullscreen({ updateHistory: false }); } catch (err) {}
    return;
  }
  const fallbackPage = VALID_PAGES.has(new URLSearchParams(location.search).get('page'))
    ? new URLSearchParams(location.search).get('page')
    : 'home';
  const targetPage = e.state?.orfeasPage || fallbackPage;
  beforePageChange(targetPage);
  showPage(targetPage, { updateHistory: false });
});

function toggleNav() {
  const sideNav = document.getElementById('sideNav');
  const navOverlay = document.getElementById('navOverlay');
  const menuBtn = document.getElementById('menuBtn');
  sideNav.classList.toggle('open');
  navOverlay.classList.toggle('open');
  const isOpen = sideNav.classList.contains('open');
  sideNav.setAttribute('aria-hidden', String(!isOpen));
  if (menuBtn) menuBtn.setAttribute('aria-expanded', String(isOpen));
}

function closeNav() {
  const sideNav = document.getElementById('sideNav');
  const navOverlay = document.getElementById('navOverlay');
  const menuBtn = document.getElementById('menuBtn');
  sideNav.classList.remove('open');
  navOverlay.classList.remove('open');
  sideNav.setAttribute('aria-hidden', 'true');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}

// ── MODAL ────────────────────────────────────────────────────
function openModal(c) {
  document.getElementById('modal-img').src = c.file;
  document.getElementById('modal-name').textContent = c.name;
  document.getElementById('modal-role').textContent = c.role;
  document.getElementById('modal-desc').textContent = c.desc || 'More details coming soon...';
  document.getElementById('charModal').classList.add('open');
}
function closeModalDirect() {
  document.getElementById('charModal').classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (walFullscreenOn) try { walExitFullscreen(); } catch (err) {}
  closeNav();
  closeModalDirect();
});

// ── RENDER CHARACTERS ────────────────────────────────────────
function buildCharacters() {
  const grid = document.getElementById('chars-grid');
  grid.innerHTML = '';
  characters.forEach(c => {
    const card = document.createElement('div');
    card.className = 'char-card' + (c.unlocked ? ' unlocked' : ' locked') + (c.villain ? ' villain' : '');
    if (c.unlocked) card.addEventListener('click', () => openModal(c));
    card.innerHTML = `
      <div class="char-img-wrap">
        <img src="${c.file}" alt="${c.name}" loading="lazy" decoding="async">
        ${c.unlocked ? '<div class="unlock-badge">+ Unlocked</div>' : `
        <div class="lock-overlay">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Coming Soon</span>
        </div>`}
      </div>
      <div class="char-info">
        <div class="char-name">${c.name}</div>
        <div class="char-role">${c.role}</div>
      </div>`;
    grid.appendChild(card);
  });
}
buildCharacters();

// ── AUDIO PLAYER STATE ───────────────────────────────────────
const audioEl = document.getElementById('audio-el');
let currentStory = null;
let currentLang = { 1: 'en', 2: 'en', 3: 'en', 4: 'en' };
let isPlaying = false;

function setCardLang(storyId, lang, btn) {
  currentLang[storyId] = lang;
  const toggle = btn?.closest('.card-lang-toggle');
  if (toggle) {
    toggle.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function fmtTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

// ── BACKGROUND MUSIC ─────────────────────────────────────────
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.35;
let musicPlaying = false;

function toggleMusic() {
  const btn = document.getElementById('musicBtn');
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    btn.classList.remove('playing');
    btn.innerHTML = '🎵 <span class="music-label">Music</span>';
    btn.title = 'Play background music';
  } else {
    bgMusic.play().then(() => {
      musicPlaying = true;
      btn.classList.add('playing');
      btn.innerHTML = '🔊 <span class="music-label">On</span>';
      btn.title = 'Stop background music';
    }).catch(() => {});
  }
}

// ── STARS CANVAS ─────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 4000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const a = s.alpha * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();

// ── COMIC READER ─────────────────────────────────────────────
let comicPage = 1;
let COMIC_PAGES = 3;
let comicLang = 'en';
let comicPageIdFn = n => 'cpage-' + n;
let comicNavId = 'comic-s1-nav';

function setComicLang(lang, btn) {
  comicLang = lang;
  document.querySelectorAll('.comic-lang-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = btn || document.querySelector(`.comic-lang-btn[data-lang="${lang}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = (lang === 'gr') ? el.dataset.gr : el.dataset.en;
  });
}

function goToComicPage(n) {
  document.querySelectorAll('.comic-page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(comicPageIdFn(n));
  if (target) {
    target.classList.add('active');
    target.querySelectorAll('img').forEach(img => {
      img.loading = 'eager';
      if (!img.complete || img.naturalWidth === 0) {
        const src = img.src; img.src = ''; img.src = src;
      }
    });
  }
  comicPage = n;
  const activeNav = document.getElementById(comicNavId);
  if (activeNav) activeNav.querySelectorAll('.comic-dot').forEach((d, i) => {
    const isActive = i + 1 === n;
    d.classList.toggle('active', isActive);
    if (isActive) d.setAttribute('aria-current', 'page');
    else d.removeAttribute('aria-current');
  });
  const prev = document.getElementById('comic-prev');
  const next = document.getElementById('comic-next');
  if (prev) prev.disabled = (n === 1);
  if (next) next.disabled = (n === COMIC_PAGES);
  const reader = document.querySelector('#page-comic .comic-reader');
  if (reader) reader.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function comicPrev() {
  if (comicPage > 1) { walSyncPausedUntil = Date.now() + 15000; goToComicPage(comicPage - 1); }
}
function comicNext() {
  if (comicPage < COMIC_PAGES) { walSyncPausedUntil = Date.now() + 15000; goToComicPage(comicPage + 1); }
}

function showComicFromStory() {
  const s1nav = document.getElementById('comic-s1-nav');
  const s2nav = document.getElementById('comic-s2-nav');
  const s3nav = document.getElementById('comic-s3-nav');
  const s4nav = document.getElementById('comic-s4-nav');
  const s5nav = document.getElementById('comic-s5-nav');
  const s6nav = document.getElementById('comic-s6-nav');
  const title = document.getElementById('comic-title');
  if (walStoryId === 6) {
    COMIC_PAGES = 5; comicPageIdFn = n => 's6p-' + n; comicNavId = 'comic-s6-nav';
    if (title) title.textContent = 'Episode VI — Duke Kaboom';
    if (s1nav) s1nav.style.display = 'none';
    if (s2nav) s2nav.style.display = 'none';
    if (s3nav) s3nav.style.display = 'none';
    if (s4nav) s4nav.style.display = 'none';
    if (s5nav) s5nav.style.display = 'none';
    if (s6nav) s6nav.style.display = 'flex';
  } else if (walStoryId === 5) {
    COMIC_PAGES = 6; comicPageIdFn = n => 's5p-' + n; comicNavId = 'comic-s5-nav';
    if (title) title.textContent = 'Episode V — Saving Gorillatsos';
    if (s1nav) s1nav.style.display = 'none';
    if (s2nav) s2nav.style.display = 'none';
    if (s3nav) s3nav.style.display = 'none';
    if (s4nav) s4nav.style.display = 'none';
    if (s5nav) s5nav.style.display = 'flex';
    if (s6nav) s6nav.style.display = 'none';
  } else if (walStoryId === 4) {
    COMIC_PAGES = 4; comicPageIdFn = n => 's4p-' + n; comicNavId = 'comic-s4-nav';
    if (title) title.textContent = 'Episode IV — Rillas and King Kong';
    if (s1nav) s1nav.style.display = 'none';
    if (s2nav) s2nav.style.display = 'none';
    if (s3nav) s3nav.style.display = 'none';
    if (s4nav) s4nav.style.display = 'flex';
    if (s5nav) s5nav.style.display = 'none';
    if (s6nav) s6nav.style.display = 'none';
  } else if (walStoryId === 3) {
    COMIC_PAGES = 4; comicPageIdFn = n => 's3p-' + n; comicNavId = 'comic-s3-nav';
    if (title) title.textContent = 'Episode III — Rillas the Wrestler';
    if (s1nav) s1nav.style.display = 'none';
    if (s2nav) s2nav.style.display = 'none';
    if (s3nav) s3nav.style.display = 'flex';
    if (s4nav) s4nav.style.display = 'none';
    if (s5nav) s5nav.style.display = 'none';
    if (s6nav) s6nav.style.display = 'none';
  } else if (walStoryId === 2) {
    COMIC_PAGES = 4; comicPageIdFn = n => 's2p-' + n; comicNavId = 'comic-s2-nav';
    if (title) title.textContent = 'Episode II — Rillas the Gorilla';
    if (s1nav) s1nav.style.display = 'none';
    if (s2nav) s2nav.style.display = 'flex';
    if (s3nav) s3nav.style.display = 'none';
    if (s4nav) s4nav.style.display = 'none';
    if (s5nav) s5nav.style.display = 'none';
    if (s6nav) s6nav.style.display = 'none';
  } else {
    COMIC_PAGES = 3; comicPageIdFn = n => 'cpage-' + n; comicNavId = 'comic-s1-nav';
    if (title) title.textContent = 'Episode I — The Day Two Friends Met';
    if (s1nav) s1nav.style.display = 'flex';
    if (s2nav) s2nav.style.display = 'none';
    if (s3nav) s3nav.style.display = 'none';
    if (s4nav) s4nav.style.display = 'none';
    if (s5nav) s5nav.style.display = 'none';
    if (s6nav) s6nav.style.display = 'none';
  }
  goToComicPage(1);
  beforePageChange('comic');
  showPage('comic');
}

// ── WATCH & LISTEN ───────────────────────────────────────────
function showWatchAndListen(storyId) {
  walStoryId = storyId;
  walLang = (currentLang && currentLang[storyId]) || 'en';
  showComicFromStory();
  const wb = document.getElementById('wal-bar');
  if (wb) wb.classList.remove('hidden');
  const file = audioFiles[storyId]?.[walLang];
  if (file) { audioEl.src = file; audioEl.currentTime = 0; }
  audioEl.onerror = () => {
    if (isPlaying || walPlaying) walStartSpeech();
  };
  document.querySelectorAll('#wal-btn-en, #wal-btn-gr').forEach(b => b.classList.remove('active'));
  const lb = document.getElementById('wal-btn-' + walLang);
  if (lb) lb.classList.add('active');
  setComicLang(walLang);
}

function walStop() {
  walPlaying = false;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  audioEl.pause();
  audioEl.currentTime = 0;
  isPlaying = false;
  const btn = document.getElementById('wal-play-btn');
  if (btn) btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
}

function walTogglePlay() {
  if (audioEl.paused) {
    walPlaying = true;
    audioEl.play().then(() => {
      isPlaying = true;
      const btn = document.getElementById('wal-play-btn');
      if (btn) btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    }).catch(() => {});
  } else {
    walPlaying = false;
    audioEl.pause();
    isPlaying = false;
    const btn = document.getElementById('wal-play-btn');
    if (btn) btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  }
}

function walStartSpeech() {
  if (!('speechSynthesis' in window)) return;
  walStopSpeech();
  const data = storyText[walStoryId]?.[walLang];
  if (!data) return;
  walSpeechUtterance = new SpeechSynthesisUtterance(data.text);
  walSpeechUtterance.lang = walLang === 'gr' ? 'el-GR' : 'en-GB';
  walSpeechUtterance.onend = () => { walPlaying = false; };
  window.speechSynthesis.speak(walSpeechUtterance);
}

function walStopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  walSpeechUtterance = null;
}

function walSeek(e) {
  if (!audioEl.duration) return;
  const rect = e.currentTarget.getBoundingClientRect();
  audioEl.currentTime = ((e.clientX - rect.left) / rect.width) * audioEl.duration;
}

function walToggleSync() {
  walSyncOn = !walSyncOn;
  const btn = document.getElementById('wal-sync-btn');
  if (!btn) return;
  btn.textContent = walSyncOn ? '🔄 Sync ON' : '🔄 Sync OFF';
  btn.setAttribute('aria-pressed', String(walSyncOn));
  btn.style.background = walSyncOn ? 'rgba(123,47,255,0.3)' : 'rgba(255,255,255,0.1)';
  btn.style.borderColor = walSyncOn ? 'rgba(123,47,255,0.6)' : 'rgba(255,255,255,0.3)';
}

function walSetLang(lang, btn) {
  walLang = lang;
  if (walStoryId && currentLang) currentLang[walStoryId] = lang;
  const wasPlaying = !audioEl.paused;
  const file = audioFiles[walStoryId]?.[lang];
  if (file) {
    audioEl.src = file;
    audioEl.currentTime = 0;
    if (wasPlaying) audioEl.play().catch(() => walStartSpeech());
  }
  document.querySelectorAll('#wal-btn-en, #wal-btn-gr').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  setComicLang(lang);
}

function walEnterFullscreen() {
  const pc = document.getElementById('page-comic');
  if (pc) pc.classList.add('fullscreen-mode');
  walFullscreenOn = true;
  if (pc && pc.requestFullscreen) pc.requestFullscreen().catch(() => {});
  history.pushState({ orfeasPage: 'comic', walFullscreen: true }, '', getUrlForPage('comic'));
  const eb = document.getElementById('wal-fullscreen-btn');
  const xb = document.getElementById('wal-exit-fullscreen-btn');
  if (eb) eb.style.display = 'none';
  if (xb) xb.style.display = '';
}

function walExitFullscreen(opts) {
  const pc = document.getElementById('page-comic');
  if (pc) pc.classList.remove('fullscreen-mode');
  walFullscreenOn = false;
  if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  if (opts?.updateHistory !== false && history.state?.walFullscreen) {
    history.replaceState({ orfeasPage: 'comic' }, '', getUrlForPage('comic'));
  }
  const eb = document.getElementById('wal-fullscreen-btn');
  const xb = document.getElementById('wal-exit-fullscreen-btn');
  if (eb) eb.style.display = '';
  if (xb) xb.style.display = 'none';
}

audioEl.addEventListener('timeupdate', () => {
  if (!walStoryId) return;
  const pct = audioEl.duration ? (audioEl.currentTime / audioEl.duration) * 100 : 0;
  const fill = document.getElementById('wal-progress-fill');
  if (fill) fill.style.width = pct + '%';
  const timeEl = document.getElementById('wal-time');
  if (timeEl) timeEl.textContent = fmtTime(audioEl.currentTime) + ' / ' + fmtTime(audioEl.duration);
  const syncBtn = document.getElementById('wal-sync-btn');
  if (syncBtn && syncBtn.textContent.includes('ON') && audioEl.duration && Date.now() > walSyncPausedUntil) {
    const frac = audioEl.currentTime / audioEl.duration;
    const target = Math.min(COMIC_PAGES, Math.max(1, Math.ceil(frac * COMIC_PAGES + 0.01)));
    if (target !== comicPage) goToComicPage(target);
  }
});

audioEl.addEventListener('ended', () => {
  walPlaying = false;
  isPlaying = false;
  const btn = document.getElementById('wal-play-btn');
  if (btn) btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
});

// ── STORY READER ─────────────────────────────────────────────
let _readerStoryId = null;

function showStoryText(storyId) {
  _readerStoryId = storyId;
  const lang = (currentLang && currentLang[storyId]) || 'en';
  _renderStoryReader(storyId, lang);
  document.querySelectorAll('#reader-btn-en, #reader-btn-gr').forEach(b => b.classList.remove('active'));
  const ab = document.getElementById('reader-btn-' + lang);
  if (ab) ab.classList.add('active');
  beforePageChange('story-reader');
  showPage('story-reader');
}

function setReaderLang(lang, btn) {
  if (_readerStoryId === null) return;
  if (currentLang) currentLang[_readerStoryId] = lang;
  document.querySelectorAll('#reader-btn-en, #reader-btn-gr').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  _renderStoryReader(_readerStoryId, lang);
}

function _renderStoryReader(storyId, lang) {
  const body = document.getElementById('story-reader-body');
  if (!body) return;
  const data = storyText[storyId] && storyText[storyId][lang];
  if (!data) { body.innerHTML = '<p>Story not found.</p>'; return; }
  const imgs = storyImages[storyId] || [];
  const imgAt = {};
  imgs.forEach(function (im) { imgAt[im.after] = im.src; });
  const paragraphs = data.text.split('\n\n');
  let html = '<h2>' + data.title + '</h2>';
  paragraphs.forEach(function (p, i) {
    html += '<p>' + p.replace(/\n/g, '<br>') + '</p>';
    if (imgAt[i] !== undefined) {
      html += '<img class="story-illustration" src="' + imgAt[i] + '" alt="" loading="lazy" decoding="async">';
    }
  });
  body.innerHTML = html;
}

// ── EVENT DELEGATION ─────────────────────────────────────────
// Replaces all inline onclick handlers.
document.addEventListener('click', function (e) {
  // Modal overlay close
  if (e.target.id === 'charModal') { closeModalDirect(); return; }

  const el = e.target.closest('[data-action]');
  if (!el) return;

  switch (el.dataset.action) {
    case 'show-page':          beforePageChange(el.dataset.page); showPage(el.dataset.page); break;
    case 'toggle-nav':         toggleNav(); break;
    case 'close-nav':          closeNav(); break;
    case 'toggle-music':       toggleMusic(); break;
    case 'set-card-lang':      setCardLang(+el.dataset.story, el.dataset.lang, el); break;
    case 'show-story-text':    showStoryText(+el.dataset.story); break;
    case 'show-wal':           showWatchAndListen(+el.dataset.story); break;
    case 'set-reader-lang':    setReaderLang(el.dataset.lang, el); break;
    case 'wal-toggle-play':    walTogglePlay(); break;
    case 'wal-seek':           walSeek(e); break;
    case 'wal-enter-fullscreen': walEnterFullscreen(); break;
    case 'wal-exit-fullscreen':  walExitFullscreen(); break;
    case 'wal-set-lang':       walSetLang(el.dataset.lang, el); break;
    case 'set-comic-lang':     setComicLang(el.dataset.lang, el); break;
    case 'comic-prev':         comicPrev(); break;
    case 'comic-next':         comicNext(); break;
    case 'comic-go':           goToComicPage(+el.dataset.page); break;
    case 'close-modal':        closeModalDirect(); break;
  }
});
