// ======= App state ========
let state = {questions:[], current:0, answers:{}, reviewMode:false};

// utility
const el = id => document.getElementById(id);

function init() {
  // deep copy the full question bank
  const allQs = QUESTIONS.map(q => JSON.parse(JSON.stringify(q)));

  // shuffle full array
  shuffle(allQs);

  // pick first 10 questions only
  state.questions = allQs.slice(0, 10);

  renderQuestionNav();
  render();
}

// ===== Reset / Restart quiz =====
function resetQuiz() {
  state.answers = {};
  state.current = 0;
  state.reviewMode = false;

  const allQs = QUESTIONS.map(q => JSON.parse(JSON.stringify(q)));
  shuffle(allQs);
  state.questions = allQs.slice(0, 10);

  renderQuestionNav();
  render();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function renderQuestionNav() {
  const qnav = el('qnav'); 
  qnav.innerHTML = '';
  state.questions.forEach((q, i) => {
    const node = document.createElement('div'); 
    node.className = 'qnav'; 
    node.textContent = i + 1;
    if (state.answers[q.id] !== undefined) node.classList.add('done');
    node.addEventListener('click', () => { state.current = i; render(); });
    qnav.appendChild(node);
  });
  el('qcount').textContent = state.questions.length;
}

function render() {
  const q = state.questions[state.current];
  el('qtitle').textContent = `Q${state.current + 1}. ${q.q}`;
  el('qdesc').textContent = `Type: ${q.type.toUpperCase()} • Category: ${q.category}`;
  el('category').textContent = q.category;
  el('qidx').textContent = state.current + 1;

  // progress bar
  const pct = Math.round(((state.current) / (state.questions.length - 1)) * 100);
  el('progbar').style.width = pct + '%';

  const qbody = el('qbody'); 
  qbody.innerHTML = '';

  if (q.type === 'single' || q.type === 'multi') {
    const choices = document.createElement('div'); 
    choices.className = 'choices';
    q.choices.forEach(c => {
      const ch = document.createElement('div'); 
      ch.className = 'choice'; 
      ch.dataset.value = c; 
      ch.tabIndex = 0; 
      ch.innerHTML = `<div>${c}</div>`;
      if (Array.isArray(state.answers[q.id]) && state.answers[q.id].includes(c)) ch.classList.add('selected');
      if (state.answers[q.id] === c) ch.classList.add('selected');
      ch.addEventListener('click', () => {
        if (q.type === 'single') state.answers[q.id] = c;
        else {
          state.answers[q.id] = state.answers[q.id] || [];
          const idx = state.answers[q.id].indexOf(c);
          if (idx > -1) state.answers[q.id].splice(idx, 1); 
          else state.answers[q.id].push(c);
        }
        renderQuestionNav(); render(); updateStats();
      });
      choices.appendChild(ch);
    });
    qbody.appendChild(choices);
  }

  else if (q.type === 'tf') {
    const choices = document.createElement('div'); choices.className = 'choices';
    ['True', 'False'].forEach(t => {
      const ch = document.createElement('div'); 
      ch.className = 'choice'; 
      ch.textContent = t; 
      if (state.answers[q.id] === (t === 'True')) ch.classList.add('selected');
      ch.addEventListener('click', () => {
        state.answers[q.id] = (t === 'True'); 
        renderQuestionNav(); render(); updateStats();
      });
      choices.appendChild(ch);
    });
    qbody.appendChild(choices);
  }

  else if (q.type === 'numeric' || q.type === 'short') {
    const wrap = document.createElement('div'); wrap.style.marginTop = '12px';
    const inp = document.createElement('input'); 
    inp.type = 'text'; 
    inp.placeholder = 'Type your answer here'; 
    inp.style.width = '100%'; 
    inp.style.padding = '10px'; 
    inp.style.borderRadius = '8px'; 
    inp.style.border = '1px solid rgba(255,255,255,0.03)'; 
    if (state.answers[q.id] !== undefined) inp.value = state.answers[q.id];
    inp.addEventListener('input', e => {
      state.answers[q.id] = e.target.value; 
      renderQuestionNav(); updateStats();
    });
    wrap.appendChild(inp);
    qbody.appendChild(wrap);
  }

  else if (q.type === 'order') {
    const list = document.createElement('ol'); 
    list.style.padding = '12px'; 
    list.style.background = 'rgba(255,255,255,0.02)'; 
    list.style.borderRadius = '8px';
    const order = state.answers[q.id] || q.choices.slice();
    order.forEach((item, idx) => {
      const li = document.createElement('li'); 
      li.style.padding = '8px'; 
      li.style.marginBottom = '6px'; 
      li.style.cursor = 'pointer'; 
      li.style.border = '1px solid rgba(255,255,255,0.03)'; 
      li.textContent = item;
      const controls = document.createElement('div'); 
      controls.style.float = 'right'; 
      controls.innerHTML = `<button title='Up' style='margin-right:6px' data-action='up'>▲</button><button title='Down' data-action='down'>▼</button>`;
      li.appendChild(controls);
      controls.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.dataset.action; 
          if (action === 'up' && idx > 0) {[order[idx-1], order[idx]] = [order[idx], order[idx-1]];}
          if (action === 'down' && idx < order.length-1) {[order[idx+1], order[idx]] = [order[idx], order[idx+1]];}
          state.answers[q.id] = order; render(); renderQuestionNav(); updateStats();
        });
      });
      list.appendChild(li);
    });
    qbody.appendChild(list);
  }

  if (state.reviewMode) {
    const expl = document.createElement('div'); 
    expl.style.marginTop = '12px'; 
    expl.innerHTML = `<div class='small'>Answer: <strong>${formatAnswer(q.answer)}</strong></div><div class='small' style='margin-top:6px'>Explanation: ${q.explain || '—'}</div>`;
    qbody.appendChild(expl);
  }

  updateStats();
}

