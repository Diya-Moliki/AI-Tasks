// Trailmarks — practice test platform for Sewa
// State model:
// { [questionId]: { attempts: [ { text, score, maxScore, breakdown, ts } ] } }

const STORAGE_KEY = "trailmarks_state_v1";
const MAX_ATTEMPTS = 3;
const STUDENT = { name: "Sewa Moliki", initials: "SM" };

let state = loadState();
let currentSubject = null; // null = overview
let openUnits = new Set();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function questionMax(q) {
  return q.rubric.reduce((s, r) => s + r.points, 0);
}

function gradeAnswer(q, text) {
  const lower = text.toLowerCase();
  const breakdown = q.rubric.map(r => {
    const met = r.keywords.some(k => lower.includes(k.toLowerCase()));
    return { criteria: r.criteria, points: r.points, met, hint: r.hint };
  });
  const score = breakdown.reduce((s, b) => s + (b.met ? b.points : 0), 0);
  return { score, maxScore: questionMax(q), breakdown };
}

function allQuestions() {
  const list = [];
  Object.values(CURRICULUM).forEach(subject => {
    subject.units.forEach(unit => {
      unit.questions.forEach(q => list.push(q));
    });
  });
  return list;
}

function latestAttempt(qId) {
  const rec = state[qId];
  if (!rec || rec.attempts.length === 0) return null;
  return rec.attempts[rec.attempts.length - 1];
}

function subjectStats(subjectKey) {
  const subject = CURRICULUM[subjectKey];
  let earned = 0, possible = 0, answered = 0, total = 0;
  subject.units.forEach(unit => {
    unit.questions.forEach(q => {
      total++;
      possible += questionMax(q);
      const la = latestAttempt(q.id);
      if (la) { earned += la.score; answered++; }
    });
  });
  return { earned, possible, answered, total, pct: possible ? Math.round((earned / possible) * 100) : 0 };
}

function overallStats() {
  let earned = 0, possible = 0, answered = 0, total = 0;
  allQuestions().forEach(q => {
    total++;
    possible += questionMax(q);
    const la = latestAttempt(q.id);
    if (la) { earned += la.score; answered++; }
  });
  return { earned, possible, answered, total, pct: possible ? Math.round((earned / possible) * 100) : 0 };
}

// ---------- Rendering ----------

const app = document.getElementById("app");

function render() {
  renderNav();
  if (!currentSubject) {
    renderOverview();
  } else {
    renderSubject(currentSubject);
  }
}

function renderNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = "";
  const overviewBtn = document.createElement("button");
  overviewBtn.textContent = "Overview";
  overviewBtn.className = currentSubject === null ? "active" : "";
  overviewBtn.onclick = () => { currentSubject = null; render(); };
  nav.appendChild(overviewBtn);

  Object.entries(CURRICULUM).forEach(([key, subject]) => {
    const btn = document.createElement("button");
    btn.textContent = subject.label;
    btn.className = currentSubject === key ? "active" : "";
    btn.onclick = () => { currentSubject = key; render(); };
    nav.appendChild(btn);
  });
}

function renderOverview() {
  const overall = overallStats();
  let html = `
    <div class="overview-hero">
      <h2 class="serif">Sewa's study trail</h2>
      <p>Practice sets pulled from the Math, Science, and Social Studies Year-at-a-Glance plans. Answer, get feedback, revise — up to ${MAX_ATTEMPTS} attempts per question.</p>
      <div class="mastery-row">
        <div class="mastery-stat"><div class="num">${overall.pct}%</div><div class="label">Overall mastery</div></div>
        <div class="mastery-stat"><div class="num">${overall.answered}/${overall.total}</div><div class="label">Questions attempted</div></div>
        <div class="mastery-stat"><div class="num">${overall.earned}/${overall.possible}</div><div class="label">Points earned</div></div>
      </div>
    </div>
    <div class="subject-grid">
  `;
  Object.entries(CURRICULUM).forEach(([key, subject]) => {
    const s = subjectStats(key);
    html += `
      <div class="subject-card" style="--card-accent:${subject.accent}" data-subject="${key}">
        <h3 class="serif">${subject.label}</h3>
        <p>${subject.blurb} · ${subject.units.length} units loaded</p>
        <div class="bar"><i style="width:${s.pct}%"></i></div>
        <div class="pct">${s.answered}/${s.total} answered · ${s.pct}% mastery</div>
      </div>
    `;
  });
  html += `</div>`;
  app.innerHTML = html;

  app.querySelectorAll(".subject-card").forEach(card => {
    card.onclick = () => { currentSubject = card.dataset.subject; render(); };
  });
}

