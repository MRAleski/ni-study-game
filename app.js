/* ═══════════════════════════════════════════════════════════════════
   NI STUDY GAME — app.js
   Modes: Flashcards | Match | Quiz | Scenario
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ── Utilities ─────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

// ── Theme Toggle ──────────────────────────────────────────────────
(function () {
  const t = qs('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  if (!t) return;
  const sunSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moonSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  t.innerHTML = d === 'dark' ? sunSVG : moonSVG;
  t.addEventListener('click', () => {
    d = d === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', d);
    t.innerHTML = d === 'dark' ? sunSVG : moonSVG;
    t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
  });
})();

// ── Mode Navigation ────────────────────────────────────────────────
const MODE_IDS = { flashcards: 'flashcardsMode', match: 'matchMode', quiz: 'quizMode', scenario: 'scenarioMode', extracredit: 'extracreditMode' };
let currentMode = 'flashcards';

qsa('.mode-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const mode = tab.dataset.mode;
    if (mode === currentMode) return;
    qsa('.mode-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    qsa('.game-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    qs('#' + MODE_IDS[mode]).classList.add('active');
    currentMode = mode;
    if (mode === 'match') initMatch();
    if (mode === 'quiz') initQuiz();
    if (mode === 'scenario') initScenario();
    if (mode === 'extracredit') renderECReport();
  });
});

// ══════════════════════════════════════════════════════════════════
//  FLASHCARDS
// ══════════════════════════════════════════════════════════════════
let fcDeck = [];
let fcIndex = 0;
const knownSet = new Set();

const fcCard    = qs('#flashcard');
const cardInner = qs('#cardInner');
const cardTerm  = qs('#cardTerm');
const cardDef   = qs('#cardDef');
const cardTag   = qs('#cardTag');
const cardQB    = qs('#cardQB');
const cardCounter = qs('#cardCounter');
const fcProgress  = qs('#fcProgress');
const fcProgressLabel = qs('#fcProgressLabel');

const CATEGORY_LABELS = {
  parties: 'Parties & Roles', formation: 'Formation', transfer: 'Transfer & Indorsements',
  hdc: 'Holder in Due Course', liability: 'Liability', defenses: 'Defenses'
};

function buildDeck(category = 'all') {
  fcDeck = category === 'all' ? [...CARDS] : CARDS.filter(c => c.category === category);
  fcIndex = 0;
  renderCard();
  updateProgress();
}

function renderCard() {
  if (!fcDeck.length) return;
  const card = fcDeck[fcIndex];
  fcCard.classList.remove('flipped');
  fcCard.setAttribute('aria-pressed', 'false');
  // Small delay so flip-back animates properly
  setTimeout(() => {
    cardTerm.textContent = card.term;
    cardDef.textContent = card.def;
    cardTag.textContent = CATEGORY_LABELS[card.category] || card.category;
    cardQB.textContent = card.qb || '';
  }, fcCard.classList.contains('flipped') ? 280 : 0);
  cardCounter.textContent = `${fcIndex + 1} / ${fcDeck.length}`;
}

function updateProgress() {
  const known = fcDeck.filter(c => knownSet.has(c.term)).length;
  const pct = fcDeck.length ? (known / fcDeck.length) * 100 : 0;
  fcProgress.style.width = pct + '%';
  fcProgressLabel.textContent = `${known} of ${fcDeck.length} known`;
}

fcCard.addEventListener('click', () => {
  fcCard.classList.toggle('flipped');
  fcCard.setAttribute('aria-pressed', String(fcCard.classList.contains('flipped')));
});
fcCard.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fcCard.click(); } });

qs('#prevBtn').addEventListener('click', () => {
  fcIndex = (fcIndex - 1 + fcDeck.length) % fcDeck.length;
  renderCard();
});
qs('#nextBtn').addEventListener('click', () => {
  fcIndex = (fcIndex + 1) % fcDeck.length;
  renderCard();
});
qs('#shuffleBtn').addEventListener('click', () => {
  fcDeck = shuffle(fcDeck);
  fcIndex = 0;
  renderCard();
});
qs('#markKnownBtn').addEventListener('click', () => {
  if (!fcDeck.length) return;
  const card = fcDeck[fcIndex];
  knownSet.add(card.term);
  updateProgress();
  // Auto-advance
  if (fcIndex < fcDeck.length - 1) fcIndex++;
  renderCard();
});
qs('#categoryFilter').addEventListener('change', e => buildDeck(e.target.value));

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (currentMode !== 'flashcards') return;
  if (e.key === 'ArrowRight') qs('#nextBtn').click();
  if (e.key === 'ArrowLeft')  qs('#prevBtn').click();
  if (e.key === ' ')          { e.preventDefault(); fcCard.click(); }
});

buildDeck();

// ══════════════════════════════════════════════════════════════════
//  MATCH GAME
// ══════════════════════════════════════════════════════════════════
const MATCH_SIZE = 8;
let matchSelected = null;
let matchPairs = 0;
let matchTotal = 0;
let matchTimerID = null;
let matchSeconds = 0;

function formatTime(s) {
  const m = Math.floor(s / 60);
  return `⏱ ${m}:${String(s % 60).padStart(2,'0')}`;
}

function initMatch() {
  clearInterval(matchTimerID);
  matchSeconds = 0;
  matchPairs = 0;
  matchSelected = null;
  qs('#matchResult').classList.add('hidden');

  const pool = shuffle(CARDS).slice(0, MATCH_SIZE);
  matchTotal = pool.length;
  qs('#matchLeft').textContent = `${matchTotal} pairs left`;
  qs('#matchTimer').textContent = formatTime(0);

  // Build left (terms) and right (defs) columns, shuffled independently
  const terms = shuffle(pool.map((c, i) => ({ label: c.term, pairId: i, isLeft: true })));
  const defs  = shuffle(pool.map((c, i) => ({ label: c.def,  pairId: i, isLeft: false })));

  const board = qs('#matchBoard');
  board.innerHTML = '';
  // Interleave: term col and def col side-by-side per row
  terms.forEach((term, i) => {
    const def = defs[i];
    board.appendChild(makeTile(term));
    board.appendChild(makeTile(def));
  });

  matchTimerID = setInterval(() => {
    matchSeconds++;
    qs('#matchTimer').textContent = formatTime(matchSeconds);
  }, 1000);
}

function makeTile(data) {
  const btn = document.createElement('button');
  btn.className = 'match-tile' + (data.isLeft ? ' term-tile' : '');
  btn.textContent = data.label;
  btn.dataset.pairId = data.pairId;
  btn.dataset.isLeft = data.isLeft;
  btn.setAttribute('role', 'listitem');
  btn.addEventListener('click', handleMatchClick);
  return btn;
}

function handleMatchClick(e) {
  const tile = e.currentTarget;
  if (tile.classList.contains('matched') || tile.classList.contains('selected')) return;

  if (!matchSelected) {
    tile.classList.add('selected');
    matchSelected = tile;
    return;
  }

  const prevId  = matchSelected.dataset.pairId;
  const thisId  = tile.dataset.pairId;
  const prevLeft = matchSelected.dataset.isLeft;
  const thisLeft = tile.dataset.isLeft;

  // Must be different sides
  if (prevLeft === thisLeft) {
    // Same side — switch selection
    matchSelected.classList.remove('selected');
    tile.classList.add('selected');
    matchSelected = tile;
    return;
  }

  if (prevId === thisId) {
    // Match!
    [matchSelected, tile].forEach(t => { t.classList.remove('selected'); t.classList.add('matched'); t.setAttribute('disabled', ''); });
    matchPairs++;
    const left = matchTotal - matchPairs;
    qs('#matchLeft').textContent = left === 0 ? 'All matched! 🎉' : `${left} pair${left !== 1 ? 's' : ''} left`;
    matchSelected = null;
    if (matchPairs === matchTotal) matchComplete();
  } else {
    // No match
    [matchSelected, tile].forEach(t => t.classList.add('wrong'));
    const prev = matchSelected;
    setTimeout(() => {
      [prev, tile].forEach(t => { t.classList.remove('wrong', 'selected'); });
    }, 600);
    matchSelected = null;
  }
}

function matchComplete() {
  clearInterval(matchTimerID);
  const res = qs('#matchResult');
  qs('#matchResultText').textContent = `All matched in ${formatTime(matchSeconds).replace('⏱ ','')}! 🎉`;
  res.classList.remove('hidden');
}

qs('#matchNewGame').addEventListener('click', initMatch);
qs('#matchPlayAgain').addEventListener('click', initMatch);

// ══════════════════════════════════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════════════════════════════════
let quizDeck = [];
let quizIndex = 0;
let quizScore = 0;
let missedQuiz = [];

function initQuiz() {
  quizDeck = shuffle(QUIZ_QUESTIONS);
  quizIndex = 0; quizScore = 0; missedQuiz = [];
  qs('#quizDone').classList.add('hidden');
  qs('#quizCard').classList.remove('hidden');
  renderQuizQ();
}

function renderQuizQ() {
  const q = quizDeck[quizIndex];
  const pct = (quizIndex / quizDeck.length) * 100;
  qs('#quizProgressBar').style.width = pct + '%';
  qs('#quizQNum').textContent = `Question ${quizIndex + 1} of ${quizDeck.length}`;
  qs('#quizScore').textContent = `Score: ${quizScore}`;
  qs('#quizQuestion').textContent = q.q;
  qs('#quizFeedback').classList.add('hidden');
  qs('#quizFeedback').className = 'quiz-feedback hidden';
  qs('#quizNextBtn').classList.add('hidden');

  const opts = qs('#quizOptions');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.setAttribute('role', 'listitem');
    btn.addEventListener('click', () => handleQuizAnswer(i, q));
    opts.appendChild(btn);
  });
}

function handleQuizAnswer(chosen, q) {
  const optBtns = qsa('.quiz-option', qs('#quizOptions'));
  optBtns.forEach(b => b.setAttribute('disabled', ''));
  optBtns[q.answer].classList.add('correct');

  const fb = qs('#quizFeedback');
  if (chosen === q.answer) {
    quizScore++;
    optBtns[chosen].classList.add('correct');
    fb.innerHTML = `<strong>✓ Correct!</strong>${q.explain}`;
    fb.className = 'quiz-feedback correct-fb';
  } else {
    optBtns[chosen].classList.add('wrong');
    fb.innerHTML = `<strong>✗ Not quite.</strong>${q.explain}`;
    fb.className = 'quiz-feedback wrong-fb';
    missedQuiz.push(q);
  }
  fb.classList.remove('hidden');
  qs('#quizScore').textContent = `Score: ${quizScore}`;
  qs('#quizNextBtn').classList.remove('hidden');
}

qs('#quizNextBtn').addEventListener('click', () => {
  quizIndex++;
  if (quizIndex >= quizDeck.length) {
    showQuizDone();
  } else {
    renderQuizQ();
  }
});

function showQuizDone() {
  qs('#quizProgressBar').style.width = '100%';
  qs('#quizCard').classList.add('hidden');
  const pct = Math.round((quizScore / quizDeck.length) * 100);
  qs('#doneScore').textContent = `${quizScore} / ${quizDeck.length} — ${pct}%`;
  const msgs = {
    90: "Excellent! You have mastered Chapter 13. 🏆",
    70: "Solid work — review the missed items to lock them in.",
    50: "Good effort. Focus on the defenses and HDC elements.",
    0:  "Keep going! Flashcard mode is a great place to start."
  };
  qs('#doneMsg').textContent = Object.entries(msgs).reverse().find(([t]) => pct >= Number(t))[1];
  qs('#quizDone').classList.remove('hidden');
  qs('#quizReview').classList.toggle('hidden', missedQuiz.length === 0);
  updateScoreDisplay(quizScore, quizDeck.length);
  recordQuizScore(quizScore, quizDeck.length);
}

qs('#quizRestart').addEventListener('click', initQuiz);
qs('#quizReview').addEventListener('click', () => {
  if (!missedQuiz.length) return;
  quizDeck = shuffle(missedQuiz);
  quizIndex = 0; quizScore = 0; missedQuiz = [];
  qs('#quizDone').classList.add('hidden');
  qs('#quizCard').classList.remove('hidden');
  renderQuizQ();
});

// ══════════════════════════════════════════════════════════════════
//  SCENARIO
// ══════════════════════════════════════════════════════════════════
let scenDeck = [];
let scenIndex = 0;
let scenScore = 0;

function initScenario() {
  scenDeck = shuffle(SCENARIOS);
  scenIndex = 0; scenScore = 0;
  qs('#scenDone').classList.add('hidden');
  qs('#scenCard').classList.remove('hidden');
  renderScenQ();
}

function renderScenQ() {
  const q = scenDeck[scenIndex];
  const pct = (scenIndex / scenDeck.length) * 100;
  qs('#scenProgressBar').style.width = pct + '%';
  qs('#scenQNum').textContent = `Scenario ${scenIndex + 1} of ${scenDeck.length}`;
  qs('#scenScore').textContent = `Score: ${scenScore}`;
  qs('#scenLabel').textContent = q.label;
  qs('#scenQuestion').textContent = q.q;
  qs('#scenFeedback').classList.add('hidden');
  qs('#scenFeedback').className = 'quiz-feedback hidden';
  qs('#scenNextBtn').classList.add('hidden');

  const opts = qs('#scenOptions');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.setAttribute('role', 'listitem');
    btn.addEventListener('click', () => handleScenAnswer(i, q));
    opts.appendChild(btn);
  });
}

function handleScenAnswer(chosen, q) {
  const optBtns = qsa('.quiz-option', qs('#scenOptions'));
  optBtns.forEach(b => b.setAttribute('disabled', ''));
  optBtns[q.answer].classList.add('correct');

  const fb = qs('#scenFeedback');
  if (chosen === q.answer) {
    scenScore++;
    optBtns[chosen].classList.add('correct');
    fb.innerHTML = `<strong>✓ Correct!</strong>${q.explain}`;
    fb.className = 'quiz-feedback correct-fb';
  } else {
    optBtns[chosen].classList.add('wrong');
    fb.innerHTML = `<strong>✗ Not quite.</strong>${q.explain}`;
    fb.className = 'quiz-feedback wrong-fb';
  }
  fb.classList.remove('hidden');
  qs('#scenScore').textContent = `Score: ${scenScore}`;
  qs('#scenNextBtn').classList.remove('hidden');
}

qs('#scenNextBtn').addEventListener('click', () => {
  scenIndex++;
  if (scenIndex >= scenDeck.length) {
    showScenDone();
  } else {
    renderScenQ();
  }
});

function showScenDone() {
  qs('#scenProgressBar').style.width = '100%';
  qs('#scenCard').classList.add('hidden');
  const pct = Math.round((scenScore / scenDeck.length) * 100);
  qs('#scenDoneScore').textContent = `${scenScore} / ${scenDeck.length} — ${pct}%`;
  const msgs = {
    90: "Outstanding! You can apply negotiable instruments law like a pro. 🏆",
    70: "Strong performance — revisit the scenarios you missed.",
    50: "Getting there! The scenario mode is great for exam prep.",
    0:  "Keep practicing — scenario reasoning builds with each attempt."
  };
  qs('#scenDoneMsg').textContent = Object.entries(msgs).reverse().find(([t]) => pct >= Number(t))[1];
  qs('#scenDone').classList.remove('hidden');
  updateScoreDisplay(scenScore, scenDeck.length);
  recordScenScore(scenScore, scenDeck.length);
}

qs('#scenRestart').addEventListener('click', initScenario);

// ── Global score display ──────────────────────────────────────────
function updateScoreDisplay(score, total) {
  qs('#scoreDisplay').textContent = `${score}/${total} ✓`;
}

// ══════════════════════════════════════════════════════════════════
//  EXTRA CREDIT SYSTEM
// ══════════════════════════════════════════════════════════════════

// Stores best (highest) scores across retakes
const ecState = {
  quizScore: null,   // raw correct count
  quizTotal: null,
  scenScore: null,
  scenTotal: null
};

// Point tiers
function quizPoints(pct) {
  if (pct >= 90) return 15;
  if (pct >= 75) return 12;
  if (pct >= 60) return 8;
  return 0;
}
function scenPoints(pct) {
  if (pct >= 90) return 10;
  if (pct >= 75) return 8;
  if (pct >= 60) return 5;
  return 0;
}

// Called at end of quiz
function recordQuizScore(score, total) {
  // Keep the highest score across retakes
  if (ecState.quizScore === null || score > ecState.quizScore) {
    ecState.quizScore = score;
    ecState.quizTotal = total;
  }
  updateECStatusCards();
  highlightECTab();
}

// Called at end of scenario
function recordScenScore(score, total) {
  if (ecState.scenScore === null || score > ecState.scenScore) {
    ecState.scenScore = score;
    ecState.scenTotal = total;
  }
  updateECStatusCards();
  highlightECTab();
}

// Update the status cards visible on the EC tab
function updateECStatusCards() {
  const qLabel = qs('#ecQuizLabel');
  const sLabel = qs('#ecScenLabel');
  const qCard  = qs('#ecQuizStatus');
  const sCard  = qs('#ecScenStatus');

  if (ecState.quizScore !== null) {
    const pct = Math.round((ecState.quizScore / ecState.quizTotal) * 100);
    const pts = quizPoints(pct);
    qLabel.textContent = `${ecState.quizScore}/${ecState.quizTotal} (${pct}%) — ${pts} pts`;
    qCard.classList.add('ec-done');
  }
  if (ecState.scenScore !== null) {
    const pct = Math.round((ecState.scenScore / ecState.scenTotal) * 100);
    const pts = scenPoints(pct);
    sLabel.textContent = `${ecState.scenScore}/${ecState.scenTotal} (${pct}%) — ${pts} pts`;
    sCard.classList.add('ec-done');
  }
}

// Pulse the Extra Credit tab when a score is recorded
function highlightECTab() {
  const tab = qs('#ecTab');
  tab.classList.add('ec-pulse');
  setTimeout(() => tab.classList.remove('ec-pulse'), 2000);
}

// Build a tamper-evident verification code
// Format: NI-Qxx-Syy-Pzz-CHKK
// Q = quiz pct (0-100), S = scen pct (0-100), P = total pts (0-25)
// CHK = simple checksum
function buildVerificationCode(qPct, sPct, totalPts) {
  const datestamp = new Date().toISOString().slice(0,10).replace(/-/g,'');
  const raw = `NI-Q${String(qPct).padStart(3,'0')}-S${String(sPct).padStart(3,'0')}-P${String(totalPts).padStart(2,'0')}-D${datestamp}`;
  // Checksum: sum of all digits mod 97, formatted as two digits
  const digits = raw.replace(/\D/g,'');
  const chk = String(digits.split('').reduce((a,c) => a + Number(c), 0) % 97).padStart(2,'0');
  return raw + '-' + chk;
}

// Render the full EC report
function renderECReport() {
  const bothDone = ecState.quizScore !== null && ecState.scenScore !== null;
  qs('#ecReport').classList.toggle('hidden', !bothDone);
  qs('#ecPending').classList.toggle('hidden', bothDone);

  updateECStatusCards();

  if (!bothDone) return;

  const qPct  = Math.round((ecState.quizScore / ecState.quizTotal) * 100);
  const sPct  = Math.round((ecState.scenScore / ecState.scenTotal) * 100);
  const qPts  = quizPoints(qPct);
  const sPts  = scenPoints(sPct);
  const total = qPts + sPts;

  // Date
  qs('#ecDate').textContent = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

  // Score cells
  qs('#ecQuizScoreVal').textContent  = `${ecState.quizScore} / ${ecState.quizTotal} (${qPct}%)`;
  qs('#ecQuizPts').textContent       = `${qPts} / 15 pts`;
  qs('#ecScenScoreVal').textContent  = `${ecState.scenScore} / ${ecState.scenTotal} (${sPct}%)`;
  qs('#ecScenPts').textContent       = `${sPts} / 10 pts`;
  qs('#ecTotalPts').textContent      = total;

  // Color total by achievement
  const totalEl = qs('#ecTotalPts');
  totalEl.className = 'ec-score-val ec-total-val ' + (total >= 22 ? 'pts-high' : total >= 15 ? 'pts-mid' : 'pts-low');

  // Verification code
  const code = buildVerificationCode(qPct, sPct, total);
  qs('#ecCode').textContent = code;
}

// Navigate to EC tab from done cards
function goToECTab() {
  const tab = qs('[data-mode="extracredit"]');
  if (tab) tab.click();
}

qs('#quizGoEC').addEventListener('click', goToECTab);
qs('#scenGoEC').addEventListener('click', goToECTab);

// Copy button
qs('#ecCopyBtn').addEventListener('click', () => {
  const code = qs('#ecCode').textContent;
  if (!code || code === '—') return;
  navigator.clipboard.writeText(code).then(() => {
    const btn = qs('#ecCopyBtn');
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  }).catch(() => {
    // Fallback for sandboxed iframes
    const ta = document.createElement('textarea');
    ta.value = code;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    const btn = qs('#ecCopyBtn');
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
});

// Print button
qs('#ecPrintBtn').addEventListener('click', () => window.print());

// Retake buttons
qs('#ecRetakeQuiz').addEventListener('click', () => { qs('[data-mode="quiz"]').click(); });
qs('#ecRetakeScen').addEventListener('click', () => { qs('[data-mode="scenario"]').click(); });

// EC score recording is called directly inside showQuizDone and showScenDone above.
