// Valida o banco de questões: node tools/validate.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = {}; vm.createContext(ctx);
['topics.js', 'bank.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'), ctx));
vm.runInContext('this.TOPICS=TOPICS;this.BANK=BANK;this.PASSAGES=PASSAGES;this.GEN=GEN;this.generateQuestion=generateQuestion;this.TOPIC_BY_ID=TOPIC_BY_ID', ctx);
const { TOPICS, BANK, PASSAGES, GEN, generateQuestion, TOPIC_BY_ID } = ctx;
let erros = 0;
const err = (m) => { erros++; console.log('ERRO:', m); };
function check(q, where) {
  if (!TOPIC_BY_ID[q.t]) err(where + ' assunto inexistente ' + q.t);
  if (!Array.isArray(q.o) || q.o.length !== 4) err(where + ' não tem 4 alternativas: ' + JSON.stringify(q.o));
  const norm = q.o.map(x => String(x).replace(/<[^>]+>/g, '').trim());
  if (new Set(norm).size !== norm.length) err(where + ' alternativas repetidas: ' + JSON.stringify(q.o));
  if (!(q.a >= 0 && q.a < 4)) err(where + ' índice de resposta inválido');
  if (!q.e) err(where + ' sem explicação');
  if (!q.h || q.h.length < 1) err(where + ' sem dicas');
  if (q.txt && !PASSAGES[q.txt]) err(where + ' texto inexistente');
  if (![1, 2, 3].includes(q.d)) err(where + ' dificuldade inválida');
  q.o.forEach(x => { if (x === undefined || x === null || String(x).includes('NaN') || String(x).includes('undefined')) err(where + ' alternativa inválida ' + x); });
}
const ids = new Set();
BANK.forEach(q => { if (ids.has(q.id)) err('id duplicado ' + q.id); ids.add(q.id); check(q, q.id); });
TOPICS.forEach(t => { const g = t.licao.guiado; check(Object.assign({ t: t.id, d: 1 }, g), 'guiado ' + t.id); });
let gerados = 0;
Object.keys(GEN.G).forEach(t => {
  for (let d = 1; d <= 3; d++) for (let i = 0; i < 400; i++) {
    const q = generateQuestion(t, d); if (!q) continue; gerados++;
    check(q, 'gerador ' + t + ' d' + d + ' ' + q.key);
  }
});
// contagem por assunto
const cont = {}; BANK.forEach(q => cont[q.t] = (cont[q.t] || 0) + 1);
console.log('Questões fixas:', BANK.length, '| geradas testadas:', gerados);
TOPICS.forEach(t => console.log(' ', t.id.padEnd(12), 'fixas:', String(cont[t.id] || 0).padStart(3), ' gerador:', (GEN.G[t.id] || []).length));
// amostras de extenso
[1001, 2300, 2345, 10000, 21015, 47305, 99999, 100100 % 100000, 1100, 16000].forEach(n => console.log('  extenso', n, '=>', GEN.extenso(n)));
console.log(erros ? `\n${erros} erro(s)` : '\nOK: nenhuma inconsistência encontrada.');
process.exit(erros ? 1 : 0);