function renderSubject(key) {
  const subject = CURRICULUM[key];
  let html = `
    <div class="subject-header" style="--card-accent:${subject.accent}">
      <h2 class="serif">${subject.label}</h2>
      <p>${subject.blurb}</p>
    </div>
  `;
  subject.units.forEach(unit => {
    let earned = 0, possible = 0;
    unit.questions.forEach(q => {
      possible += questionMax(q);
      const la = latestAttempt(q.id);
      if (la) earned += la.score;
    });
    const isOpen = openUnits.has(unit.id);
    html += `
      <div class="unit-card ${isOpen ? "open" : ""}" style="--card-accent:${subject.accent}" data-unit="${unit.id}">
        <div class="unit-head" data-toggle="${unit.id}">
          <div>
            <h3 class="serif">${unit.title}</h3>
            <div class="meta">TEKS ${unit.teks} · ${unit.days} instructional days</div>
          </div>
          <div class="stat"><b>${earned}/${possible}</b> pts <span class="chev">▸</span></div>
        </div>
        <div class="unit-body">
          ${unit.questions.map((q, i) => renderQuestion(q, i + 1, subject.accent)).join("")}
        </div>
      </div>
    `;
  });
  app.innerHTML = html;

  app.querySelectorAll("[data-toggle]").forEach(el => {
    el.onclick = () => {
      const id = el.dataset.toggle;
      if (openUnits.has(id)) openUnits.delete(id); else openUnits.add(id);
      render();
    };
  });

  wireQuestionEvents();
}

function renderQuestion(q, num, accent) {
  const rec = state[q.id] || { attempts: [] };
  const attemptsUsed = rec.attempts.length;
  const attemptsLeft = MAX_ATTEMPTS - attemptsUsed;
  const max = questionMax(q);

  let attemptsHtml = "";
  rec.attempts.forEach((a, idx) => {
    const isLast = idx === rec.attempts.length - 1;
    attemptsHtml += `
      <div class="attempt ${isLast ? "selected" : ""}">
        <div class="attempt-head">
          <div class="who"><span class="avatar-sm">${STUDENT.initials}</span> ${STUDENT.name}</div>
          <div class="attempt-tags">
            <span class="tag">Attempt ${idx + 1}</span>
            ${isLast ? `<span class="tag selected-tag">Selected</span>` : `<button class="view-toggle" data-view="${q.id}-${idx}">View</button>`}
          </div>
        </div>
        <div class="attempt-text ${isLast ? "" : "collapsed"}" id="text-${q.id}-${idx}">${escapeHtml(a.text)}</div>
        ${isLast ? renderScorePanel(a) : ""}
      </div>
    `;
  });

  const locked = attemptsLeft <= 0;

  return `
    <div class="question" style="--card-accent:${accent}">
      <div class="q-head">
        <h4 class="serif">Question ${num}</h4>
        <span class="pill">Short answer</span>
      </div>
      <p class="q-prompt">${q.prompt}</p>
      ${attemptsHtml}
      ${locked
        ? `<p class="locked-note">All ${MAX_ATTEMPTS} attempts used — nice effort. Review the feedback above.</p>`
        : `
        <textarea class="answer-box" id="input-${q.id}" placeholder="Write your short answer response..."></textarea>
        <div class="answer-row">
          <span class="attempts-left">${attemptsLeft} attempt${attemptsLeft === 1 ? "" : "s"} left</span>
          <button class="submit-btn" data-submit="${q.id}">Submit</button>
        </div>
      `}
    </div>
  `;
}

function renderScorePanel(attempt) {
  let html = `
    <div class="score-panel">
      <div class="score-line"><span>Question score</span><b>${attempt.score}/${attempt.maxScore}</b></div>
  `;
  attempt.breakdown.forEach(b => {
    if (b.met) {
      html += `<div class="crit met"><span class="mark">✓</span><span>${b.criteria} <em>(+${b.points})</em></span></div>`;
    } else {
      html += `<div class="crit missed"><span class="mark">→</span><span>${b.hint}</span></div>`;
    }
  });
  html += `</div>`;
  return html;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function wireQuestionEvents() {
  app.querySelectorAll("[data-submit]").forEach(btn => {
    btn.onclick = () => {
      const qId = btn.dataset.submit;
      const textarea = document.getElementById(`input-${qId}`);
      const text = textarea.value.trim();
      if (!text) { textarea.focus(); return; }

      const q = findQuestion(qId);
      const graded = gradeAnswer(q, text);

      if (!state[qId]) state[qId] = { attempts: [] };
      state[qId].attempts.push({
        text,
        score: graded.score,
        maxScore: graded.maxScore,
        breakdown: graded.breakdown,
        ts: Date.now()
      });
      saveState();
      render();
      // keep the unit open after re-render
      const unit = findUnitForQuestion(qId);
      if (unit) openUnits.add(unit.id);
      render();
    };
  });

  app.querySelectorAll("[data-view]").forEach(btn => {
    btn.onclick = () => {
      const target = document.getElementById(`text-${btn.dataset.view}`);
      target.classList.toggle("collapsed");
      btn.textContent = target.classList.contains("collapsed") ? "View" : "Hide";
    };
  });
}

function findQuestion(qId) {
  for (const subject of Object.values(CURRICULUM)) {
    for (const unit of subject.units) {
      const q = unit.questions.find(q => q.id === qId);
      if (q) return q;
    }
  }
  return null;
}

function findUnitForQuestion(qId) {
  for (const subject of Object.values(CURRICULUM)) {
    for (const unit of subject.units) {
      if (unit.questions.some(q => q.id === qId)) return unit;
    }
  }
  return null;
}

// ---------- Reset ----------
document.getElementById("reset-btn").onclick = () => {
  if (confirm("Clear all of Sewa's saved answers and scores on this device?")) {
    state = {};
    saveState();
    render();
  }
};

render();
