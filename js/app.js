/* Missão Stella Maris — Estudos do Matteo
   Aplicação 100% local: todo o progresso fica no navegador (localStorage). */
(function () {
  'use strict';
  var EXAM = new Date(2026, 10, 27); // 27/11/2026
  var NOME = 'Matteo';
  var KEY = 'missao_sm_v1';
  var MAX_SIM_SEC = 120 * 60;

  /* ================= util ================= */
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function fmtDate(ts) { var d = new Date(ts); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  function fmtDur(sec) { sec = Math.round(sec); var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return h ? h + ' h ' + pad(m) + ' min' : (m ? m + ' min ' + pad(s) + ' s' : s + ' s'); }
  function clockFmt(sec) { sec = Math.max(0, Math.round(sec)); return pad(Math.floor(sec / 60)) + ':' + pad(sec % 60); }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
  function strip(h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  var SUBJ = { mat: 'Matemática', por: 'Português' };

  /* ================= armazenamento ================= */
  function fresh() { return { v: 1, created: Date.now(), answers: [], errors: [], sims: [], simUsed: [], seen: {}, sessions: [], notes: [], writings: [], lessons: {}, plan: {}, current: null }; }
  var S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (e) { S = fresh(); }
  var base = fresh(); Object.keys(base).forEach(function (k) { if (S[k] === undefined) S[k] = base[k]; });
  var saveOk = true;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); saveOk = true; } catch (e) { if (saveOk) alert('Não foi possível salvar o progresso neste navegador. Use "Exportar" na Área do responsável para guardar uma cópia.'); saveOk = false; } }

  /* ================= sessão / tempo de estudo ================= */
  var lastAct = Date.now(), sess;
  (function initSession() {
    var last = S.sessions[S.sessions.length - 1];
    if (last && Date.now() - last.end < 30 * 60 * 1000) sess = last;
    else { sess = { start: Date.now(), end: Date.now(), active: 0, answered: 0, correct: 0 }; S.sessions.push(sess); if (S.sessions.length > 300) S.sessions.shift(); }
    save();
  })();
  ['click', 'keydown', 'touchstart', 'scroll'].forEach(function (ev) { document.addEventListener(ev, function () { lastAct = Date.now(); }, { passive: true }); });
  setInterval(function () {
    if (document.visibilityState === 'visible' && Date.now() - lastAct < 120000) { sess.active += 15; sess.end = Date.now(); save(); }
  }, 15000);

  /* ================= estatísticas ================= */
  function topicAnswers(t) { return S.answers.filter(function (a) { return a.t === t && a.mode !== 'guiado'; }); }
  function openErrors(t) { return S.errors.filter(function (e) { return !e.resolved && (!t || e.t === t); }); }
  function topicStatus(t) {
    var arr = topicAnswers(t);
    if (!arr.length) return 'nao';
    var last = arr.slice(-6), good = last.filter(function (a) { return a.first && !a.guess; }).length;
    if (arr.length >= 6 && good >= 5 && !openErrors(t).length) return 'dom';
    return 'dev';
  }
  var STATUS = { nao: ['Ainda não estudado', 'st-nao'], dev: ['Em desenvolvimento', 'st-dev'], dom: ['Consolidado', 'st-dom'] };
  function topicAcc(t) { var a = topicAnswers(t); return { n: a.length, ok: a.filter(function (x) { return x.first && !x.guess; }).length }; }
  function subjStats(s) {
    var ts = TOPICS.filter(function (t) { return t.s === s; }), dom = 0, studied = 0;
    ts.forEach(function (t) { var st = topicStatus(t.id); if (st === 'dom') dom++; if (st !== 'nao') studied++; });
    var ans = S.answers.filter(function (a) { return a.s === s && a.mode !== 'guiado'; });
    return { total: ts.length, dom: dom, studied: studied, n: ans.length, ok: ans.filter(function (a) { return a.first && !a.guess; }).length };
  }
  function totalActive() { return S.sessions.reduce(function (s, x) { return s + (x.active || 0); }, 0); }

  function recommendations(n) {
    var out = [], seen = {};
    function add(t, why, act) { if (!seen[t] && TOPIC_BY_ID[t]) { seen[t] = 1; out.push({ t: t, why: why, act: act }); } }
    // 1) erros em aberto
    var cnt = {}; openErrors().forEach(function (e) { cnt[e.t] = (cnt[e.t] || 0) + 1; });
    Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; }).forEach(function (t) { add(t, cnt[t] + ' erro(s) no caderno para revisar', 'erros'); });
    // 2) lacunas do diagnóstico inicial
    ['m_frac', 'p_gram'].forEach(function (t) { if (topicStatus(t) !== 'dom') add(t, 'Lacuna apontada no diagnóstico inicial', topicStatus(t) === 'nao' ? 'aprender' : 'praticar'); });
    // 3) em desenvolvimento com menor acerto
    TOPICS.filter(function (t) { return topicStatus(t.id) === 'dev'; })
      .map(function (t) { var a = topicAcc(t.id); return { t: t.id, p: pct(a.ok, a.n) }; })
      .sort(function (a, b) { return a.p - b.p; })
      .forEach(function (x) { add(x.t, 'Acerto de ' + x.p + '% até agora', 'praticar'); });
    // 4) ainda não estudados (edital primeiro)
    TOPICS.filter(function (t) { return topicStatus(t.id) === 'nao'; })
      .sort(function (a, b) { return (a.origem === 'edital' ? 0 : 1) - (b.origem === 'edital' ? 0 : 1) || a.prioridade - b.prioridade; })
      .forEach(function (t) { add(t.id, 'Ainda não estudado', 'aprender'); });
    return out.slice(0, n || 3);
  }

  var DAYPLAN = {
    '2026-11-23': { tit: 'Segunda, 23/11', itens: [['m_frac', 'Verificar se você lembra de frações'], ['p_gram', 'Classes de palavras'], ['p_interp', 'Interpretação de texto'], ['m_seq', 'Sequências e múltiplos']] },
    '2026-11-24': { tit: 'Terça, 24/11', itens: [['m_medidas', 'Medidas'], ['m_tempo', 'Tempo'], ['m_dinheiro', 'Dinheiro'], ['p_discurso', 'Discurso direto e indireto'], ['p_drama', 'Gêneros: texto dramático'], ['p_interp', 'Leitura']] },
    '2026-11-25': { tit: 'Quarta, 25/11', itens: [['m_solidos', 'Geometria: prismas e pirâmides'], ['m_loc', 'Localização, paralelas e perpendiculares'], ['m_graf', 'Tabelas e gráficos'], ['erros-por', 'Revisar os erros de Português']] },
    '2026-11-26': { tit: 'Quinta, 26/11', itens: [['simulado', 'Simulado final de 20 questões'], ['erros', 'Revisão leve dos pontos que errou']], nota: 'Hoje é dia de revisão leve. Nada de conteúdo novo pesado — durma cedo!' },
    '2026-11-27': { tit: 'Sexta, 27/11 — DIA DA PROVA', itens: [], nota: 'Hoje é dia de descansar, tomar um bom café da manhã e chegar 30 minutos antes. Leve lápis, borracha, régua, caneta preta e documento com foto. Você se preparou, amigo! 💪' }
  };

  /* ================= escolha de questões ================= */
  function recentIds(n) { return S.answers.slice(-(n || 40)).map(function (a) { return a.qid; }); }
  function shuffledQ(q) {
    var idx = shuffle([0, 1, 2, 3]), c = clone(q);
    c.o = idx.map(function (i) { return q.o[i]; }); c.a = idx.indexOf(q.a);
    if (q.w) { c.w = {}; Object.keys(q.w).forEach(function (k) { c.w[idx.indexOf(+k)] = q.w[k]; }); }
    return c;
  }
  function pickQuestion(t, d, opt) {
    opt = opt || {};
    var excl = (opt.exclude || []).concat(recentIds(opt.recent || 40));
    var pool = BANK.filter(function (q) { return q.t === t && excl.indexOf(q.id) < 0 && (!opt.txt || q.txt === opt.txt); });
    if (opt.noTxt) pool = pool.filter(function (q) { return !q.txt; });
    var hasGen = GEN.G[t] && GEN.G[t].length && !opt.txt;
    var useGen = hasGen && (!pool.length || Math.random() < 0.55);
    if (useGen) {
      for (var i = 0; i < 12; i++) { var g = generateQuestion(t, d || 2); if (excl.indexOf(g.id) < 0) return shuffledQ(g); }
    }
    if (!pool.length) { // todos já vistos recentemente: usa os menos vistos
      pool = BANK.filter(function (q) { return q.t === t && (opt.exclude || []).indexOf(q.id) < 0 && (!opt.txt || q.txt === opt.txt); });
      if (!pool.length && hasGen) return shuffledQ(generateQuestion(t, d || 2));
      pool.sort(function (a, b) { return (S.seen[a.id] || 0) - (S.seen[b.id] || 0); });
      pool = pool.slice(0, Math.max(3, Math.ceil(pool.length / 3)));
    }
    if (d) { var same = pool.filter(function (q) { return q.d === d; }); if (same.length) pool = same; else { var near = pool.filter(function (q) { return Math.abs(q.d - d) <= 1; }); if (near.length) pool = near; } }
    return shuffledQ(pool[Math.floor(Math.random() * pool.length)]);
  }

  /* ================= registro de respostas ================= */
  function record(q, res, mode) {
    var a = { ts: Date.now(), qid: q.id, t: q.t, s: TOPIC_BY_ID[q.t].s, d: q.d, mode: mode, ok: res.ok, first: res.ok && res.attempts === 1, attempts: res.attempts, hints: res.hints, guess: false, bumped: [] };
    S.seen[q.id] = (S.seen[q.id] || 0) + 1;
    if (mode !== 'guiado') {
      if (!res.ok && mode === 'gram') {
        openErrors(q.t).forEach(function (e) { e.streak = 0; });
      } else if (!res.ok) {
        var ex = S.errors.filter(function (e) { return !e.resolved && e.qid === q.id; })[0];
        if (ex) { ex.ts = a.ts; ex.chosen = res.chosen; }
        else S.errors.push({ id: uid(), qid: q.id, q: clone(q), t: q.t, chosen: res.chosen, ts: a.ts, resolved: false, streak: 0, mode: mode });
        openErrors(q.t).forEach(function (e) { e.streak = 0; });
      } else if (a.first) {
        openErrors(q.t).forEach(function (e) {
          if (e.qid !== q.id && e.ts < a.ts) { e.streak++; a.bumped.push(e.id); if (e.streak >= 2) { e.resolved = true; e.resolvedTs = a.ts; } }
        });
      }
    }
    S.answers.push(a);
    sess.answered++; if (a.first) sess.correct++; sess.end = Date.now();
    save();
    return a;
  }
  function markGuess(a) {
    a.guess = true;
    a.bumped.forEach(function (id) { var e = S.errors.filter(function (x) { return x.id === id; })[0]; if (e) { e.streak = Math.max(0, e.streak - 1); if (e.resolved && e.resolvedTs === a.ts) { e.resolved = false; delete e.resolvedTs; } } });
    a.bumped = [];
    save();
  }

  /* ================= componente de questão (modo estudo) ================= */
  var LET = ['A', 'B', 'C', 'D'];
  var ELOGIOS = ['Isso aí, amigo! ✅', 'Mandou bem! ⚽', 'Golaço! 🎯', 'Certíssimo! ⭐', 'Muito bem, detetive! 🔎', 'Acertou em cheio! 🏆'];
  function passageHTML(id) { var p = PASSAGES[id]; return p ? '<details class="passage" open><summary>📄 ' + esc(p.genero) + ': <b>' + esc(p.titulo) + '</b></summary><div class="ptext">' + p.html + '</div></details>' : ''; }
  function qHead(q) {
    var t = TOPIC_BY_ID[q.t];
    return '<div class="qmeta"><span class="chip ' + t.s + '">' + t.icone + ' ' + esc(t.nome) + '</span><span class="chip diff">' + ['', 'Fácil', 'Médio', 'Desafio'][q.d] + '</span></div>';
  }
  /* opts: { mode, onNext(), onSimilar(), nextLabel } */
  function mountQuestion(el, q, opts) {
    var attempts = 0, hints = 0, done = false, rec = null, t0 = Date.now();
    el.innerHTML = (q.txt ? passageHTML(q.txt) : '') + qHead(q) + FIG.render(q.fig) +
      '<div class="qtext">' + q.q + '</div>' +
      '<div class="options">' + q.o.map(function (o, i) { return '<button class="opt" data-i="' + i + '"><span class="let">' + LET[i] + '</span><span>' + o + '</span></button>'; }).join('') + '</div>' +
      '<div class="hintbox"></div><div class="feedback" aria-live="polite"></div>' +
      '<div class="qactions"><button class="btn ghost hintbtn">💡 Quero uma dica</button></div>';
    var fb = $('.feedback', el), hb = $('.hintbox', el), hbtn = $('.hintbtn', el);
    hbtn.onclick = function () {
      if (hints < q.h.length) { hb.insertAdjacentHTML('beforeend', '<div class="hint">💡 ' + q.h[hints] + '</div>'); hints++; }
      if (hints >= q.h.length) hbtn.disabled = true;
    };
    $$('.opt', el).forEach(function (b) {
      b.onclick = function () {
        if (done || b.disabled) return;
        var i = +b.dataset.i; attempts++;
        if (i === q.a) { b.classList.add('right'); finish(true, i); }
        else {
          b.classList.add('wrong'); b.disabled = true;
          if (attempts === 1) {
            fb.innerHTML = '<div class="fb try">🤔 Ainda não, amigo. ' + (q.w && q.w[i] ? q.w[i] + ' ' : '') + 'Releia com calma e tente de novo!' +
              '<div class="row"><button class="btn small ghost showexp">Ver a explicação</button></div></div>';
            $('.showexp', fb).onclick = function () { attempts = Math.max(attempts, 2); finish(false, i); };
            if (hints === 0) hbtn.classList.add('pulse');
          } else finish(false, i);
        }
      };
    });
    function finish(ok, chosen) {
      done = true; hbtn.disabled = true; hbtn.classList.remove('pulse');
      $$('.opt', el).forEach(function (b) { b.disabled = true; if (+b.dataset.i === q.a) b.classList.add('right'); });
      rec = record(q, { ok: ok, attempts: attempts, hints: hints, chosen: chosen, ms: Date.now() - t0 }, opts.mode);
      var html = ok
        ? '<div class="fb ok"><b>' + ELOGIOS[Math.floor(Math.random() * ELOGIOS.length)] + '</b>' + (attempts > 1 ? ' Você corrigiu o caminho — isso é aprender!' : '') + '<div class="exp">' + q.e + '</div></div>'
        : '<div class="fb no"><b>Tudo bem errar — é assim que a gente aprende! 💙</b>' + (q.w && q.w[chosen] ? '<div class="why">' + q.w[chosen] + '</div>' : '') + '<div class="exp"><b>Resposta certa: ' + LET[q.a] + '.</b> ' + q.e + '</div></div>';
      var btns = '<div class="row">';
      if (!ok && opts.onSimilar) btns += '<button class="btn primary similar">🔁 Tentar uma parecida</button>';
      if (opts.onNext) btns += '<button class="btn ' + (ok || !opts.onSimilar ? 'primary' : '') + ' next">' + (opts.nextLabel || 'Próxima ➜') + '</button>';
      if (ok && attempts === 1 && opts.mode !== 'guiado') btns += '<button class="btn small ghost guess" title="Se você chutou, vamos conferir com outra questão">Chutei essa 🎲</button>';
      btns += '</div>';
      fb.innerHTML = html + btns;
      if ($('.next', fb)) $('.next', fb).onclick = function () { opts.onNext(rec); };
      if ($('.similar', fb)) $('.similar', fb).onclick = function () { opts.onSimilar(rec); };
      if ($('.guess', fb)) $('.guess', fb).onclick = function () {
        markGuess(rec);
        fb.insertAdjacentHTML('beforeend', '<div class="fb try">Valeu pela sinceridade! 👍 Vamos ver se você descobre numa questão parecida.</div>');
        setTimeout(function () { (opts.onSimilar || opts.onNext)(rec); }, 900);
      };
      fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if (opts.onAnswered) opts.onAnswered(rec);
    }
  }

  /* ================= roteamento ================= */
  var app = $('#app');
  var timers = [];
  function clearTimers() { timers.forEach(clearInterval); timers = []; }
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  function route() {
    clearTimers();
    var h = location.hash.replace(/^#\/?/, ''), parts = h.split('?')[0].split('/'), qs = {};
    (h.split('?')[1] || '').split('&').forEach(function (p) { if (p) { var kv = p.split('='); qs[kv[0]] = decodeURIComponent(kv[1] || ''); } });
    var v = parts[0] || 'inicio';
    $$('.nav a').forEach(function (a) { a.classList.toggle('active', a.dataset.v === v); });
    window.scrollTo(0, 0);
    var fn = { inicio: vHome, aprender: vLearn, praticar: vPractice, simulado: vSim, erros: vErrors, escrita: vWriting, responsavel: vParent }[v] || vHome;
    fn(parts.slice(1), qs);
  }
  window.addEventListener('hashchange', route);

  function topicCard(t, extra) {
    var st = STATUS[topicStatus(t.id)], a = topicAcc(t.id), o = ORIGENS[t.origem];
    return '<div class="tcard ' + t.s + '"><div class="ticon">' + t.icone + '</div><div class="tbody"><div class="tname">' + esc(t.nome) + '</div>' +
      '<div class="tdesc">' + esc(t.desc) + '</div><div class="tchips"><span class="chip ' + o.cor + '">' + o.rotulo + '</span><span class="chip ' + st[1] + '">' + st[0] + '</span>' + (a.n ? '<span class="chip">' + a.n + ' resp. • ' + pct(a.ok, a.n) + '%</span>' : '') + '</div>' +
      '<div class="row">' + (extra || ('<a class="btn small primary" href="#/aprender/' + t.id + '">📘 Aprender</a><a class="btn small" href="#/praticar?t=' + t.id + '">✏️ Praticar</a>')) + '</div></div></div>';
  }

  /* ================= INÍCIO ================= */
  function countdown() {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var diff = Math.round((EXAM - today) / 86400000);
    if (diff > 1) return '<div class="big">' + diff + '</div><div>dias para a prova<br><small>27 de novembro de 2026</small></div>';
    if (diff === 1) return '<div class="big">1</div><div>dia para a prova!<br><small>Amanhã, 27/11 — revisão leve e descanso</small></div>';
    if (diff === 0) return '<div class="big">🎒</div><div><b>A prova é hoje!</b><br><small>Boa prova, amigo! Respire fundo e leia com calma.</small></div>';
    return '<div class="big">✅</div><div>A prova já aconteceu<br><small>em 27/11/2026</small></div>';
  }
  function progressBox(s) {
    var st = subjStats(s);
    var body = st.n
      ? '<div class="pbar"><span style="width:' + pct(st.dom, st.total) + '%"></span></div><div class="pnums"><b>' + st.dom + '</b> de ' + st.total + ' assuntos consolidados • ' + st.studied + ' já praticados</div><div class="pnums">' + st.n + ' questões respondidas • ' + pct(st.ok, st.n) + '% de acerto de primeira</div>'
      : '<div class="pnums">Ainda não há respostas registradas. Que tal começar? 🚀</div>';
    return '<div class="card prog ' + s + '"><h3>' + (s === 'mat' ? '🔢 ' : '📖 ') + SUBJ[s] + '</h3>' + body + '</div>';
  }
  function currentCard() {
    var c = S.current; if (!c) return '';
    var txt, href;
    if (c.kind === 'sim') { txt = 'Simulado em andamento (' + (c.mode === 'prova' ? 'modo prova' : 'modo treino') + ') — ' + c.ans.filter(function (x) { return x !== null; }).length + '/20 respondidas'; href = '#/simulado/run'; }
    else if (c.kind === 'learn') { txt = 'Lição: ' + TOPIC_BY_ID[c.topic].nome; href = '#/aprender/' + c.topic; }
    else if (c.kind === 'practice') { txt = 'Prática' + (c.t ? ': ' + TOPIC_BY_ID[c.t].nome : ' misturada'); href = '#/praticar?' + (c.t ? 't=' + c.t : (c.s ? 's=' + c.s : '')) + (c.txt ? '&txt=' + c.txt : '') + '&resume=1'; }
    else return '';
    return '<div class="card resume"><div>⏯️ <b>Continuar de onde parou</b><br><small>' + esc(txt) + '</small></div><a class="btn primary" href="' + href + '">Continuar</a></div>';
  }
  function planItemHTML(it, k, i) {
    var done = S.plan[k] && S.plan[k][i];
    var link = it[0] === 'simulado' ? '#/simulado' : it[0] === 'erros' ? '#/erros' : it[0] === 'erros-por' ? '#/erros?s=por' : '#/aprender/' + it[0];
    return '<li class="' + (done ? 'done' : '') + '"><label><input type="checkbox" data-k="' + k + '" data-i="' + i + '"' + (done ? ' checked' : '') + '> ' + esc(it[1]) + '</label> <a href="' + link + '">ir ➜</a></li>';
  }
  function vHome() {
    var k = dayKey(), plan = DAYPLAN[k], recs = recommendations(3);
    var html = '<section class="hero"><div><h1>Olá, amigo ' + NOME + '! 👋</h1><p>Bem-vindo à sua <b>Missão Stella Maris</b>. Cada questão é um passo no mapa do tesouro! 🗺️</p></div><div class="count">' + countdown() + '</div></section>' +
      currentCard() +
      '<div class="grid2">' + progressBox('mat') + progressBox('por') + '</div>' +
      '<div class="card"><h2>🎯 O que estudar hoje</h2>' +
      (plan ? '<div class="dayplan"><h3>Plano sugerido — ' + plan.tit + '</h3>' + (plan.nota ? '<p class="note">' + plan.nota + '</p>' : '') + (plan.itens.length ? '<ul class="checklist">' + plan.itens.map(function (it, i) { return planItemHTML(it, k, i); }).join('') + '</ul>' : '') + '<small class="muted">Sugestão ajustável — não é registro de aulas concluídas.</small></div>' : '') +
      '<h3>Recomendado pelo seu histórico</h3><div class="recs">' + recs.map(function (r) {
        var t = TOPIC_BY_ID[r.t], href = r.act === 'erros' ? '#/erros/' + r.t : r.act === 'aprender' ? '#/aprender/' + r.t : '#/praticar?t=' + r.t;
        return '<a class="rec ' + t.s + '" href="' + href + '"><span class="ticon">' + t.icone + '</span><span><b>' + esc(t.nome) + '</b><small>' + esc(r.why) + '</small></span><span class="go">' + { erros: 'Revisar', aprender: 'Aprender', praticar: 'Praticar' }[r.act] + ' ➜</span></a>';
      }).join('') + '</div></div>' +
      '<div class="card"><h2>⏱️ Rotina sugerida (até 2 h)</h2><ul class="routine"><li><b>50 min</b> Matemática — explicação e exercícios</li><li><b>5 min</b> Pausa: água, alongar, olhar pela janela 🌳</li><li><b>45 min</b> Português — explicação e exercícios</li><li><b>20 min</b> Caderno de erros, leitura ou escrita breve</li></ul><small class="muted">Ajuste conforme o cansaço. Aprender bem vale mais do que ficar muito tempo na tela.</small></div>' +
      '<div class="quick"><a class="qbtn" href="#/aprender">📘<span>Aprender</span></a><a class="qbtn" href="#/praticar">✏️<span>Praticar</span></a><a class="qbtn" href="#/simulado">📝<span>Simulado</span></a><a class="qbtn" href="#/erros">🔁<span>Caderno de erros</span></a></div>';
    app.innerHTML = html;
    $$('.checklist input').forEach(function (cb) { cb.onchange = function () { var kk = cb.dataset.k; S.plan[kk] = S.plan[kk] || {}; S.plan[kk][cb.dataset.i] = cb.checked; save(); cb.closest('li').classList.toggle('done', cb.checked); }; });
  }

  /* ================= APRENDER ================= */
  function vLearn(parts) {
    if (!parts[0] || !TOPIC_BY_ID[parts[0]]) {
      app.innerHTML = '<h1>📘 Aprender</h1><p>Escolha um assunto. Cada lição tem explicação, exemplo resolvido, exercício guiado e exercícios para você fazer sozinho.</p>' +
        '<div class="legendbox"><span class="chip edital">Edital (5º ano)</span> tópicos enfatizados no regulamento • <span class="chip anteriores">Anos anteriores</span> listados para séries anteriores • <span class="chip complementar">Revisão complementar</span> apoio identificado nos estudos</div>' +
        ['mat', 'por'].map(function (s) { return '<h2 class="subj ' + s + '">' + SUBJ[s] + '</h2><div class="tgrid">' + TOPICS.filter(function (t) { return t.s === s; }).sort(function (a, b) { return a.prioridade - b.prioridade; }).map(function (t) { return topicCard(t); }).join('') + '</div>'; }).join('');
      return;
    }
    var t = TOPIC_BY_ID[parts[0]], L = t.licao;
    var st = (S.current && S.current.kind === 'learn' && S.current.topic === t.id) ? S.current : { kind: 'learn', topic: t.id, step: 'cards', i: 0, ok: 0, n: 0 };
    var EX_D = [1, 2, 2, 3];
    function setStep(step, i) { st.step = step; st.i = i || 0; S.current = st; save(); draw(); }
    function steps() {
      var order = ['cards', 'exemplo', 'guiado', 'ex', 'resumo'], names = ['Explicação', 'Exemplo', 'Guiado', 'Sozinho', 'Resumo'], cur = order.indexOf(st.step);
      return '<ol class="steps">' + names.map(function (n, i) { return '<li class="' + (i < cur ? 'done' : i === cur ? 'cur' : '') + '">' + n + '</li>'; }).join('') + '</ol>';
    }
    function draw() {
      var head = '<div class="lhead"><a href="#/aprender" class="back">← Assuntos</a><h1>' + t.icone + ' ' + esc(t.nome) + '</h1><span class="chip ' + ORIGENS[t.origem].cor + '">' + ORIGENS[t.origem].rotulo + '</span></div>' + steps();
      var body = '';
      if (st.step === 'cards') {
        var c = L.cards[st.i];
        body = '<div class="card lesson"><div class="cnum">' + (st.i + 1) + ' / ' + L.cards.length + '</div><h2>' + esc(c.t) + '</h2><div class="ltext">' + c.h + '</div>' + FIG.render(c.fig) + '</div>' +
          '<div class="row nav2">' + (st.i ? '<button class="btn prev">← Voltar</button>' : '') + '<button class="btn primary nxt">' + (st.i < L.cards.length - 1 ? 'Próximo ➜' : 'Ver um exemplo ➜') + '</button></div>';
      } else if (st.step === 'exemplo') {
        body = '<div class="card lesson"><h2>🧩 Exemplo resolvido</h2>' + FIG.render(L.exemplo.fig) + '<div class="qtext">' + L.exemplo.q + '</div><ol class="passos">' + L.exemplo.passos.map(function (p, i) { return '<li class="' + (i < (st.i || 1) ? '' : 'hidden') + '">' + p + '</li>'; }).join('') + '</ol>' +
          ((st.i || 1) < L.exemplo.passos.length ? '<button class="btn mais">Mostrar próximo passo 👣</button>' : '') + '</div>' +
          '<div class="row nav2"><button class="btn prev">← Explicação</button><button class="btn primary nxt">Agora com ajuda ➜</button></div>';
      } else if (st.step === 'guiado') {
        body = '<div class="card"><h2>🤝 Exercício guiado</h2><p class="muted">Use as dicas se precisar — elas vão aparecendo uma de cada vez.</p><div class="qwrap"></div></div>';
      } else if (st.step === 'ex') {
        body = '<div class="card"><h2>🚀 Agora é com você (' + (st.i + 1) + '/4)</h2><p class="muted">A dificuldade vai aumentando.</p><div class="qwrap"></div></div>';
      } else {
        S.lessons[t.id] = S.lessons[t.id] || []; if (!st.saved) { S.lessons[t.id].push(Date.now()); st.saved = true; }
        S.current = null; save();
        body = '<div class="card lesson resumo"><h2>🌟 O que aprendi hoje</h2><ul>' + L.resumo.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>' +
          '<p class="score">Exercícios sozinho: <b>' + st.ok + ' de ' + st.n + '</b> certos de primeira.</p>' +
          '<p class="muted">' + (st.ok >= 3 ? 'Muito bem! Para o assunto ficar <b>consolidado</b>, continue acertando no modo Praticar e no simulado.' : 'Sem problema! Revise a explicação e pratique mais um pouco — cada tentativa conta.') + '</p></div>' +
          '<div class="row nav2"><button class="btn restart">↺ Rever a lição</button><a class="btn primary" href="#/praticar?t=' + t.id + '">Praticar mais ✏️</a><a class="btn" href="#/aprender">Outro assunto</a></div>';
      }
      app.innerHTML = head + body;
      var b;
      if ((b = $('.prev'))) b.onclick = function () { if (st.step === 'cards') setStep('cards', st.i - 1); else setStep('cards', L.cards.length - 1); };
      if ((b = $('.nxt'))) b.onclick = function () { if (st.step === 'cards' && st.i < L.cards.length - 1) setStep('cards', st.i + 1); else if (st.step === 'cards') setStep('exemplo', 1); else setStep('guiado'); };
      if ((b = $('.mais'))) b.onclick = function () { st.i = (st.i || 1) + 1; draw(); };
      if ((b = $('.restart'))) b.onclick = function () { st = { kind: 'learn', topic: t.id, step: 'cards', i: 0, ok: 0, n: 0 }; setStep('cards', 0); };
      if (st.step === 'guiado') {
        var g = shuffledQ(Object.assign({ id: 'guiado:' + t.id, t: t.id, d: 1 }, L.guiado));
        mountQuestion($('.qwrap'), g, { mode: 'guiado', nextLabel: 'Fazer sozinho ➜', onNext: function () { st.ok = 0; st.n = 0; setStep('ex', 0); } });
      }
      if (st.step === 'ex') {
        var q = st.q || pickQuestion(t.id, EX_D[st.i], { exclude: st.used || [], noTxt: false });
        st.q = q; S.current = st; save();
        mountQuestion($('.qwrap'), q, {
          mode: 'aprender', nextLabel: st.i < 3 ? 'Próxima ➜' : 'Ver o resumo ➜',
          onAnswered: function (r) { st.n++; if (r.first) st.ok++; st.used = (st.used || []).concat(q.id); },
          onNext: function () { st.q = null; if (st.i < 3) setStep('ex', st.i + 1); else setStep('resumo'); },
          onSimilar: function () { st.q = pickQuestion(t.id, EX_D[st.i], { exclude: st.used }); S.current = st; save(); draw(); }
        });
      }
    }
    S.current = st; save();
    draw();
  }

  /* ================= PRATICAR ================= */
  var P = null;
  function vPractice(parts, qs) {
    var resume = qs.resume && S.current && S.current.kind === 'practice';
    if (resume) P = S.current;
    else P = { kind: 'practice', s: qs.s || '', t: qs.t || '', d: qs.d ? +qs.d : 0, txt: qs.txt || '', level: 1, streak: 0, n: 0, ok: 0, q: null, used: [] };
    if (P.t && TOPIC_BY_ID[P.t]) P.s = TOPIC_BY_ID[P.t].s;
    function topicOptions() { return '<option value="">Todos os assuntos</option>' + TOPICS.filter(function (t) { return !P.s || t.s === P.s; }).map(function (t) { return '<option value="' + t.id + '"' + (P.t === t.id ? ' selected' : '') + '>' + t.icone + ' ' + esc(t.nome) + '</option>'; }).join(''); }
    app.innerHTML = '<h1>✏️ Praticar</h1>' +
      '<div class="filters card"><label>Disciplina<select id="fs"><option value="">Todas</option><option value="mat"' + (P.s === 'mat' ? ' selected' : '') + '>Matemática</option><option value="por"' + (P.s === 'por' ? ' selected' : '') + '>Português</option></select></label>' +
      '<label>Assunto<select id="ft">' + topicOptions() + '</select></label>' +
      '<label>Dificuldade<select id="fd"><option value="0">Automática (se adapta a você)</option><option value="1"' + (P.d === 1 ? ' selected' : '') + '>Fácil</option><option value="2"' + (P.d === 2 ? ' selected' : '') + '>Médio</option><option value="3"' + (P.d === 3 ? ' selected' : '') + '>Desafio</option></select></label></div>' +
      (P.txt ? '<div class="card note">📄 Praticando com o texto <b>' + esc(PASSAGES[P.txt].titulo) + '</b> <a href="#/praticar">(sair do texto)</a></div>' : '') +
      '<div class="pstat"></div><div class="card qcard"><div class="qwrap"></div></div><div class="row"><a class="btn ghost" href="#/inicio" id="stopp">Encerrar prática</a></div>';
    $('#fs').onchange = function () { P.s = this.value; P.t = ''; P.txt = ''; $('#ft').innerHTML = topicOptions(); P.q = null; next(); };
    $('#ft').onchange = function () { P.t = this.value; P.txt = ''; P.q = null; next(); };
    $('#fd').onchange = function () { P.d = +this.value; P.q = null; next(); };
    $('#stopp').onclick = function () { S.current = null; save(); };
    function chooseTopic() {
      if (P.t) return P.t;
      var cands = TOPICS.filter(function (t) { return !P.s || t.s === P.s; });
      var w = cands.map(function (t) { var st = topicStatus(t.id); return 1 + (openErrors(t.id).length ? 2 : 0) + (st === 'dom' ? 0 : 1) + (t.prioridade <= 2 ? 1 : 0); });
      var tot = w.reduce(function (a, b) { return a + b; }, 0), r = Math.random() * tot;
      for (var i = 0; i < cands.length; i++) { r -= w[i]; if (r <= 0) return cands[i].id; }
      return cands[0].id;
    }
    function stat() { $('.pstat').innerHTML = P.n ? '<span>Nesta prática: <b>' + P.ok + '</b> de ' + P.n + ' de primeira</span><span>Nível: ' + ['', '🟢 fácil', '🟡 médio', '🔴 desafio'][P.d || P.level] + '</span>' : ''; }
    function next(similarOf) {
      if (!P.q) {
        var t = similarOf ? similarOf.t : (P.txt ? null : chooseTopic());
        if (P.txt) {
          var rest = BANK.filter(function (q) { return q.txt === P.txt && P.used.indexOf(q.id) < 0; });
          if (!rest.length) { $('.qwrap').innerHTML = '<div class="fb ok">🎉 Você terminou todas as questões deste texto! <a class="btn small" href="#/escrita">Escolher outro texto</a></div>'; S.current = null; save(); stat(); return; }
          P.q = shuffledQ(rest[0]);
        } else P.q = pickQuestion(t, P.d || P.level, { exclude: P.used.concat(similarOf ? [similarOf.qid] : []) });
      }
      S.current = P; save(); stat();
      var q = P.q;
      mountQuestion($('.qwrap'), q, {
        mode: 'praticar',
        onAnswered: function (r) {
          P.n++; P.used.push(q.id); if (r.first) { P.ok++; P.streak++; if (P.streak >= 2 && P.level < 3) { P.level++; P.streak = 0; } } else { P.streak = 0; if (P.level > 1) P.level--; }
          stat();
        },
        onNext: function () { P.q = null; next(); },
        onSimilar: function (r) { P.q = null; if (P.txt) { next(); return; } next(r); }
      });
    }
    next();
  }

  /* ================= SIMULADO ================= */
  var SIM_MAT = ['m_num', 'm_ops', 'm_ops', 'm_frac', 'm_seq', 'm_loc', 'm_solidos', 'm_graf'];
  function buildSim() {
    var used = S.simUsed.slice(), qs = [];
    function take(t, d, opt) { var q = pickQuestion(t, d, Object.assign({ exclude: used.concat(qs.map(function (x) { return x.id; })), recent: 0 }, opt || {})); qs.push(q); }
    // Português: um texto com 3 questões + 7 avulsas
    var txts = Object.keys(PASSAGES), usedTxt = {};
    S.sims.forEach(function (s) { (s.txts || []).forEach(function (x) { usedTxt[x] = (usedTxt[x] || 0) + 1; }); });
    txts.sort(function (a, b) { return (usedTxt[a] || 0) - (usedTxt[b] || 0) || Math.random() - .5; });
    var main = txts[0], tx2 = txts[1];
    var mq = shuffle(BANK.filter(function (q) { return q.txt === main; })).slice(0, 3);
    var q2 = shuffle(BANK.filter(function (q) { return q.txt === tx2; })).slice(0, 2);
    mq.concat(q2).forEach(function (q) { qs.push(shuffledQ(q)); });
    var porT = ['p_gram', 'p_discurso', 'p_contexto', 'p_producao', 'p_drama'];
    porT.forEach(function (t, i) { take(t, [1, 2, 3, 2, 2][i], { noTxt: true }); });
    // completa até 10 de Português
    var extra = shuffle(['p_pont', 'p_silabas', 'p_imagem', 'p_interp', 'p_gram']);
    var k = 0; while (qs.length < 10) take(extra[k++ % extra.length], 2, { noTxt: true });
    // Matemática
    var md = shuffle([1, 1, 2, 2, 2, 2, 3, 3, 3, 2]);
    SIM_MAT.forEach(function (t, i) { take(t, md[i]); });
    shuffle(['m_medidas', 'm_tempo', 'm_dinheiro']).slice(0, 2).forEach(function (t, i) { take(t, md[8 + i]); });
    // ordena: Português (texto principal primeiro), depois Matemática
    var por = qs.slice(0, 10), mat = qs.slice(10);
    return { qs: por.concat(shuffle(mat)), txts: [main, tx2] };
  }
  function simElapsed(c) { return c.mode === 'prova' ? (Date.now() - c.startedAt) / 1000 : c.elapsed + (c.running ? (Date.now() - c.resumedAt) / 1000 : 0); }
  function vSim(parts) {
    if (parts[0] === 'r') return vSimResult(parts[1]);
    if (parts[0] === 'run' && S.current && S.current.kind === 'sim') return vSimRun();
    var hist = S.sims.slice().reverse();
    app.innerHTML = '<h1>📝 Simulado</h1>' +
      (S.current && S.current.kind === 'sim' ? '<div class="card resume"><div>⏯️ Há um simulado em andamento.</div><a class="btn primary" href="#/simulado/run">Continuar</a></div>' : '') +
      '<div class="card"><h2>Como na prova de verdade</h2><ul><li><b>20 questões</b>: 10 de Português e 10 de Matemática.</li><li>Múltipla escolha com 4 alternativas e <b>uma</b> correta.</li><li>Até <b>2 horas</b> (120 minutos).</li><li>As respostas só aparecem no final, com gabarito comentado.</li><li>Na prova real não pode calculadora: use papel e lápis para as contas! ✏️</li></ul>' +
      '<div class="modes"><button class="mode-btn" data-m="treino"><b>🏋️ Modo treino</b><small>Pode pausar o cronômetro.</small></button><button class="mode-btn" data-m="prova"><b>🎓 Modo prova</b><small>Cronômetro corre sem pausa (até se sair da página), como no dia.</small></button></div></div>' +
      (hist.length ? '<div class="card"><h2>Simulados anteriores</h2><table class="datatab"><thead><tr><th>Data</th><th>Modo</th><th>Nota</th><th>Port.</th><th>Mat.</th><th>Tempo</th><th></th></tr></thead><tbody>' + hist.map(function (s) { return '<tr><td>' + fmtDate(s.ts) + '</td><td>' + s.mode + '</td><td><b>' + s.score + '/20</b></td><td>' + s.por + '/10</td><td>' + s.mat + '/10</td><td>' + fmtDur(s.sec) + '</td><td><a href="#/simulado/r/' + s.id + '">ver</a></td></tr>'; }).join('') + '</tbody></table></div>' : '');
    $$('.mode-btn').forEach(function (b) {
      b.onclick = function () {
        if (S.current && S.current.kind === 'sim' && !confirm('Já existe um simulado em andamento. Começar um novo e descartar o atual?')) return;
        var built = buildSim();
        S.current = { kind: 'sim', id: uid(), mode: b.dataset.m, qs: built.qs, txts: built.txts, ans: built.qs.map(function () { return null; }), idx: 0, startedAt: Date.now(), elapsed: 0, running: true, resumedAt: Date.now() };
        save(); go('#/simulado/run');
      };
    });
  }
  function vSimRun() {
    var c = S.current, saveTick = 0;
    if (c.mode === 'treino' && c.running) { c.resumedAt = Date.now(); } // tempo fora da página não conta no treino
    function draw() {
      var q = c.qs[c.idx], subj = c.idx < 10 ? 'Português' : 'Matemática';
      var answered = c.ans.filter(function (x) { return x !== null; }).length;
      app.innerHTML = '<div class="simbar"><div class="timer" id="timer"></div>' + (c.mode === 'treino' ? '<button class="btn small" id="pause">' + (c.running ? '⏸️ Pausar' : '▶️ Continuar') + '</button>' : '<span class="chip">🎓 Modo prova</span>') + '<span class="muted">' + answered + '/20 respondidas</span><button class="btn small primary" id="fin">Finalizar</button></div>' +
        '<div class="qnav">' + c.qs.map(function (x, i) { return '<button class="qn ' + (i === c.idx ? 'cur ' : '') + (c.ans[i] !== null ? 'ans ' : '') + (i < 10 ? 'por' : 'mat') + '" data-i="' + i + '">' + (i + 1) + '</button>'; }).join('') + '</div>' +
        (c.running || c.mode === 'prova' ? '<div class="card qcard"><div class="qmeta"><span class="chip ' + (c.idx < 10 ? 'por' : 'mat') + '">Questão ' + (c.idx + 1) + ' • ' + subj + '</span></div>' + (q.txt ? passageHTML(q.txt) : '') + FIG.render(q.fig) + '<div class="qtext">' + q.q + '</div><div class="options">' +
          q.o.map(function (o, i) { return '<button class="opt ' + (c.ans[c.idx] === i ? 'sel' : '') + '" data-i="' + i + '"><span class="let">' + LET[i] + '</span><span>' + o + '</span></button>'; }).join('') + '</div></div>' +
          '<div class="row nav2">' + (c.idx ? '<button class="btn" id="pv">← Anterior</button>' : '') + (c.idx < 19 ? '<button class="btn primary" id="nx">Próxima ➜</button>' : '<button class="btn primary" id="fin2">Finalizar simulado</button>') + '</div>'
          : '<div class="card paused"><h2>⏸️ Simulado pausado</h2><p>As questões ficam escondidas durante a pausa. Respire, beba água e volte quando quiser.</p></div>');
      $$('.qn').forEach(function (b) { b.onclick = function () { c.idx = +b.dataset.i; save(); draw(); }; });
      $$('.opt').forEach(function (b) { b.onclick = function () { c.ans[c.idx] = +b.dataset.i; save(); $$('.opt').forEach(function (x) { x.classList.toggle('sel', x === b); }); $$('.qn')[c.idx].classList.add('ans'); }; });
      var e;
      if ((e = $('#pv'))) e.onclick = function () { c.idx--; save(); draw(); };
      if ((e = $('#nx'))) e.onclick = function () { c.idx++; save(); draw(); };
      if ((e = $('#pause'))) e.onclick = function () { if (c.running) { c.elapsed += (Date.now() - c.resumedAt) / 1000; c.running = false; } else { c.running = true; c.resumedAt = Date.now(); } save(); draw(); };
      [$('#fin'), $('#fin2')].forEach(function (b) { if (b) b.onclick = function () { var falt = c.ans.filter(function (x) { return x === null; }).length; if (!confirm(falt ? 'Ainda há ' + falt + ' questão(ões) sem resposta. Finalizar mesmo assim?' : 'Finalizar e ver o resultado?')) return; finishSim(); }; });
      tick();
    }
    function tick() {
      var el = $('#timer'); if (!el) return;
      if (c.mode === 'treino' && c.running) { var nw = Date.now(); c.elapsed += (nw - c.resumedAt) / 1000; c.resumedAt = nw; if (++saveTick % 5 === 0) save(); }
      var left = MAX_SIM_SEC - simElapsed(c);
      el.textContent = '⏳ ' + clockFmt(left);
      el.classList.toggle('warn', left < 600);
      if (left <= 0) { alert('O tempo de 2 horas acabou! Vamos ver o resultado.'); finishSim(); }
    }
    timers.push(setInterval(tick, 1000));
    draw();
  }
  function finishSim() {
    clearTimers();
    var c = S.current; if (!c || c.kind !== 'sim') return;
    if (c.mode === 'treino' && c.running) { c.elapsed += (Date.now() - c.resumedAt) / 1000; c.running = false; }
    var sec = Math.min(MAX_SIM_SEC, c.mode === 'prova' ? (Date.now() - c.startedAt) / 1000 : c.elapsed);
    var por = 0, mat = 0;
    c.qs.forEach(function (q, i) {
      var ok = c.ans[i] === q.a; if (ok) { if (i < 10) por++; else mat++; }
      record(q, { ok: ok, attempts: 1, hints: 0, chosen: c.ans[i] }, 'simulado');
    });
    var r = { id: c.id, ts: Date.now(), mode: c.mode, sec: sec, score: por + mat, por: por, mat: mat, qs: c.qs, ans: c.ans, txts: c.txts };
    S.sims.push(r);
    c.qs.forEach(function (q) { if (!q.gen) S.simUsed.push(q.id); });
    if (S.simUsed.length > 120) S.simUsed = S.simUsed.slice(-120);
    S.current = null; save();
    go('#/simulado/r/' + r.id);
  }
  function vSimResult(id) {
    var r = S.sims.filter(function (s) { return s.id === id; })[0];
    if (!r) { go('#/simulado'); return; }
    var wrongT = {};
    r.qs.forEach(function (q, i) { if (r.ans[i] !== q.a) wrongT[q.t] = (wrongT[q.t] || 0) + 1; });
    var msg = r.score >= 17 ? 'Resultado excelente! 🏆' : r.score >= 13 ? 'Muito bom! Continue assim! ⭐' : r.score >= 9 ? 'Bom caminho! Os erros mostram o que revisar. 💪' : 'Cada simulado é um treino. Vamos revisar juntos! 💙';
    app.innerHTML = '<h1>📝 Resultado do simulado</h1><div class="card result"><div class="bigscore">' + r.score + '<small>/20</small></div><div><p class="msg">' + msg + '</p>' +
      '<p>📖 Português: <b>' + r.por + '/10</b> &nbsp; 🔢 Matemática: <b>' + r.mat + '/10</b></p><p>⏱️ Tempo usado: <b>' + fmtDur(r.sec) + '</b> (' + r.mode + ')</p>' +
      '<p class="muted">Lembrete: na prova, Matemática é o 1º critério de desempate.</p></div></div>' +
      (Object.keys(wrongT).length ? '<div class="card"><h2>🔁 Temas para revisar</h2><div class="recs">' + Object.keys(wrongT).sort(function (a, b) { return wrongT[b] - wrongT[a]; }).map(function (t) { var T = TOPIC_BY_ID[t]; return '<a class="rec ' + T.s + '" href="#/erros/' + t + '"><span class="ticon">' + T.icone + '</span><span><b>' + esc(T.nome) + '</b><small>' + wrongT[t] + ' erro(s)</small></span><span class="go">Revisar ➜</span></a>'; }).join('') + '</div></div>' : '') +
      '<div class="card"><h2>📋 Gabarito comentado</h2>' + r.qs.map(function (q, i) {
        var ok = r.ans[i] === q.a, ch = r.ans[i];
        return '<details class="gab ' + (ok ? 'ok' : 'no') + '"><summary><b>' + (i + 1) + '.</b> ' + (ok ? '✅' : (ch === null ? '⬜' : '❌')) + ' ' + esc(TOPIC_BY_ID[q.t].nome) + '</summary>' + (q.txt ? '<p class="muted">Texto: ' + esc(PASSAGES[q.txt].titulo) + '</p>' : '') + FIG.render(q.fig) + '<div class="qtext">' + q.q + '</div>' +
          '<ul class="gabopts">' + q.o.map(function (o, j) { return '<li class="' + (j === q.a ? 'right' : (j === ch ? 'wrong' : '')) + '"><b>' + LET[j] + ')</b> ' + o + (j === ch ? ' <em>(sua resposta)</em>' : '') + '</li>'; }).join('') + '</ul>' +
          (ch === null ? '<p><em>Sem resposta.</em></p>' : '') + (!ok && q.w && q.w[ch] ? '<p class="why">' + q.w[ch] + '</p>' : '') + '<div class="exp">' + q.e + '</div></details>';
      }).join('') + '</div>' +
      '<div class="row"><a class="btn primary" href="#/simulado">Fazer outro simulado (questões diferentes)</a><a class="btn" href="#/erros">Caderno de erros</a></div>';
  }

  /* ================= CADERNO DE ERROS ================= */
  function vErrors(parts, qs) {
    var t = parts[0];
    if (t && TOPIC_BY_ID[t]) return vErrorReview(t);
    var open = openErrors(), byT = {};
    open.forEach(function (e) { (byT[e.t] = byT[e.t] || []).push(e); });
    var resolved = S.errors.filter(function (e) { return e.resolved; });
    var keys = Object.keys(byT).filter(function (k) { return !qs.s || TOPIC_BY_ID[k].s === qs.s; });
    app.innerHTML = '<h1>🔁 Caderno de erros</h1><p>Aqui ficam as questões que você errou. Um assunto sai daqui quando você <b>acerta 2 questões novas seguidas</b> dele, de primeira — ler a explicação ajuda, mas o que conta é acertar de novo!</p>' +
      (qs.s ? '<p><a href="#/erros">Ver todas as disciplinas</a></p>' : '') +
      (keys.length ? '<div class="tgrid">' + keys.map(function (k) { var T = TOPIC_BY_ID[k], list = byT[k], mx = Math.max.apply(null, list.map(function (e) { return e.streak; })); return topicCard(T, '<a class="btn small primary" href="#/erros/' + k + '">Revisar ' + list.length + ' erro(s)</a><span class="muted"> Progresso: ' + mx + '/2 acertos seguidos</span>'); }).join('') + '</div>'
        : '<div class="card empty">🎉 Nenhum erro em aberto' + (qs.s ? ' nesta disciplina' : '') + '! ' + (S.answers.length ? 'Continue praticando para manter assim.' : 'Quando você errar uma questão, ela aparece aqui para revisar.') + '</div>') +
      (resolved.length ? '<div class="card"><h2>✅ Já consolidados (' + resolved.length + ')</h2><ul class="reslist">' + resolved.slice(-30).reverse().map(function (e) { return '<li>' + TOPIC_BY_ID[e.t].icone + ' ' + esc(TOPIC_BY_ID[e.t].nome) + ' — ' + esc(strip(e.q.q).slice(0, 70)) + '… <small class="muted">(resolvido em ' + fmtDate(e.resolvedTs) + ')</small></li>'; }).join('') + '</ul></div>' : '');
  }
  function vErrorReview(t) {
    var T = TOPIC_BY_ID[t];
    var list = openErrors(t);
    if (!list.length) { app.innerHTML = '<h1>' + T.icone + ' ' + esc(T.nome) + '</h1><div class="card empty">🎉 Este assunto não tem erros em aberto!</div><div class="row"><a class="btn" href="#/erros">← Caderno</a><a class="btn primary" href="#/praticar?t=' + t + '">Praticar</a></div>'; return; }
    var e = list[0], q = e.q;
    app.innerHTML = '<div class="lhead"><a class="back" href="#/erros">← Caderno</a><h1>' + T.icone + ' Revisar: ' + esc(T.nome) + '</h1></div>' +
      '<div class="card"><h2>Relembrando a questão</h2>' + (q.txt ? passageHTML(q.txt) : '') + FIG.render(q.fig) + '<div class="qtext">' + q.q + '</div>' +
      '<ul class="gabopts">' + q.o.map(function (o, j) { return '<li class="' + (j === q.a ? 'right' : (j === e.chosen ? 'wrong' : '')) + '"><b>' + LET[j] + ')</b> ' + o + (j === e.chosen ? ' <em>(você marcou)</em>' : '') + '</li>'; }).join('') + '</ul>' +
      (e.chosen !== null && e.chosen !== undefined && q.w && q.w[e.chosen] ? '<p class="why">' + q.w[e.chosen] + '</p>' : '') +
      '<div class="exp">' + q.e + '</div>' + (q.h && q.h.length ? '<div class="hint">💡 Dica para a próxima: ' + q.h[0] + '</div>' : '') + '</div>' +
      '<div class="card"><h2>Agora tente questões novas do mesmo tema</h2><p class="muted">Acertos seguidos de primeira: <b id="stk">' + e.streak + '</b>/2</p><div class="qwrap"></div></div>' +
      '<div class="row"><a class="btn" href="#/aprender/' + t + '">📘 Rever a lição</a></div>';
    var used = [e.qid];
    function next() {
      var q2 = pickQuestion(t, Math.min(3, Math.max(1, q.d)), { exclude: used.concat(list.map(function (x) { return x.qid; })) });
      used.push(q2.id);
      mountQuestion($('.qwrap'), q2, {
        mode: 'erros',
        onAnswered: function () { var fresh2 = S.errors.filter(function (x) { return x.id === e.id; })[0]; $('#stk').textContent = fresh2.resolved ? 2 : fresh2.streak; if (fresh2.resolved) $('.qwrap').insertAdjacentHTML('beforeend', '<div class="fb ok">🏅 Erro consolidado! Você acertou de novo, sem ajuda da resposta.</div>'); },
        onNext: function () { var fresh2 = S.errors.filter(function (x) { return x.id === e.id; })[0]; if (fresh2.resolved) vErrorReview(t); else next(); },
        onSimilar: function () { next(); }
      });
    }
    next();
  }

  /* ================= ESCRITA E PORTUGUÊS ================= */
  var PROMPTS = [
    ['🗺️ O mapa misterioso', 'Você encontrou um mapa antigo dentro de um livro da biblioteca. Para onde ele leva? Quem vai com você? O que vocês encontram?'],
    ['⚽ A final do campeonato', 'Faltam 2 minutos para acabar a final e o placar está empatado. Conte o que acontece até o apito final!'],
    ['🔍 O lanche sumido', 'O lanche de toda a turma desapareceu antes do recreio. Seja o detetive: quais pistas você encontra? Quem (ou o quê) pegou os lanches?'],
    ['🐉 A criatura da floresta', 'Num acampamento, você ouve um barulho estranho e encontra uma criatura que ninguém conhece. Como ela é? O que acontece?'],
    ['🚀 A caixa que virou nave', 'Uma caixa de papelão no seu quarto vira uma nave espacial de verdade. Para onde você viaja?'],
    ['🎭 Cena de teatro', 'Escreva uma cena com 2 personagens. Coloque o NOME antes de cada fala e pelo menos uma rubrica entre parênteses, como (rindo).']
  ];
  var GRAM = [
    [['O', 'art'], ['pirata', 'sub'], ['esperto', 'adj'], ['escondeu', 'verb'], ['um', 'art'], ['tesouro', 'sub'], ['brilhante', 'adj']],
    [['Ela', 'pron'], ['encontrou', 'verb'], ['uma', 'art'], ['chave', 'sub'], ['dourada', 'adj']],
    [['Nós', 'pron'], ['vencemos', 'verb'], ['o', 'art'], ['jogo', 'sub'], ['difícil', 'adj']],
    [['A', 'art'], ['menina', 'sub'], ['corajosa', 'adj'], ['abriu', 'verb'], ['a', 'art'], ['porta', 'sub'], ['velha', 'adj']],
    [['Meu', 'pron'], ['cachorro', 'sub'], ['peludo', 'adj'], ['comeu', 'verb'], ['a', 'art'], ['ração', 'sub']],
    [['Os', 'art'], ['meninos', 'sub'], ['alegres', 'adj'], ['chutaram', 'verb'], ['a', 'art'], ['bola', 'sub'], ['nova', 'adj']],
    [['Ele', 'pron'], ['ganhou', 'verb'], ['uma', 'art'], ['figurinha', 'sub'], ['rara', 'adj']],
    [['O', 'art'], ['dragão', 'sub'], ['vermelho', 'adj'], ['voou', 'verb'], ['sobre', 'x'], ['a', 'art'], ['vila', 'sub']],
    [['Minha', 'pron'], ['irmã', 'sub'], ['leu', 'verb'], ['um', 'art'], ['livro', 'sub'], ['divertido', 'adj']],
    [['A', 'art'], ['chuva', 'sub'], ['forte', 'adj'], ['molhou', 'verb'], ['o', 'art'], ['quintal', 'sub']],
    [['Eles', 'pron'], ['construíram', 'verb'], ['um', 'art'], ['castelo', 'sub'], ['enorme', 'adj']],
    [['Aquele', 'pron'], ['goleiro', 'sub'], ['alto', 'adj'], ['defendeu', 'verb'], ['o', 'art'], ['pênalti', 'sub']]
  ];
  var GRAM_ASK = { art: 'ARTIGOS', sub: 'SUBSTANTIVOS', adj: 'ADJETIVOS', pron: 'PRONOMES', verb: 'VERBOS' };

  function analyzeText(txt) {
    var good = [], tips = [];
    var clean = txt.trim(); if (!clean) return null;
    var words = clean.split(/\s+/).filter(Boolean), nw = words.length;
    var paras = clean.split(/\n\s*\n|\n/).filter(function (p) { return p.trim(); });
    var sentences = (clean.match(/[^.!?…]+[.!?…]*/g) || []).filter(function (s) { return s.trim(); });
    var low = ' ' + clean.toLowerCase().replace(/[.,!?;:…"“”—–\-()]/g, ' ') + ' ';
    if (nw >= 60) good.push('Seu texto tem ' + nw + ' palavras — bom tamanho para uma história!');
    else if (nw < 30) tips.push('Seu texto tem ' + nw + ' palavras. Tente contar mais: o que aconteceu depois? Como terminou?');
    // maiúsculas
    var semMai = sentences.filter(function (s) { var c = s.trim().replace(/^[—–\-"“(\s]+/, '').charAt(0); return c && c !== c.toUpperCase(); });
    if (semMai.length) tips.push('Comece cada frase com <b>letra maiúscula</b>. Confira: "' + esc(semMai[0].trim().slice(0, 40)) + '…"');
    else if (sentences.length > 1) good.push('As frases começam com letra maiúscula. 👍');
    if (!/[.!?…]["”)]?\s*$/.test(clean)) tips.push('Termine o texto com um <b>sinal de pontuação</b> (. ! ?).');
    var longas = sentences.filter(function (s) { return s.split(/\s+/).length > 30; });
    if (longas.length) tips.push('Há uma frase muito comprida (mais de 30 palavras). Tente dividi-la com <b>ponto final</b> ou vírgulas.');
    var ai = (low.match(/ (aí|ai|daí|dai) /g) || []).length;
    if (ai >= 2) tips.push('A palavra "aí/daí" apareceu ' + ai + ' vezes. Troque por <b>então, depois, logo em seguida, de repente</b>.');
    var eNum = (low.match(/ e /g) || []).length;
    if (eNum > Math.max(6, nw / 8)) tips.push('Muitos "e" seguidos deixam o texto cansativo. Use ponto final e comece uma nova frase.');
    // repetição de palavras
    var stop = 'o a os as um uma uns umas e de do da dos das em no na nos nas que para pra com por se eu ele ela eles elas nós me meu minha seu sua não é foi era um ao à mas mais muito já lá'.split(' ');
    var freq = {}; low.split(/\s+/).forEach(function (w) { if (w.length > 3 && stop.indexOf(w) < 0) freq[w] = (freq[w] || 0) + 1; });
    var rep = Object.keys(freq).filter(function (w) { return freq[w] >= 4; });
    if (rep.length) tips.push('A palavra "<b>' + esc(rep[0]) + '</b>" se repetiu ' + freq[rep[0]] + ' vezes. Use um <b>pronome</b> (ele, ela) ou um sinônimo.');
    if (nw > 80 && paras.length < 2) tips.push('Divida o texto em <b>parágrafos</b>: começo, problema e final.');
    else if (paras.length >= 3) good.push('Você organizou o texto em ' + paras.length + ' parágrafos. Ótimo!');
    var con = ['primeiro', 'depois', 'então', 'de repente', 'finalmente', 'no final', 'no dia seguinte', 'enquanto', 'porque', 'mas', 'quando'].filter(function (c) { return low.indexOf(' ' + c + ' ') >= 0; });
    if (con.length >= 2) good.push('Você usou palavras de ligação (' + con.slice(0, 3).join(', ') + '), que deixam a sequência clara.');
    else tips.push('Use palavras que ligam as ideias: <b>primeiro, depois, de repente, finalmente</b>.');
    if (/—|–/.test(clean) || /"|“/.test(clean)) good.push('Você colocou falas de personagens (discurso direto). Muito legal!');
    if (/^\s*-\s/m.test(clean)) tips.push('Para as falas, use o <b>travessão (—)</b> em vez do hífen (-). No celular, segure o "-" para escolher o travessão.');
    var ort = [['nois', 'nós'], ['concerteza', 'com certeza'], ['derrepente', 'de repente'], ['agente foi', 'a gente foi'], ['enves', 'em vez'], ['menas', 'menos'], ['mais eu', 'mas eu']];
    ort.forEach(function (p) { if (low.indexOf(' ' + p[0] + ' ') >= 0) tips.push('Confira a escrita: "' + p[0] + '" → <b>' + p[1] + '</b>.'); });
    if (!good.length) good.push('Você colocou suas ideias no papel — esse é o primeiro passo de todo escritor! ✨');
    return { good: good, tips: tips.slice(0, 4), nw: nw, ns: sentences.length, np: paras.length };
  }

  function vWriting() {
    app.innerHTML = '<h1>✍️ Escrita e Português</h1>' +
      '<div class="tabs"><button class="tab active" data-p="prod">Produzir texto</button><button class="tab" data-p="gram">Caça às classes</button><button class="tab" data-p="leit">Leitura</button><button class="tab" data-p="cali">Caligrafia</button></div><div id="wpane"></div>';
    $$('.tab').forEach(function (b) { b.onclick = function () { $$('.tab').forEach(function (x) { x.classList.toggle('active', x === b); }); pane(b.dataset.p); }; });
    pane('prod');
  }
  function pane(p) {
    var el = $('#wpane');
    if (p === 'prod') {
      var pi = Math.floor(Math.random() * PROMPTS.length);
      el.innerHTML = '<div class="card"><h2>Escolha uma proposta</h2><div class="prompts">' + PROMPTS.map(function (x, i) { return '<button class="prompt ' + (i === pi ? 'sel' : '') + '" data-i="' + i + '">' + x[0] + '</button>'; }).join('') + '</div><p class="ptxt"></p>' +
        '<details class="tipsbox"><summary>📌 Lembretes antes de escrever</summary><ul><li>Início: quem, onde e quando.</li><li>Conflito: qual é o problema?</li><li>Final: como se resolveu?</li><li>Letra maiúscula no começo das frases e pontuação no fim.</li></ul></details>' +
        '<textarea id="wtxt" rows="12" placeholder="Escreva sua história aqui, amigo..."></textarea><div class="row"><span class="muted" id="wc">0 palavras</span><button class="btn primary" id="anl">💬 Receber sugestões</button><button class="btn" id="svw">💾 Guardar texto</button></div><div id="wfb"></div></div>' +
        '<div class="card"><h2>📚 Meus textos guardados</h2><div id="wlist"></div></div>';
      function setP(i) { pi = i; $$('.prompt').forEach(function (b) { b.classList.toggle('sel', +b.dataset.i === i); }); $('.ptxt').innerHTML = '<b>' + PROMPTS[i][0] + ':</b> ' + PROMPTS[i][1]; }
      $$('.prompt').forEach(function (b) { b.onclick = function () { setP(+b.dataset.i); }; }); setP(pi);
      var ta = $('#wtxt'), draft = localStorage.getItem(KEY + '_draft'); if (draft) ta.value = draft;
      function wc() { var n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; $('#wc').textContent = n + ' palavra' + (n === 1 ? '' : 's'); }
      ta.oninput = function () { wc(); try { localStorage.setItem(KEY + '_draft', ta.value); } catch (e) { } }; wc();
      $('#anl').onclick = function () {
        var r = analyzeText(ta.value);
        if (!r) { $('#wfb').innerHTML = '<div class="fb try">Escreva um pouquinho primeiro! ✏️</div>'; return; }
        $('#wfb').innerHTML = '<div class="fb ok"><b>🌟 O que ficou bom</b><ul>' + r.good.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul></div>' +
          (r.tips.length ? '<div class="fb try"><b>🔧 Sugestões para melhorar</b><ul>' + r.tips.map(function (g) { return '<li>' + g + '</li>'; }).join('') + '</ul></div>' : '') +
          '<p class="muted small">Estas são sugestões automáticas simples (contagem de palavras, pontuação, repetições). Elas não substituem a leitura de um adulto ou professor. Peça para alguém ler sua história também! 😊</p>';
      };
      $('#svw').onclick = function () {
        var v = ta.value.trim(); if (!v) return;
        S.writings.push({ ts: Date.now(), prompt: PROMPTS[pi][0], text: v, words: v.split(/\s+/).length }); save();
        ta.value = ''; localStorage.removeItem(KEY + '_draft'); wc(); list(); $('#wfb').innerHTML = '<div class="fb ok">💾 Texto guardado!</div>';
      };
      function list() { $('#wlist').innerHTML = S.writings.length ? S.writings.slice().reverse().map(function (w) { return '<details class="gab"><summary>' + fmtDate(w.ts) + ' — ' + esc(w.prompt) + ' (' + w.words + ' palavras)</summary><div class="wsaved">' + esc(w.text).replace(/\n/g, '<br>') + '</div></details>'; }).join('') : '<p class="muted">Nenhum texto guardado ainda.</p>'; }
      list();
    } else if (p === 'gram') {
      var cur, target, sel;
      el.innerHTML = '<div class="card"><h2>🏷️ Caça às classes de palavras</h2><p>Toque em <b>todas</b> as palavras da classe pedida e depois em "Conferir".</p><div id="gq"></div></div>' + FIG.render({ t: 'tagged', words: [['o', 'art'], ['menino', 'sub'], ['feliz', 'adj'], ['ele', 'pron'], ['correu', 'verb']] });
      function newG() {
        cur = GRAM[Math.floor(Math.random() * GRAM.length)];
        var cls = shuffle(['adj', 'pron', 'sub', 'verb', 'art', 'adj', 'pron']).filter(function (c) { return cur.some(function (w) { return w[1] === c; }); });
        target = cls[0]; sel = {};
        $('#gq').innerHTML = '<p class="gask">Encontre os <b>' + GRAM_ASK[target] + '</b>:</p><div class="gwords">' + cur.map(function (w, i) { return '<button class="gw" data-i="' + i + '">' + w[0] + '</button>'; }).join(' ') + '.</div><div class="row"><button class="btn primary" id="gchk">Conferir</button></div><div id="gfb"></div>';
        $$('.gw').forEach(function (b) { b.onclick = function () { var i = b.dataset.i; sel[i] = !sel[i]; b.classList.toggle('sel', !!sel[i]); }; });
        $('#gchk').onclick = check;
      }
      function check() {
        var ok = true;
        cur.forEach(function (w, i) { var should = w[1] === target, is = !!sel[i]; if (should !== is) ok = false; var b = $$('.gw')[i]; b.disabled = true; if (should) b.classList.add('right'); else if (is) b.classList.add('wrong'); });
        var exp = cur.map(function (w) { return '<b>' + w[0] + '</b> (' + (w[1] === 'x' ? 'outra classe' : FIG.TAGN[w[1]]) + ')'; }).join(', ');
        record({ id: 'gram:' + cur.map(function (w) { return w[0]; }).join('_') + ':' + target, t: 'p_gram', d: 2 }, { ok: ok, attempts: 1, hints: 0, chosen: null }, 'gram');
        $('#gfb').innerHTML = (ok ? '<div class="fb ok"><b>Perfeito! 🎯</b>' : '<div class="fb no"><b>Quase! Veja a classificação:</b>') + '<div class="exp">' + exp + '</div><div class="row"><button class="btn primary" id="gnx">Outra frase ➜</button></div></div>';
        $('#gnx').onclick = newG;
      }
      newG();
    } else if (p === 'leit') {
      el.innerHTML = '<div class="card"><h2>📖 Textos para ler e responder</h2><p>Escolha um texto. As perguntas trabalham informações do texto, inferências e sentido das palavras.</p><div class="tgrid">' +
        Object.keys(PASSAGES).map(function (k) { var P2 = PASSAGES[k], n = BANK.filter(function (q) { return q.txt === k; }).length; return '<div class="tcard por"><div class="ticon">📄</div><div class="tbody"><div class="tname">' + esc(P2.titulo) + '</div><div class="tdesc">' + esc(P2.genero) + ' • ' + n + ' perguntas</div><div class="row"><a class="btn small primary" href="#/praticar?txt=' + k + '">Ler e responder</a></div></div></div>'; }).join('') + '</div></div>';
    } else {
      el.innerHTML = '<div class="card"><h2>✏️ Caligrafia: letra caprichada</h2><p class="note">Este site recebe apenas texto digitado, então <b>não avalia a letra escrita à mão</b>. Use a folha para imprimir e peça para um adulto olhar junto com você.</p>' +
        '<ul class="routine"><li><b>Espaço entre palavras:</b> do tamanho de um dedinho.</li><li><b>Tamanho das letras:</b> letras pequenas (a, e, o) ocupam metade da linha; letras altas (b, d, l, t) sobem mais.</li><li><b>Alinhamento:</b> todas as letras "sentadas" na linha.</li><li><b>Pontuação:</b> ponto no fim e maiúscula no começo.</li><li><b>Revisão:</b> releia e circule uma palavra que pode ficar mais bonita.</li><li><b>Pouco e bem feito:</b> 5 minutos caprichados valem mais que uma página corrida.</li></ul>' +
        '<label>Frase para copiar<select id="cfr"><option>O goleiro voou e defendeu o pênalti no último minuto.</option><option>Seguimos o mapa até a velha figueira e encontramos o tesouro.</option><option>A detetive Bia encontrou pegadas de lama perto da horta.</option><option>Hoje eu aprendi que o denominador fica embaixo da fração.</option></select></label>' +
        '<div class="row"><button class="btn primary" id="prt">🖨️ Imprimir folha de caligrafia</button></div></div>';
      $('#prt').onclick = function () {
        var fr = $('#cfr').value, lines = '';
        for (var i = 0; i < 6; i++) lines += '<div class="pline"></div>';
        $('#print-area').innerHTML = '<h1>Folha de caligrafia — Missão Stella Maris</h1><p>Nome: ____________________________ Data: ___/___/______</p><p class="pmodel">' + esc(fr) + '</p>' + lines +
          '<h2>Agora escreva uma frase sua sobre futebol, aventura ou mistério:</h2>' + '<div class="pline"></div><div class="pline"></div><div class="pline"></div>' +
          '<h2>Confira (pinte quando conseguir):</h2><p>☐ Deixei espaço entre as palavras &nbsp; ☐ Letras sentadas na linha &nbsp; ☐ Comecei com maiúscula &nbsp; ☐ Coloquei ponto final</p>';
        window.print();
      };
    }
  }

  /* ================= ÁREA DO RESPONSÁVEL ================= */
  var NOTE_TAGS = ['Precisou de ajuda', 'Respondeu sozinho', 'Estava cansado', 'Muito concentrado', 'Gostou da atividade', 'Teve dificuldade com leitura'];
  function vParent() {
    var mat = subjStats('mat'), por = subjStats('por'), total = S.answers.filter(function (a) { return a.mode !== 'guiado'; });
    var recs = recommendations(4);
    var sl = S.sessions.filter(function (s) { return s.active > 0 || s.answered > 0; }).slice().reverse();
    app.innerHTML = '<h1>👨‍👩‍👦 Área do responsável</h1><p class="muted">Todos os dados abaixo são <b>registrados neste navegador</b>, a partir das atividades feitas aqui. Nada é inventado nem enviado para a internet.</p>' +
      '<div class="stats4"><div class="card stat"><b>' + fmtDur(totalActive()) + '</b><span>tempo de estudo ativo</span></div><div class="card stat"><b>' + total.length + '</b><span>questões respondidas</span></div><div class="card stat"><b>' + pct(total.filter(function (a) { return a.first && !a.guess; }).length, total.length) + '%</b><span>acerto de primeira</span></div><div class="card stat"><b>' + S.sims.length + '</b><span>simulados feitos</span></div></div>' +
      '<div class="card"><h2>📌 Recomendações para a próxima sessão</h2><ol>' + recs.map(function (r) { return '<li><b>' + esc(TOPIC_BY_ID[r.t].nome) + '</b> — ' + esc(r.why) + '</li>'; }).join('') + '</ol>' +
      (DAYPLAN[dayKey(new Date(Date.now() + 86400000))] ? '<p><b>Plano sugerido para amanhã:</b> ' + DAYPLAN[dayKey(new Date(Date.now() + 86400000))].itens.map(function (i) { return esc(i[1]); }).join(' • ') + (DAYPLAN[dayKey(new Date(Date.now() + 86400000))].nota ? ' — ' + esc(DAYPLAN[dayKey(new Date(Date.now() + 86400000))].nota) : '') + '</p>' : '') + '</div>' +
      '<div class="card"><h2>📊 Situação por assunto</h2><p class="muted small"><b>Consolidado</b> = pelo menos 6 respostas, 5 das últimas 6 certas de primeira (sem chute) e nenhum erro em aberto.</p>' +
      ['mat', 'por'].map(function (s) { var st = s === 'mat' ? mat : por; return '<h3>' + SUBJ[s] + ' — ' + st.dom + ' consolidado(s), ' + (st.studied - st.dom) + ' em desenvolvimento, ' + (st.total - st.studied) + ' não estudado(s)</h3><table class="datatab"><thead><tr><th>Assunto</th><th>Origem</th><th>Situação</th><th>Resp.</th><th>Acerto</th><th>Erros abertos</th><th>Lições</th></tr></thead><tbody>' + TOPICS.filter(function (t) { return t.s === s; }).map(function (t) { var a = topicAcc(t.id), stt = STATUS[topicStatus(t.id)]; return '<tr><td>' + t.icone + ' ' + esc(t.nome) + '</td><td><span class="chip ' + ORIGENS[t.origem].cor + '">' + ORIGENS[t.origem].rotulo + '</span></td><td><span class="chip ' + stt[1] + '">' + stt[0] + '</span></td><td>' + a.n + '</td><td>' + (a.n ? pct(a.ok, a.n) + '%' : '—') + '</td><td>' + openErrors(t.id).length + '</td><td>' + (S.lessons[t.id] || []).length + '</td></tr>'; }).join('') + '</tbody></table>'; }).join('') + '</div>' +
      '<div class="card"><h2>📝 Simulados</h2>' + (S.sims.length ? '<table class="datatab"><thead><tr><th>Data</th><th>Modo</th><th>Total</th><th>Português</th><th>Matemática</th><th>Tempo</th><th></th></tr></thead><tbody>' + S.sims.slice().reverse().map(function (s) { return '<tr><td>' + fmtDate(s.ts) + '</td><td>' + s.mode + '</td><td><b>' + s.score + '/20</b></td><td>' + s.por + '/10</td><td>' + s.mat + '/10</td><td>' + fmtDur(s.sec) + '</td><td><a href="#/simulado/r/' + s.id + '">gabarito</a></td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">Nenhum simulado ainda.</p>') + '</div>' +
      '<div class="card"><h2>🗓️ Histórico de sessões</h2>' + (sl.length ? '<table class="datatab"><thead><tr><th>Início</th><th>Tempo ativo</th><th>Questões</th><th>Certas de primeira</th></tr></thead><tbody>' + sl.slice(0, 30).map(function (s) { return '<tr><td>' + fmtDate(s.start) + '</td><td>' + fmtDur(s.active) + '</td><td>' + s.answered + '</td><td>' + s.correct + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="muted">Ainda não há sessões com atividade.</p>') +
      '<p class="muted small">Textos escritos guardados: ' + S.writings.length + '.</p></div>' +
      '<div class="card"><h2>🗒️ Observações do responsável</h2><div class="tagsel">' + NOTE_TAGS.map(function (t) { return '<button class="tagb" data-t="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div><textarea id="ntxt" rows="3" placeholder="Ex.: fez frações sozinho, precisou de ajuda na leitura do texto 2..."></textarea><div class="row"><button class="btn primary" id="nsv">Salvar observação</button></div>' +
      '<ul class="notes">' + S.notes.slice().reverse().map(function (n) { return '<li><small>' + fmtDate(n.ts) + '</small> ' + n.tags.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join(' ') + ' ' + esc(n.text) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="card"><h2>🧪 Diagnóstico inicial (informativo)</h2><p>Antes deste site, foi aplicado um conjunto introdutório: <b>Matemática 9/10</b> (frações ainda não conhecidas; aprendeu rápido após explicação) e <b>Português 9/10</b> (dúvidas sobre pronome e função do adjetivo). Esse diagnóstico foi curto e básico: <b>não comprova domínio</b> dos conteúdos e <b>não entra</b> nas estatísticas acima.</p></div>' +
      '<div class="card"><h2>📄 Sobre a prova</h2><p>Para o 5º ano (Anos Iniciais): 20 questões de múltipla escolha (10 de Matemática e 10 de Língua Portuguesa), duração máxima de 2 horas e permanência mínima de 1 hora. Chegar com 30 minutos de antecedência, com responsável legal, documento original com foto, lápis, borracha, régua e caneta preta. Sem calculadora ou celular. 1º critério de desempate: desempenho em Matemática. Podem ser cobrados conteúdos da BNCC das séries anteriores, com ênfase nos tópicos listados.</p><p class="note">Este é um resumo de apoio. <b>Confira sempre o regulamento/edital oficial da escola</b> — em caso de diferença, vale o documento oficial. Site independente, sem vínculo com o colégio.</p></div>' +
      '<div class="card"><h2>💾 Dados</h2><p class="muted">O progresso fica só neste navegador. Para usar em outro aparelho ou guardar uma cópia, exporte o arquivo JSON e importe no outro.</p><div class="row"><button class="btn" id="exp">⬇️ Exportar (JSON)</button><label class="btn">⬆️ Importar<input type="file" id="imp" accept="application/json,.json" hidden></label><button class="btn danger" id="rst">🗑️ Apagar todo o progresso</button></div></div>';
    var tags = {};
    $$('.tagb').forEach(function (b) { b.onclick = function () { tags[b.dataset.t] = !tags[b.dataset.t]; b.classList.toggle('sel', tags[b.dataset.t]); }; });
    $('#nsv').onclick = function () { var tg = Object.keys(tags).filter(function (k) { return tags[k]; }), tx = $('#ntxt').value.trim(); if (!tg.length && !tx) return; S.notes.push({ ts: Date.now(), tags: tg, text: tx }); save(); vParent(); };
    $('#exp').onclick = function () {
      var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'missao-stella-maris-progresso-' + dayKey() + '.json'; document.body.appendChild(a); a.click(); a.remove();
    };
    $('#imp').onchange = function () {
      var f = this.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        try { var d = JSON.parse(rd.result); if (!d || d.v !== 1 || !Array.isArray(d.answers)) throw 0; if (!confirm('Substituir o progresso atual pelos dados do arquivo?')) return; S = d; Object.keys(base).forEach(function (k) { if (S[k] === undefined) S[k] = base[k]; }); save(); alert('Dados importados!'); location.reload(); }
        catch (e) { alert('Arquivo inválido.'); }
      };
      rd.readAsText(f);
    };
    $('#rst').onclick = function () { if (confirm('Apagar TODO o progresso deste navegador? Isso não pode ser desfeito. (Dica: exporte antes.)') && confirm('Tem certeza?')) { localStorage.removeItem(KEY); localStorage.removeItem(KEY + '_draft'); location.reload(); } };
  }

  route();
})();