function formatAnswer(ans) { 
  if (Array.isArray(ans)) return ans.join(', '); 
  return ans; 
}

function updateStats() {
  const answered = Object.keys(state.answers).length;
  el('answered').textContent = answered;
  el('score').textContent = calcScore().score;
  const nodes = document.querySelectorAll('.qnav'); 
  nodes.forEach((n, i) => {
    const q = state.questions[i]; 
    if (state.answers[q.id] !== undefined) n.classList.add('done'); 
    else n.classList.remove('done');
  });
}

function calcScore() {
  let score = 0; let correct = 0; let wrong = 0; 
  state.questions.forEach(q => {
    const user = state.answers[q.id];
    if (user === undefined) { wrong++; return }
    if (q.type === 'single' || q.type === 'numeric' || q.type === 'short' || q.type === 'tf' || q.type === 'order') {
      let pass = false;
      if (q.type === 'single') pass = (String(user).trim() == String(q.answer).trim());
      else if (q.type === 'numeric') pass = Math.abs(Number(user) - Number(q.answer)) < 0.001;
      else if (q.type === 'short') pass = String(user).trim().toLowerCase() === String(q.answer).trim().toLowerCase();
      else if (q.type === 'tf') pass = Boolean(user) === Boolean(q.answer);
      else if (q.type === 'order') pass = JSON.stringify(user) === JSON.stringify(q.answer);
      if (pass) { score += 1; correct++; } else { wrong++; }
    }
    else if (q.type === 'multi') {
      const correctSet = (q.answer || []).slice().sort().join('|'); 
      const userSet = (user || []).slice().sort().join('|'); 
      if (userSet === correctSet) { score += 1; correct++; } else wrong++;
    }
  });
  return {score, correct, wrong};
}

// ===== Controls =====
document.getElementById('prevBtn').addEventListener('click', () => { if (state.current > 0) state.current--; render(); });
document.getElementById('nextBtn').addEventListener('click', () => { if (state.current < state.questions.length - 1) state.current++; render(); });
document.getElementById('shuffleBtn').addEventListener('click', () => { shuffle(state.questions); state.current = 0; renderQuestionNav(); render(); });

document.getElementById('submitBtn').addEventListener('click', submitQuiz);
document.getElementById('closeRes').addEventListener('click', () => { el('resultModal').classList.remove('show'); state.reviewMode = false; render(); });
document.getElementById('reviewBtn').addEventListener('click', () => { state.reviewMode = true; render(); window.scrollTo({top:0, behavior:'smooth'}) });
document.getElementById('reviewAnswersBtn').addEventListener('click', () => { state.reviewMode = true; el('resultModal').classList.remove('show'); render(); });
document.getElementById('restartBtn').addEventListener('click', resetQuiz);

function submitQuiz() {
  const r = calcScore();
  const total = state.questions.length; 
  el('resScore').textContent = r.score; 
  el('resTotal').textContent = total; 
  el('resCorrect').textContent = r.correct; 
  el('resWrong').textContent = r.wrong; 
  el('resTitle').textContent = `You scored ${r.score} / ${total}`;
  saveHighscore({score:r.score, total, date:new Date().toLocaleString()});
  renderHighscores();
  el('resultModal').classList.add('show');
  state.reviewMode = false;
}

// ===== Highscore (localStorage) =====
function saveHighscore(entry) {
  try { 
    const raw = localStorage.getItem('apti_high') || '[]'; 
    const arr = JSON.parse(raw); 
    arr.push(entry); 
    arr.sort((a,b)=>b.score - a.score); 
    if (arr.length > 5) arr.length = 5; 
    localStorage.setItem('apti_high', JSON.stringify(arr)); 
  } catch(e) { console.warn(e); }
}

function renderHighscores() { 
  const list = el('highscores'); list.innerHTML = ''; 
  try { 
    const arr = JSON.parse(localStorage.getItem('apti_high') || '[]'); 
    if (arr.length === 0) { list.innerHTML = '<li class="small">No records yet</li>'; return } 
    arr.forEach(it => { 
      const li = document.createElement('li'); 
      li.innerHTML = `<strong>${it.score}/${it.total}</strong> — <span class='small'>${it.date}</span>`; 
      list.appendChild(li); 
    }); 
  } catch(e) { list.innerHTML = '<li class="small">No records yet</li>' }
}

// ========= small helpers =========
window.addEventListener('keydown', (e) => { 
  if (e.key === 'ArrowRight') { if (state.current < state.questions.length-1) { state.current++; render(); }} 
  if (e.key === 'ArrowLeft') { if (state.current > 0) { state.current--; render(); }} 
});

// initialise
init(); 
renderHighscores();

// Auto start proctoring
window.addEventListener('load', () => {
  fetch("/start_proctoring")
    .then(res => res.json())
    .then(data => console.log(data.status));
});
