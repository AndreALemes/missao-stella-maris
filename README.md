# Missão Stella Maris — Estudos do Matteo

Página de estudos e simulados (site estático, sem servidor e sem login) para a prova de admissão/bolsas do 5º ano (27/11/2026).

- **Aprender**: lições curtas com explicação, figura, exemplo resolvido, exercício guiado com dicas, exercícios com dificuldade crescente e resumo "O que aprendi hoje".
- **Praticar**: filtros por disciplina, assunto e dificuldade (ou automática), feedback imediato, dicas graduais, "questão parecida" após erro e botão "Chutei essa".
- **Simulado**: 20 questões (10 Português + 10 Matemática), cronômetro de 120 min, modo treino (pausa) e modo prova, gabarito comentado.
- **Caderno de erros**: um erro só é consolidado após 2 acertos novos seguidos, de primeira, no mesmo assunto.
- **Escrita**: propostas de texto com sugestões automáticas simples, caça às classes de palavras, textos para leitura e folha de caligrafia para imprimir.
- **Responsável**: histórico, situação por assunto, recomendações, observações, exportar/importar JSON.

O progresso fica apenas no `localStorage` do navegador. Questões originais; matemática também usa geradores com resposta calculada.

## Estrutura
- `index.html`, `css/style.css`
- `js/topics.js` — assuntos e lições (origem: edital / anos anteriores / revisão complementar)
- `js/bank.js` — textos, questões fixas e geradores
- `js/figs.js` — figuras (frações, relógio, gráficos, malhas, planificações...)
- `js/app.js` — aplicação
- `tools/validate.js` — `node tools/validate.js` confere se toda questão tem 4 alternativas distintas e exatamente uma correta

Rodar localmente: `python -m http.server 8765` e abrir http://localhost:8765

Site independente, sem vínculo com o Colégio Stella Maris. Confira sempre o regulamento oficial.
