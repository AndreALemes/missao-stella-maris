/* Banco de questões ORIGINAIS.
   Formato: { id, t: assunto, d: dificuldade 1-3, q: enunciado (html), o: [4 alternativas], a: índice da correta,
              e: explicação, h: [dica1, dica2], w?: {índice: por que está errada}, txt?: id do texto, fig?: figura }
   Matemática também usa GERADORES (questões novas a cada vez, com resposta calculada). */

var PASSAGES = {
  T1: {
    titulo: 'O mapa do vovô', genero: 'Conto',
    html: '<p>No sótão da casa do avô, Caio encontrou um papel amarelado, dobrado em quatro. Era um mapa! Havia um X vermelho desenhado perto da figueira do quintal.</p>' +
      '<p>— Vovô, isto é um mapa do tesouro? — perguntou Caio, com os olhos brilhando.</p>' +
      '<p>O avô sorriu e respondeu que ele mesmo tinha desenhado aquele mapa quando era menino.</p>' +
      '<p>Caio correu até o quintal, contou dez passos a partir da figueira e cavou. Encontrou uma latinha enferrujada. Dentro dela havia bolinhas de gude coloridas e um bilhete: "Para quem gosta de aventuras."</p>' +
      '<p>Naquela tarde, avô e neto jogaram bolinha de gude até o sol se pôr.</p>'
  },
  T2: {
    titulo: 'Alunos colhem a primeira safra da horta da escola', genero: 'Notícia',
    html: '<p><b>Curitiba</b> — Os alunos do 4º ano de uma escola municipal colheram, na última sexta-feira, as primeiras alfaces da horta que eles mesmos plantaram em agosto. O projeto começou depois que a turma estudou a importância de uma alimentação saudável.</p>' +
      '<p>Segundo a professora responsável, cada aluno ficou encarregado de regar os canteiros uma vez por semana. "Eles aprenderam que uma planta precisa de cuidado constante", contou.</p>' +
      '<p>As verduras colhidas foram usadas na merenda da escola. A turma já planeja plantar cenouras e tomates no próximo semestre.</p>'
  },
  T3: {
    titulo: 'Futebol no quintal', genero: 'Poema',
    html: '<p class="poema">A bola rola no chão,<br>o gol é feito de chinelo,<br>o juiz é o cachorrão<br>e o troféu, um caramelo.</p>' +
      '<p class="poema">Quando a mãe chama: "Jantar!",<br>o placar fica empatado.<br>Amanhã vamos jogar:<br>o desempate está marcado.</p>'
  },
  T4: {
    titulo: 'Cartaz', genero: 'Cartaz',
    html: '<div class="cartaz"><div class="c-tit">🌸 GINCANA DA PRIMAVERA 🌸</div>' +
      '<div>📅 Sábado, 14 de setembro &nbsp; ⏰ 9h</div><div>📍 Praça Central</div>' +
      '<div>🏃 Corrida do saco • 🗺️ Caça ao tesouro • 🎨 Pintura</div>' +
      '<div>🧢 Traga boné e 💧 garrafa de água</div>' +
      '<div class="c-dest">🧸 Entrada: 1 brinquedo para doação</div></div>'
  },
  T5: {
    titulo: 'Tirinha', genero: 'Tirinha',
    html: '<div class="tirinha">' +
      '<div class="q"><div class="balao">Mãe, posso jogar bola?</div><div class="balao b2">Só depois de arrumar o quarto.</div><div class="pers">🧒 👩</div></div>' +
      '<div class="q"><div class="balao pensa">Que preguiça...</div><div class="pers">🧒</div><div class="cena">🧸👕📚🧦</div></div>' +
      '<div class="q"><div class="balao">Pronto! Arrumei em 5 minutos!</div><div class="pers">🧒✨ 👩😮</div><div class="cena">⚽</div></div>' +
      '</div>'
  },
  T6: {
    titulo: 'Um animal cheio de surpresas', genero: 'Texto informativo',
    html: '<p>Você sabia que o polvo tem três corações? Dois deles bombeiam o sangue para as brânquias, e o terceiro, para o resto do corpo. E tem mais: o sangue do polvo é azul!</p>' +
      '<p>Ele tem oito braços cobertos de ventosas, que funcionam como pequenos copos de sucção para agarrar os alimentos. Quando se sente ameaçado, o polvo solta uma tinta escura na água e foge sem ser visto.</p>'
  },
  T7: {
    titulo: 'O mistério da bola sumida', genero: 'Texto dramático',
    html: '<div class="drama"><p class="rub">CENA 1 — Pátio da escola, na hora do recreio.</p>' +
      '<p class="rub">(Rafa procura algo embaixo do banco. Bia entra correndo.)</p>' +
      '<p><b>BIA:</b> O que você está procurando, Rafa?</p>' +
      '<p><b>RAFA:</b> <i>(coçando a cabeça)</i> A bola do time! Ela estava aqui antes do sinal.</p>' +
      '<p><b>BIA:</b> <i>(apontando para o chão)</i> Olha! Pegadas de lama indo para a horta!</p>' +
      '<p><b>RAFA:</b> <i>(animado)</i> Vamos seguir as pistas, detetive Bia!</p>' +
      '<p class="rub">(Os dois saem na ponta dos pés. As luzes se apagam.)</p></div>'
  }
};

var BANK = [
  /* ======================= MATEMÁTICA (fixas) ======================= */
  // Frações
  { id: 'mf1', t: 'm_frac', d: 1, q: 'Na fração <b>3/8</b>, o que indica o número <b>8</b> (o denominador)?', o: ['Em quantas partes iguais o inteiro foi dividido', 'Quantas partes foram pintadas', 'Quantos inteiros existem', 'Quantas partes sobraram'], a: 0, h: ['O denominador fica embaixo.', 'Ele conta as partes do inteiro todo.'], e: 'O denominador (embaixo) indica em quantas partes <b>iguais</b> o inteiro foi dividido: 8. O numerador (3) indica quantas partes consideramos.' },
  { id: 'mf2', t: 'm_frac', d: 1, q: 'Como se lê a fração <b>1/10</b>?', o: ['um décimo', 'um centésimo', 'dez inteiros', 'um sobre cem'], a: 0, h: ['Frações com denominador 10 são "décimos".', 'Denominador 100 seria "centésimo".'], e: '1/10 lê-se <b>um décimo</b>. 1/100 é um centésimo.' },
  { id: 'mf3', t: 'm_frac', d: 1, q: 'Como se lê a fração <b>1/100</b>?', o: ['um centésimo', 'um décimo', 'cem inteiros', 'um quinto'], a: 0, h: ['O denominador é 100.', 'Cem → centésimo.'], e: '1/100 lê-se <b>um centésimo</b>: o inteiro foi dividido em 100 partes iguais e pegamos 1.' },
  { id: 'mf4', t: 'm_frac', d: 2, q: 'Uma barra foi dividida em 4 partes de <b>tamanhos diferentes</b> e uma delas foi pintada. A parte pintada representa 1/4 da barra?', o: ['Não, porque as partes precisam ser iguais', 'Sim, porque são 4 partes', 'Sim, porque só 1 foi pintada', 'Não, porque deveriam ser 10 partes'], a: 0, h: ['Lembre da definição de fração.', 'Fração exige partes de mesmo tamanho.'], e: 'Fração só funciona com partes <b>iguais</b>. Se as partes têm tamanhos diferentes, a parte pintada não é 1/4.' },
  { id: 'mf5', t: 'm_frac', d: 2, q: 'Quanto é <b>1/10</b> de <b>R$ 1,00</b>?', o: ['10 centavos', '1 centavo', '50 centavos', 'R$ 10,00'], a: 0, h: ['R$ 1,00 tem 100 centavos.', 'Divida 100 centavos por 10.'], e: 'R$ 1,00 = 100 centavos. 100 ÷ 10 = <b>10 centavos</b>.' },
  { id: 'mf6', t: 'm_frac', d: 2, q: 'Quanto é <b>1/100</b> de <b>1 metro</b>?', o: ['1 centímetro', '10 centímetros', '100 centímetros', '1 quilômetro'], a: 0, h: ['1 metro tem 100 centímetros.', 'Divida 100 cm por 100.'], e: '1 m = 100 cm. 100 ÷ 100 = <b>1 cm</b>. Por isso o centímetro é a centésima parte do metro!' },
  { id: 'mf7', t: 'm_frac', d: 1, q: '<b>1/4</b> de hora corresponde a quantos minutos?', o: ['15 minutos', '25 minutos', '4 minutos', '40 minutos'], a: 0, h: ['1 hora tem 60 minutos.', '60 ÷ 4 = ?'], e: '60 minutos ÷ 4 = <b>15 minutos</b> (um quarto de hora).' },
  { id: 'mf8', t: 'm_frac', d: 1, q: '<b>Metade</b> (1/2) de 1 litro é igual a:', o: ['500 mL', '50 mL', '200 mL', '1.000 mL'], a: 0, h: ['1 litro = 1.000 mL.', 'Metade é dividir por 2.'], e: '1 L = 1.000 mL. 1.000 ÷ 2 = <b>500 mL</b>.' },
  { id: 'mf9', t: 'm_frac', d: 2, q: 'Qual alternativa mostra as frações em ordem do <b>menor</b> pedaço para o <b>maior</b>?', o: ['1/10, 1/5, 1/3, 1/2', '1/2, 1/3, 1/5, 1/10', '1/3, 1/2, 1/10, 1/5', '1/5, 1/10, 1/2, 1/3'], a: 0, h: ['Com numerador 1, quanto maior o denominador, menor o pedaço.', 'O menor pedaço é o de maior denominador.'], e: 'Dividir em 10 dá pedaços menores que dividir em 2. Do menor ao maior: <b>1/10, 1/5, 1/3, 1/2</b>.' },
  { id: 'mf10', t: 'm_frac', d: 3, q: 'Lia comeu <b>1/3</b> de uma barra de chocolate e seu irmão comeu outro <b>1/3</b>. Que fração da barra sobrou?', o: ['1/3', '2/3', '1/6', '3/3'], a: 0, h: ['A barra inteira tem 3 terços (3/3).', 'Foram comidos 2 terços.'], e: 'A barra tem 3/3. Foram comidos 1/3 + 1/3 = 2/3. Sobrou <b>1/3</b>.', w: { 1: '2/3 é o que foi comido, não o que sobrou.' } },
  { id: 'mf11', t: 'm_frac', d: 3, q: 'Numa turma de 30 alunos, <b>1/5</b> usa óculos. Quantos alunos <b>não</b> usam óculos?', o: ['24', '6', '25', '5'], a: 0, h: ['Primeiro descubra 1/5 de 30.', 'Depois tire esse número do total.'], e: '1/5 de 30 = 30 ÷ 5 = 6 usam óculos. Não usam: 30 − 6 = <b>24</b>.', w: { 1: '6 é quantos USAM óculos. A pergunta pede os que não usam.' } },
  { id: 'mf12', t: 'm_frac', d: 2, q: 'Uma pizza foi dividida em <b>8</b> pedaços iguais. Cada pedaço representa:', o: ['1/8 da pizza', '8/1 da pizza', '1/4 da pizza', '1/2 da pizza'], a: 0, h: ['O inteiro foi dividido em 8 partes.', 'Cada pedaço é 1 dessas partes.'], e: 'Cada pedaço é 1 de 8 partes iguais: <b>1/8</b>.' },
  { id: 'mf13', t: 'm_frac', d: 3, q: 'O que é maior: <b>1/4</b> de uma pizza ou <b>1/5</b> da mesma pizza?', o: ['1/4, porque a pizza foi dividida em menos partes', '1/5, porque 5 é maior que 4', 'São iguais', 'Não dá para saber'], a: 0, h: ['Imagine dividir a pizza entre 4 ou entre 5 pessoas.', 'Mais pessoas = pedaço menor.'], e: 'Dividindo em 4 partes, cada pedaço fica maior do que dividindo em 5. Então <b>1/4 &gt; 1/5</b>.', w: { 1: 'Cuidado! Denominador maior significa pedaço MENOR.' } },

  // Números
  { id: 'mn1', t: 'm_num', d: 2, q: 'Qual é o <b>maior</b> número que se pode formar com os algarismos <b>3, 9, 1, 7 e 5</b>, sem repetir?', o: ['97.531', '13.579', '97.513', '95.731'], a: 0, h: ['Coloque o maior algarismo na ordem de maior valor.', 'Organize do maior para o menor, da esquerda para a direita.'], e: 'Do maior para o menor: 9, 7, 5, 3, 1 → <b>97.531</b>.' },
  { id: 'mn2', t: 'm_num', d: 1, q: 'Qual é o <b>antecessor</b> de 40.000 (o número que vem logo antes)?', o: ['39.999', '40.001', '39.000', '30.999'], a: 0, h: ['Antecessor = número − 1.', '40.000 − 1 = ?'], e: '40.000 − 1 = <b>39.999</b>.' },
  { id: 'mn3', t: 'm_num', d: 1, q: 'Qual é o <b>sucessor</b> de 9.999 (o número que vem logo depois)?', o: ['10.000', '9.998', '10.999', '1.000'], a: 0, h: ['Sucessor = número + 1.', '9.999 + 1 = ?'], e: '9.999 + 1 = <b>10.000</b>.' },
  { id: 'mn4', t: 'm_num', d: 2, q: 'No número <b>30.405</b>, por que aparecem zeros?', o: ['Porque não há unidades de milhar nem dezenas', 'Porque o número é par', 'Porque não há centenas', 'Os zeros não têm função'], a: 0, h: ['Veja a posição de cada zero.', 'O zero guarda o lugar de uma ordem vazia.'], e: '30.405 = 3 dezenas de milhar, <b>0 unidades de milhar</b>, 4 centenas, <b>0 dezenas</b> e 5 unidades. Os zeros guardam os lugares vazios.' },

  // Operações
  { id: 'mo1', t: 'm_ops', d: 1, q: 'O que a igualdade <b>7 × 8 = 8 × 7</b> nos mostra?', o: ['A ordem dos fatores não altera o resultado', 'Multiplicar sempre dá número par', 'Multiplicar é o mesmo que somar', '7 e 8 são iguais'], a: 0, h: ['Compare os dois lados.', 'Os números trocaram de lugar e o resultado...'], e: 'Trocar a ordem dos fatores não muda o produto: os dois lados dão 56 (propriedade <b>comutativa</b>).' },
  { id: 'mo2', t: 'm_ops', d: 2, q: '25 balas serão divididas igualmente entre 4 crianças. Quantas balas cada uma recebe e quantas sobram?', o: ['6 cada e sobra 1', '5 cada e sobram 5', '6 cada e não sobra nada', '7 cada e sobram 3'], a: 0, h: ['Qual número vezes 4 chega mais perto de 25 sem passar?', '4 × 6 = 24.'], e: '4 × 6 = 24. Cada criança recebe <b>6</b> e sobra <b>1</b> (25 − 24).' },
  { id: 'mo3', t: 'm_ops', d: 3, q: 'Uma van leva <b>8 passageiros</b>. Quantas vans são necessárias para levar <b>30 pessoas</b>?', o: ['4', '3', '5', '6'], a: 0, h: ['Quantas pessoas 3 vans levam?', 'Se sobrar gente, precisa de mais uma van.'], e: '3 vans levam 24 pessoas; sobram 6, que precisam de mais uma van: <b>4 vans</b>.', w: { 1: '3 vans levam só 24 pessoas. As outras 6 ficariam de fora!' } },
  { id: 'mo4', t: 'm_ops', d: 2, q: 'Um álbum completo tem <b>400 figurinhas</b>. Léo já colou <b>245</b>. Quantas faltam?', o: ['155', '255', '645', '165'], a: 0, h: ['"Quanto falta" é subtração (ou completar).', '245 + ? = 400.'], e: '400 − 245 = <b>155</b>. Confira: 245 + 155 = 400.' },
  { id: 'mo5', t: 'm_ops', d: 1, q: 'Quanto é <b>46 × 10</b>?', o: ['460', '4.600', '56', '406'], a: 0, h: ['Multiplicar por 10 é acrescentar um zero.', '46 → 460.'], e: 'Multiplicando por 10, cada algarismo "sobe" uma ordem: <b>460</b>.' },
  { id: 'mo6', t: 'm_ops', d: 3, q: 'Um time marcou <b>o dobro</b> de gols do adversário. O adversário marcou 3 gols. Quantos gols foram marcados <b>no jogo todo</b>?', o: ['9', '6', '5', '12'], a: 0, h: ['Dobro de 3 = 2 × 3.', 'Depois some os gols dos dois times.'], e: 'O time marcou 2 × 3 = 6 gols. No jogo todo: 6 + 3 = <b>9 gols</b>.', w: { 1: '6 é só o que o time marcou. A pergunta pede o jogo todo.' } },

  // Sequências
  { id: 'ms1', t: 'm_seq', d: 1, q: 'Qual sequência é formada por <b>múltiplos de 5</b>?', o: ['5, 10, 15, 20, 25', '5, 6, 7, 8, 9', '1, 5, 10, 50, 100', '5, 11, 17, 23, 29'], a: 0, h: ['Múltiplos de 5 são a tabuada do 5.', 'Terminam em 0 ou 5.'], e: '<b>5, 10, 15, 20, 25</b> são 5×1, 5×2, 5×3, 5×4, 5×5.' },
  { id: 'ms2', t: 'm_seq', d: 2, q: 'Os múltiplos de 2 são os números:', o: ['pares', 'ímpares', 'terminados em 5', 'maiores que 100'], a: 0, h: ['Pense na tabuada do 2: 2, 4, 6, 8...', 'Como chamamos esses números?'], e: 'Todo múltiplo de 2 é <b>par</b> (termina em 0, 2, 4, 6 ou 8).' },

  // Localização
  { id: 'ml1', t: 'm_loc', d: 1, q: 'As linhas que formam o <b>canto</b> de uma folha de caderno são:', o: ['perpendiculares', 'paralelas', 'curvas', 'que nunca se encontram'], a: 0, h: ['No canto da folha, as linhas se encontram.', 'Elas formam um ângulo reto ("cantinho").'], e: 'No canto da folha as bordas se cruzam formando um ângulo reto: são <b>perpendiculares</b>.' },
  { id: 'ml2', t: 'm_loc', d: 2, q: 'Observe as retas. Como elas são?', fig: { t: 'lines', kind: 'perp' }, o: ['Perpendiculares', 'Paralelas', 'Não se cruzam', 'São curvas'], a: 0, h: ['As retas se cruzam?', 'O cruzamento forma um ângulo reto.'], e: 'As retas se cruzam formando ângulos retos: são <b>perpendiculares</b>.' },
  { id: 'ml3', t: 'm_loc', d: 2, q: 'Observe as retas. Como elas são?', fig: { t: 'lines', kind: 'par' }, o: ['Paralelas', 'Perpendiculares', 'Concorrentes', 'Formam um ângulo reto'], a: 0, h: ['Elas vão se encontrar em algum ponto?', 'Retas que nunca se encontram...'], e: 'As retas seguem lado a lado sem se encontrar: são <b>paralelas</b>.' },
  { id: 'ml4', t: 'm_loc', d: 2, q: 'Pedro está olhando para o <b>Norte</b>. Se ele <b>der meia-volta</b>, ficará de frente para o:', o: ['Sul', 'Leste', 'Oeste', 'Norte'], a: 0, h: ['Meia-volta é virar totalmente para trás.', 'O oposto do Norte é...'], e: 'Meia-volta leva ao sentido oposto. O oposto do Norte é o <b>Sul</b>.' },
  { id: 'ml5', t: 'm_loc', d: 3, q: 'Ana está olhando para o <b>Norte</b> e vira para a sua <b>direita</b>. Para onde ela fica olhando?', o: ['Leste', 'Oeste', 'Sul', 'Norte'], a: 0, h: ['No mapa, o Norte fica em cima.', 'À direita do Norte, no mapa, fica...'], e: 'No mapa, Norte em cima, Leste à direita. Olhando para o Norte e virando à direita, Ana olha para o <b>Leste</b>.' },
  { id: 'ml6', t: 'm_loc', d: 3, q: 'Observe as retas. Como elas são?', fig: { t: 'lines', kind: 'conc' }, o: ['Concorrentes, mas não perpendiculares', 'Paralelas', 'Perpendiculares', 'Nunca se cruzam'], a: 0, h: ['Elas se cruzam?', 'O ângulo do cruzamento é reto (90°) ou "torto"?'], e: 'Elas se cruzam, mas não formam ângulo reto: são <b>concorrentes</b>, e não perpendiculares.' },

  // Sólidos
  { id: 'mg1', t: 'm_solidos', d: 1, q: 'Quantas faces tem um <b>cubo</b>?', o: ['6', '8', '12', '4'], a: 0, h: ['Pense num dado.', 'Um dado tem números de 1 a 6, um em cada face.'], e: 'O cubo tem <b>6 faces</b> quadradas, como um dado.' },
  { id: 'mg2', t: 'm_solidos', d: 2, q: 'Quantas <b>arestas</b> tem um cubo?', o: ['12', '6', '8', '10'], a: 0, h: ['Aresta é a linha onde duas faces se encontram.', 'São 4 em cima, 4 embaixo e 4 nos lados.'], e: '4 arestas em cima + 4 embaixo + 4 verticais = <b>12 arestas</b>.' },
  { id: 'mg3', t: 'm_solidos', d: 2, q: 'Esta planificação forma qual sólido?', fig: { t: 'net', kind: 'cube' }, o: ['Cubo', 'Pirâmide de base quadrada', 'Prisma de base triangular', 'Cilindro'], a: 0, h: ['Conte as figuras e veja suas formas.', 'São 6 quadrados iguais.'], e: '6 quadrados iguais formam um <b>cubo</b>.' },
  { id: 'mg4', t: 'm_solidos', d: 2, q: 'Esta planificação forma qual sólido?', fig: { t: 'net', kind: 'prism3' }, o: ['Prisma de base triangular', 'Pirâmide de base triangular', 'Cubo', 'Cone'], a: 0, h: ['Há 2 triângulos e 3 retângulos.', 'Duas bases iguais = prisma.'], e: '2 triângulos (as bases) e 3 retângulos (as faces laterais) formam um <b>prisma de base triangular</b>.', w: { 1: 'A pirâmide tem só uma base, e as faces laterais são triângulos, não retângulos.' } },
  { id: 'mg5', t: 'm_solidos', d: 1, q: 'Uma caixa de sapatos tem a forma de:', o: ['bloco retangular (prisma)', 'pirâmide', 'cilindro', 'esfera'], a: 0, h: ['Ela tem faces planas retangulares.', 'Tem duas bases iguais: em cima e embaixo.'], e: 'A caixa de sapatos é um <b>bloco retangular</b>, um prisma de base retangular.' },
  { id: 'mg6', t: 'm_solidos', d: 1, q: 'As faces laterais de uma <b>pirâmide</b> são sempre:', o: ['triângulos', 'retângulos', 'círculos', 'quadrados'], a: 0, h: ['Elas se encontram num ponto lá em cima.', 'Que figura tem "bico"?'], e: 'As faces laterais da pirâmide são <b>triângulos</b> que se encontram num vértice.' },
  { id: 'mg7', t: 'm_solidos', d: 3, q: 'Quantos <b>vértices</b> tem uma pirâmide de base quadrada?', o: ['5', '4', '8', '6'], a: 0, h: ['A base quadrada tem 4 cantos.', 'Falta contar o "bico" lá em cima.'], e: '4 vértices na base + 1 no topo = <b>5 vértices</b>.' },
  { id: 'mg8', t: 'm_solidos', d: 1, q: 'Qual destes sólidos <b>rola</b> com facilidade?', o: ['Cilindro', 'Cubo', 'Pirâmide', 'Prisma triangular'], a: 0, h: ['Qual tem parte arredondada?', 'Pense numa lata.'], e: 'O <b>cilindro</b> tem uma superfície arredondada, por isso rola. Os outros só têm faces planas.' },
  { id: 'mg9', t: 'm_solidos', d: 3, q: 'Quantas faces tem um <b>prisma de base triangular</b>?', o: ['5', '3', '6', '9'], a: 0, h: ['Conte as bases: 2 triângulos.', 'Cada lado do triângulo tem uma face lateral retangular.'], e: '2 bases triangulares + 3 faces laterais = <b>5 faces</b>.' },
  { id: 'mg10', t: 'm_solidos', d: 2, q: 'Qual é a principal diferença entre um <b>prisma</b> e uma <b>pirâmide</b>?', o: ['O prisma tem duas bases iguais; a pirâmide tem uma base e faces triangulares que se encontram num ponto', 'O prisma rola e a pirâmide não', 'A pirâmide tem duas bases e o prisma uma', 'Não há diferença'], a: 0, h: ['Conte as bases de cada um.', 'Lembre das faces laterais.'], e: 'Prisma: <b>2 bases iguais</b> e faces laterais retangulares. Pirâmide: <b>1 base</b> e faces laterais triangulares.' },
  { id: 'mg11', t: 'm_solidos', d: 3, q: 'Esta planificação forma qual sólido?', fig: { t: 'net', kind: 'cyl' }, o: ['Cilindro', 'Cone', 'Prisma', 'Pirâmide'], a: 0, h: ['Há dois círculos e um retângulo.', 'Pense numa lata: tampa, fundo e a lateral "enrolada".'], e: 'Dois círculos (tampa e fundo) e um retângulo que se enrola formam o <b>cilindro</b>.' },

  // Medidas
  { id: 'mm1', t: 'm_medidas', d: 1, q: 'Qual instrumento usamos para medir a <b>massa</b> de uma pessoa?', o: ['Balança', 'Régua', 'Termômetro', 'Relógio'], a: 0, h: ['Massa é o que chamamos de "peso".', 'Onde subimos para nos pesar?'], e: 'Usamos a <b>balança</b>. Régua mede comprimento; termômetro, temperatura; relógio, tempo.' },
  { id: 'mm2', t: 'm_medidas', d: 1, q: 'Qual a medida mais adequada para a <b>altura de uma porta</b>?', o: ['2 metros', '2 centímetros', '20 metros', '2 quilômetros'], a: 0, h: ['Compare com a altura de um adulto.', 'Um adulto tem perto de 1 metro e 70.'], e: 'Uma porta é um pouco mais alta que um adulto: cerca de <b>2 metros</b>.' },
  { id: 'mm3', t: 'm_medidas', d: 1, q: 'Um pacote de arroz comum de supermercado tem:', o: ['5 quilogramas', '5 gramas', '500 quilogramas', '5 toneladas'], a: 0, h: ['5 gramas é o peso de uma bala.', 'Você consegue carregar o pacote.'], e: 'O pacote comum tem <b>5 kg</b>. 5 g seria levíssimo e 500 kg, pesado demais.' },
  { id: 'mm4', t: 'm_medidas', d: 2, q: 'O que pesa mais: <b>1 kg de feijão</b> ou <b>1 kg de algodão</b>?', o: ['Pesam o mesmo', 'O feijão', 'O algodão', 'Depende da embalagem'], a: 0, h: ['Leia com atenção: qual a massa de cada um?', 'Os dois têm 1 kg!'], e: 'Os dois têm <b>1 kg</b>, então pesam o mesmo. O algodão só ocupa mais espaço.' },
  { id: 'mm5', t: 'm_medidas', d: 1, q: 'Qual unidade é mais adequada para medir a <b>distância entre duas cidades</b>?', o: ['Quilômetro', 'Centímetro', 'Milímetro', 'Litro'], a: 0, h: ['A distância é muito grande.', 'Litro nem é medida de comprimento.'], e: 'Distâncias grandes são medidas em <b>quilômetros</b>.' },
  { id: 'mm6', t: 'm_medidas', d: 2, q: '<b>Meio quilo</b> é igual a:', o: ['500 gramas', '50 gramas', '5.000 gramas', '250 gramas'], a: 0, h: ['1 kg = 1.000 g.', 'Meio = metade.'], e: '1.000 g ÷ 2 = <b>500 g</b>.' },
  { id: 'mm7', t: 'm_medidas', d: 1, q: 'Para medir o remédio numa colher, a unidade mais adequada é:', o: ['mililitro (mL)', 'litro (L)', 'quilograma (kg)', 'metro (m)'], a: 0, h: ['É uma quantidade de líquido bem pequena.', 'Medidas de líquido: L e mL.'], e: 'Quantidades pequenas de líquido são medidas em <b>mililitros</b>.' },

  // Tempo
  { id: 'mt1', t: 'm_tempo', d: 1, q: 'Quantos minutos tem <b>1 hora e meia</b>?', o: ['90', '130', '150', '60'], a: 0, h: ['1 hora = 60 minutos.', 'Meia hora = 30 minutos.'], e: '60 + 30 = <b>90 minutos</b>.', w: { 1: '1h30 não é 130 minutos! 1 hora tem 60 minutos, e não 100.' } },
  { id: 'mt2', t: 'm_tempo', d: 2, q: 'Se hoje é <b>segunda-feira</b>, que dia da semana será daqui a <b>4 dias</b>?', o: ['Sexta-feira', 'Quinta-feira', 'Sábado', 'Quarta-feira'], a: 0, h: ['Conte: terça (1), quarta (2)...', '...quinta (3), sexta (4).'], e: 'Terça (1), quarta (2), quinta (3), <b>sexta (4)</b>.' },
  { id: 'mt3', t: 'm_tempo', d: 2, q: 'O relógio digital marca <b>16:45</b>. Outra forma de dizer esse horário é:', o: ['quinze para as cinco da tarde', 'quinze para as quatro da tarde', 'quatro e quinze da tarde', 'cinco e quarenta e cinco da tarde'], a: 0, h: ['16h = 4 horas da tarde.', 'Faltam 15 minutos para as 17h.'], e: '16:45 são 4h45 da tarde; faltam 15 minutos para as 5: <b>quinze para as cinco</b>.' },
  { id: 'mt4', t: 'm_tempo', d: 1, q: 'Quantos dias têm <b>2 semanas</b>?', o: ['14', '12', '10', '15'], a: 0, h: ['1 semana = 7 dias.', '7 + 7 = ?'], e: '2 × 7 = <b>14 dias</b>.' },
  { id: 'mt5', t: 'm_tempo', d: 2, q: 'Qual destas datas vem <b>primeiro</b> no calendário?', o: ['30 de abril', '3 de maio', '15 de maio', '1º de junho'], a: 0, h: ['Compare primeiro os meses.', 'Abril vem antes de maio.'], e: 'Abril vem antes de maio e junho, então <b>30 de abril</b> é a primeira.' },
  { id: 'mt6', t: 'm_tempo', d: 1, q: 'Quantas horas tem <b>um dia</b> completo?', o: ['24', '12', '60', '7'], a: 0, h: ['O ponteiro das horas dá duas voltas no relógio.', '12 + 12.'], e: 'Um dia tem <b>24 horas</b>.' },

  /* ======================= PORTUGUÊS ======================= */
  // Classes de palavras (revisão complementar)
  { id: 'pg1', t: 'p_gram', d: 1, q: 'Na frase "Uma árvore <b>enorme</b> fazia sombra no quintal", a palavra <b>enorme</b> é:', o: ['adjetivo', 'substantivo', 'pronome', 'verbo'], a: 0, h: ['Pergunte: como é a árvore?', 'Palavra que dá característica ao substantivo é...'], e: '"Enorme" diz como é a árvore: é um <b>adjetivo</b>. Não é pronome, porque não substitui nenhum nome.', w: { 2: 'Pronome substitui ou acompanha um nome (ele, ela, meu...). "Enorme" dá uma característica.' } },
  { id: 'pg2', t: 'p_gram', d: 1, q: 'Na frase "O goleiro defendeu o pênalti", qual palavra é <b>verbo</b>?', o: ['defendeu', 'goleiro', 'o', 'pênalti'], a: 0, h: ['Verbo indica ação.', 'O que o goleiro fez?'], e: '"Defendeu" indica a ação do goleiro: é o <b>verbo</b>.' },
  { id: 'pg3', t: 'p_gram', d: 1, q: '"Lucas perdeu a bola. <b>Ele</b> ficou triste." A palavra <b>Ele</b> está no lugar de:', o: ['Lucas', 'a bola', 'triste', 'perdeu'], a: 0, h: ['Quem ficou triste?', 'O pronome substitui um nome.'], e: '"Ele" é um pronome que substitui <b>Lucas</b>, evitando repetir o nome.' },
  { id: 'pg4', t: 'p_gram', d: 1, q: 'Qual destas palavras é um <b>substantivo</b>?', o: ['alegria', 'alegre', 'alegrou', 'nós'], a: 0, h: ['Substantivo dá nome a coisas, seres e sentimentos.', 'Qual delas é o nome de um sentimento?'], e: '"Alegria" é o nome de um sentimento: <b>substantivo</b>. "Alegre" é adjetivo, "alegrou" é verbo e "nós" é pronome.' },
  { id: 'pg5', t: 'p_gram', d: 1, q: 'Em "<b>Os</b> meninos encontraram <b>um</b> baú antigo", as palavras destacadas são:', o: ['artigos', 'pronomes', 'adjetivos', 'verbos'], a: 0, h: ['Elas vêm antes de substantivos.', 'o, a, os, as, um, uma...'], e: '"Os" e "um" vêm antes dos substantivos "meninos" e "baú": são <b>artigos</b>.' },
  { id: 'pg6', t: 'p_gram', d: 2, q: 'Em qual alternativa há um <b>adjetivo</b> caracterizando a palavra "cachorro"?', o: ['o cachorro peludo', 'o cachorro latiu', 'meu cachorro', 'um cachorro'], a: 0, h: ['Procure a palavra que diz como é o cachorro.', '"Latiu" é ação; "meu" indica de quem é.'], e: '"Peludo" diz como é o cachorro: <b>adjetivo</b>. "Meu" é pronome possessivo e "latiu" é verbo.', w: { 2: '"Meu" indica a quem pertence: é pronome possessivo, não adjetivo.' } },
  { id: 'pg7', t: 'p_gram', d: 2, q: 'Em "<b>Minha</b> bicicleta é azul", a palavra <b>Minha</b> é:', o: ['pronome', 'artigo', 'adjetivo', 'substantivo'], a: 0, h: ['Ela indica a quem pertence a bicicleta.', 'meu, minha, seu, nosso...'], e: '"Minha" indica posse (a quem pertence): é um <b>pronome possessivo</b>.' },
  { id: 'pg8', t: 'p_gram', d: 2, q: 'Qual trecho usa um <b>pronome</b> para evitar repetição?', o: ['Pedro chegou cedo. Ele trouxe a bola.', 'Pedro chegou cedo. Pedro trouxe a bola.', 'Pedro chegou cedo e a bola chegou.', 'Pedro, a bola e o apito chegaram.'], a: 0, h: ['Procure uma palavra que substitua "Pedro".', 'Eu, tu, ele, ela...'], e: 'Em "Ele trouxe a bola", o pronome <b>ele</b> substitui "Pedro" e evita a repetição.' },
  { id: 'pg9', t: 'p_gram', d: 3, q: 'Em qual frase a palavra <b>pulo</b> é um <b>substantivo</b>?', o: ['O pulo do sapo foi alto.', 'Eu pulo corda todo dia.', 'Eu pulo de alegria.', 'Sempre pulo a poça.'], a: 0, h: ['Em três frases, "pulo" é uma ação de "eu".', 'Em qual delas aparece "o" antes de "pulo"?'], e: 'Em "<b>O pulo</b> do sapo", a palavra vem depois do artigo e dá nome a algo: substantivo. Nas outras, "eu pulo" é verbo.' },
  { id: 'pg10', t: 'p_gram', d: 2, q: 'Quais palavras de "O pirata esperto escondeu o tesouro brilhante" são <b>adjetivos</b>?', o: ['esperto e brilhante', 'pirata e tesouro', 'escondeu e esperto', 'o e brilhante'], a: 0, h: ['Como é o pirata? Como é o tesouro?', 'As respostas são os adjetivos.'], e: 'Pirata <b>esperto</b>, tesouro <b>brilhante</b>: são os adjetivos. "Pirata" e "tesouro" são substantivos.' },
  { id: 'pg11', t: 'p_gram', d: 2, q: 'Em qual alternativa <b>todas</b> as palavras são verbos?', o: ['correr, chover, ser', 'corrida, chuva, ser', 'correr, chuva, feliz', 'pular, alto, ser'], a: 0, h: ['Verbos podem ser ação, estado ou fenômeno da natureza.', 'Tente colocar "eu vou ___" antes de cada uma.'], e: '<b>Correr</b> (ação), <b>chover</b> (fenômeno) e <b>ser</b> (estado) são verbos. "Chuva" e "corrida" são substantivos.' },
  { id: 'pg12', t: 'p_gram', d: 1, q: 'Em qual frase há um <b>artigo indefinido</b>?', o: ['Ganhei uma figurinha rara.', 'Ganhei a figurinha rara.', 'Ganhei as figurinhas raras.', 'Ganhei o álbum novo.'], a: 0, h: ['Artigos indefinidos: um, uma, uns, umas.', 'Eles indicam algo "qualquer".'], e: '"<b>Uma</b>" é artigo indefinido. "O, a, os, as" são definidos.' },
  { id: 'pg13', t: 'p_gram', d: 1, q: 'Na frase "A professora simpática explicou a lição", qual palavra caracteriza "professora"?', o: ['simpática', 'explicou', 'lição', 'A'], a: 0, h: ['Como é a professora?', 'A palavra que dá característica é o adjetivo.'], e: 'Professora <b>simpática</b>: o adjetivo diz como ela é.' },
  { id: 'pg14', t: 'p_gram', d: 2, q: 'Qual palavra completa a frase com um <b>adjetivo</b>? "O castelo era muito ______."', o: ['assustador', 'assustou', 'susto', 'ele'], a: 0, h: ['Como era o castelo?', '"Susto" é nome; "assustou" é ação.'], e: '"<b>Assustador</b>" diz como era o castelo: adjetivo. "Susto" é substantivo e "assustou" é verbo.' },
  { id: 'pg15', t: 'p_gram', d: 1, q: 'Qual palavra é um <b>substantivo próprio</b>?', o: ['Curitiba', 'cidade', 'bonita', 'morar'], a: 0, h: ['Substantivo próprio é um nome específico.', 'Ele começa com letra maiúscula.'], e: '<b>Curitiba</b> é o nome de uma cidade específica: substantivo próprio. "Cidade" é substantivo comum.' },
  { id: 'pg16', t: 'p_gram', d: 2, q: 'Em "Amanhã eu <b>jogarei</b> futebol", o verbo está no:', o: ['futuro', 'passado', 'presente', 'não é verbo'], a: 0, h: ['A palavra "amanhã" ajuda.', 'A ação ainda vai acontecer.'], e: '"Jogarei" indica algo que ainda vai acontecer: <b>futuro</b>.' },
  { id: 'pg17', t: 'p_gram', d: 1, q: 'Qual palavra <b>não</b> é pronome?', o: ['mesa', 'ele', 'nós', 'minha'], a: 0, h: ['Três delas substituem ou acompanham nomes.', 'Uma delas é o nome de um objeto.'], e: '"<b>Mesa</b>" é substantivo (nome de objeto). "Ele", "nós" e "minha" são pronomes.' },
  { id: 'pg18', t: 'p_gram', d: 2, q: 'Complete corretamente: "As bolas ______ estavam no armário."', o: ['novas', 'nova', 'novo', 'novos'], a: 0, h: ['O adjetivo concorda com o substantivo.', '"As bolas": feminino e plural.'], e: '"Bolas" é feminino e plural, então o adjetivo fica <b>novas</b>.' },
  { id: 'pg19', t: 'p_gram', d: 3, q: 'Em "<b>Nós</b> vencemos o campeonato e <b>nossa</b> escola comemorou", as palavras destacadas são:', o: ['pronomes', 'artigos', 'adjetivos', 'substantivos'], a: 0, h: ['"Nós" indica as pessoas que falam.', '"Nossa" indica a quem pertence a escola.'], e: '"Nós" é pronome pessoal e "nossa" é pronome possessivo: os dois são <b>pronomes</b>.' },
  { id: 'pg20', t: 'p_gram', d: 2, q: 'Na frase "Ontem choveu muito em Curitiba", a palavra <b>choveu</b> é:', o: ['verbo que indica fenômeno da natureza', 'substantivo', 'adjetivo', 'pronome'], a: 0, h: ['Verbos podem indicar fenômenos da natureza.', 'Chover, ventar, nevar...'], e: '"Choveu" é <b>verbo</b>: indica um fenômeno da natureza e está no passado.' },

  // Pontuação
  { id: 'pp1', t: 'p_pont', d: 1, q: 'Qual sinal completa a frase: "Você viu meu caderno__"', o: ['?', '.', '!', ','], a: 0, h: ['A frase pergunta algo.', 'Perguntas terminam com...'], e: 'É uma pergunta, então termina com <b>ponto de interrogação (?)</b>.' },
  { id: 'pp2', t: 'p_pont', d: 1, q: 'Qual sinal completa melhor: "Que susto você me deu__"', o: ['!', '?', ',', ':'], a: 0, h: ['A frase mostra uma emoção forte.', 'Surpresa e susto pedem...'], e: 'A frase expressa emoção (susto): <b>ponto de exclamação (!)</b>.' },
  { id: 'pp3', t: 'p_pont', d: 2, q: 'Qual frase está pontuada corretamente?', o: ['Comprei pão, leite, queijo e frutas.', 'Comprei, pão leite queijo e frutas.', 'Comprei pão leite, queijo, e, frutas.', 'Comprei pão leite queijo e frutas,'], a: 0, h: ['A vírgula separa itens de uma lista.', 'Antes do "e" final da lista, normalmente não há vírgula.'], e: 'Na lista, separamos os itens com vírgula e usamos "e" antes do último: <b>pão, leite, queijo e frutas.</b>' },
  { id: 'pp4', t: 'p_pont', d: 1, q: 'Em um diálogo, o <b>travessão (—)</b> serve para:', o: ['indicar a fala de um personagem', 'terminar uma pergunta', 'separar itens de uma lista', 'mostrar o título'], a: 0, h: ['Ele aparece no começo da fala.', 'Pense no discurso direto.'], e: 'O travessão indica a <b>fala do personagem</b>.' },
  { id: 'pp5', t: 'p_pont', d: 2, q: 'Em "A mãe avisou<b>:</b> — Hora de dormir!", os <b>dois-pontos</b> foram usados para:', o: ['anunciar a fala da mãe', 'separar itens de uma lista', 'fazer uma pergunta', 'mostrar surpresa'], a: 0, h: ['O que vem depois dos dois-pontos?', 'Logo depois vem o travessão.'], e: 'Os dois-pontos <b>anunciam a fala</b> que vem a seguir.' },
  { id: 'pp6', t: 'p_pont', d: 2, q: 'Em "Abri a porta devagar e lá dentro estava<b>...</b>", as reticências indicam:', o: ['suspense, ideia não terminada', 'uma pergunta', 'o fim de uma lista', 'a fala de um personagem'], a: 0, h: ['A frase fica "no ar".', 'O leitor fica curioso.'], e: 'As reticências criam <b>suspense</b>: a ideia não foi terminada.' },
  { id: 'pp7', t: 'p_pont', d: 1, q: 'Qual trecho está escrito corretamente?', o: ['Hoje é sábado. Vamos ao parque?', 'hoje é sábado. vamos ao parque?', 'Hoje é sábado vamos ao parque.', 'hoje é sábado, Vamos ao parque'], a: 0, h: ['Frases começam com letra maiúscula.', 'E terminam com um sinal de pontuação.'], e: 'Cada frase começa com <b>maiúscula</b> e termina com <b>pontuação</b>: "Hoje é sábado. Vamos ao parque?"' },

  // Sílabas
  { id: 'psl1', t: 'p_silabas', d: 1, q: 'Qual palavra tem <b>3 sílabas</b> (trissílaba)?', o: ['sapato', 'sol', 'bola', 'borboleta'], a: 0, h: ['Bata uma palma para cada sílaba.', 'sa-pa-to...'], e: '<b>sa-pa-to</b> tem 3 sílabas. Sol (1), bo-la (2), bor-bo-le-ta (4).' },
  { id: 'psl2', t: 'p_silabas', d: 2, q: 'Qual é a separação correta de <b>pássaro</b>?', o: ['pás-sa-ro', 'pá-ssa-ro', 'pass-a-ro', 'pá-ss-a-ro'], a: 0, h: ['Lembre da regra do SS.', 'O SS se separa: um S em cada sílaba.'], e: 'O SS se separa: <b>pás-sa-ro</b>.' },
  { id: 'psl3', t: 'p_silabas', d: 1, q: 'Quantas sílabas tem a palavra <b>chocolate</b>?', o: ['4', '3', '5', '2'], a: 0, h: ['O CH não se separa.', 'cho-co-...'], e: '<b>cho-co-la-te</b>: 4 sílabas.' },
  { id: 'psl4', t: 'p_silabas', d: 1, q: 'Qual palavra é <b>monossílaba</b> (1 sílaba)?', o: ['pão', 'casa', 'janela', 'telefone'], a: 0, h: ['Monossílaba = uma sílaba só.', 'Fale cada palavra batendo palmas.'], e: '<b>Pão</b> se fala de uma vez só: monossílaba.' },
  { id: 'psl5', t: 'p_silabas', d: 2, q: 'Qual palavra é <b>polissílaba</b> (4 ou mais sílabas)?', o: ['elefante', 'gato', 'mesa', 'pipoca'], a: 0, h: ['Conte as sílabas de cada uma.', 'e-le-fan-te...'], e: '<b>e-le-fan-te</b> tem 4 sílabas: polissílaba. Pi-po-ca tem 3.' },
  { id: 'psl6', t: 'p_silabas', d: 3, q: 'Qual é a separação correta de <b>guerreiro</b>?', o: ['guer-rei-ro', 'gu-er-rei-ro', 'guerr-ei-ro', 'gue-rrei-ro'], a: 0, h: ['GU não se separa.', 'RR se separa.'], e: 'GU fica junto e RR se separa: <b>guer-rei-ro</b>.' },

  // Sentido das palavras
  { id: 'pc1', t: 'p_contexto', d: 1, q: '"Depois do treino, o menino ficou <b>exausto</b> e dormiu no sofá." <b>Exausto</b> significa:', o: ['muito cansado', 'muito feliz', 'com fome', 'atrasado'], a: 0, h: ['O que acontece depois de um treino puxado?', 'Ele dormiu logo...'], e: 'A pista "dormiu no sofá" depois do treino mostra que exausto = <b>muito cansado</b>.' },
  { id: 'pc2', t: 'p_contexto', d: 1, q: 'Qual é um <b>sinônimo</b> (sentido parecido) de <b>contente</b>?', o: ['alegre', 'triste', 'bravo', 'cansado'], a: 0, h: ['Sinônimo tem sentido parecido.', 'Quem está contente está...'], e: 'Contente e <b>alegre</b> têm sentido parecido: são sinônimos.' },
  { id: 'pc3', t: 'p_contexto', d: 1, q: '"A caverna era tão <b>escura</b> que ninguém enxergava nada." Qual palavra tem sentido <b>oposto</b> a escura?', o: ['clara', 'sombria', 'fria', 'funda'], a: 0, h: ['Oposto = antônimo.', '"Sombria" é parecida com escura.'], e: 'O antônimo de escura é <b>clara</b>.' },
  { id: 'pc4', t: 'p_contexto', d: 2, q: 'Em "Ele chupou uma <b>manga</b> bem madura", a palavra manga significa:', o: ['uma fruta', 'parte da camisa', 'um lugar', 'um animal'], a: 0, h: ['O que se chupa e fica maduro?', 'A palavra tem mais de um sentido.'], e: 'Pelas pistas "chupou" e "madura", manga é <b>a fruta</b>.' },
  { id: 'pc5', t: 'p_contexto', d: 2, q: '"O time adversário era <b>formidável</b>: quase ninguém conseguia vencê-lo." Formidável quer dizer:', o: ['excelente, muito forte', 'fraco', 'engraçado', 'pequeno'], a: 0, h: ['Quase ninguém vencia esse time.', 'Então ele era...'], e: 'Se quase ninguém o vencia, o time era <b>excelente, muito forte</b>.' },
  { id: 'pc6', t: 'p_contexto', d: 2, q: 'Qual palavra pode substituir <b>velozmente</b> em "O cavalo correu velozmente" sem mudar o sentido?', o: ['rapidamente', 'devagar', 'tristemente', 'calmamente'], a: 0, h: ['Veloz = rápido.', 'Procure a palavra com sentido parecido.'], e: 'Velozmente = <b>rapidamente</b>. "Devagar" é o contrário.' },
  { id: 'pc7', t: 'p_contexto', d: 3, q: '"No jogo de domingo, o Leo deu um <b>banho de bola</b>." A expressão significa que ele:', o: ['jogou muito bem', 'tomou banho depois do jogo', 'molhou a bola', 'perdeu o jogo'], a: 0, h: ['Não é para entender ao pé da letra.', 'É uma expressão do futebol.'], e: '"Dar um banho de bola" é uma expressão que significa <b>jogar muito bem</b>.' },
  { id: 'pc8', t: 'p_contexto', d: 1, q: 'Qual é o <b>antônimo</b> de <b>antigo</b>?', o: ['novo', 'velho', 'usado', 'gasto'], a: 0, h: ['Antônimo = contrário.', '"Velho" tem sentido parecido com antigo.'], e: 'O contrário de antigo é <b>novo</b> (ou moderno).' },

  // Discurso direto e indireto
  { id: 'pd1', t: 'p_discurso', d: 2, q: 'Como fica "<b>— Eu estou com fome — disse Ana.</b>" no discurso indireto?', o: ['Ana disse que estava com fome.', 'Ana disse: eu estou com fome.', '— Ana está com fome.', 'Ana disse que eu estou com fome.'], a: 0, h: ['No indireto, o narrador conta, usando "que".', '"Eu estou" vira "ela estava".'], e: 'O narrador conta a fala: "Ana disse <b>que estava</b> com fome." Mudou "eu estou" para "estava".', w: { 3: 'Faltou ajustar: no indireto, "eu estou" vira "(ela) estava".' } },
  { id: 'pd2', t: 'p_discurso', d: 1, q: '"O professor perguntou se todos tinham feito a tarefa." Essa frase está em discurso:', o: ['indireto', 'direto', 'teatral', 'poético'], a: 0, h: ['Há travessão ou aspas?', 'O narrador está contando a pergunta.'], e: 'O narrador conta a pergunta, usando "se", sem travessão: <b>discurso indireto</b>.' },
  { id: 'pd3', t: 'p_discurso', d: 2, q: 'Como fica "<b>Lucas disse que ia jogar bola.</b>" no discurso direto?', o: ['— Vou jogar bola — disse Lucas.', '— Lucas vai jogar bola.', 'Lucas disse: ia jogar bola.', 'Lucas disse que vou jogar bola.'], a: 0, h: ['No direto, o personagem fala com as próprias palavras.', '"Ia jogar" vira "vou jogar".'], e: 'Lucas fala por ele mesmo, com travessão: "<b>— Vou jogar bola — disse Lucas.</b>"' },
  { id: 'pd4', t: 'p_discurso', d: 1, q: 'Em "— Cuidado! — <b>gritou</b> a mãe.", a palavra gritou indica:', o: ['como a mãe falou', 'o nome da mãe', 'o lugar da cena', 'o que a mãe pensou'], a: 0, h: ['É um verbo de dizer.', 'Ele mostra o jeito da fala.'], e: '"Gritou" é um <b>verbo de dizer</b>: mostra como a mãe falou.' },
  { id: 'pd5', t: 'p_discurso', d: 3, q: '"Marina perguntou ao amigo: — Você vai à festa?" No discurso indireto fica:', o: ['Marina perguntou ao amigo se ele iria à festa.', 'Marina perguntou ao amigo que você vai à festa.', '— Marina, você vai à festa?', 'Marina vai à festa com o amigo.'], a: 0, h: ['Perguntas no indireto usam "se".', '"Você vai" vira "ele iria".'], e: 'No indireto, a pergunta vira "<b>se ele iria</b> à festa": muda a pessoa (você → ele) e o tempo do verbo.' },
  { id: 'pd6', t: 'p_discurso', d: 2, q: 'Qual palavra costuma ligar o verbo de dizer à fala no <b>discurso indireto</b>?', o: ['que', 'travessão', 'aspas', 'dois-pontos'], a: 0, h: ['"Ana disse ___ estava com fome."', 'Travessão e aspas são do direto.'], e: 'No discurso indireto usamos "<b>que</b>" (ou "se", nas perguntas).' },

  // Produção textual
  { id: 'ppr1', t: 'p_producao', d: 2, q: 'Qual é a ordem certa dos fatos?<br>(1) O cachorro fugiu pelo portão.<br>(2) Todos procuraram pela vizinhança.<br>(3) Finalmente, encontraram o cachorro na praça.<br>(4) Alguém deixou o portão aberto.', o: ['4, 1, 2, 3', '1, 2, 3, 4', '4, 2, 1, 3', '1, 4, 3, 2'], a: 0, h: ['O que precisou acontecer para o cachorro fugir?', 'O "finalmente" indica o fim.'], e: 'Primeiro o portão ficou aberto (4), o cachorro fugiu (1), procuraram (2) e o encontraram (3): <b>4, 1, 2, 3</b>.' },
  { id: 'ppr2', t: 'p_producao', d: 1, q: 'Em uma narrativa, o <b>conflito</b> é:', o: ['o problema que os personagens precisam resolver', 'o título da história', 'a lista de personagens', 'a última frase'], a: 0, h: ['É o que deixa a história emocionante.', 'Sem ele, nada acontece.'], e: 'O conflito é <b>o problema</b> que movimenta a história.' },
  { id: 'ppr3', t: 'p_producao', d: 1, q: 'Qual seria o melhor <b>início</b> para uma história de mistério?', o: ['Numa noite chuvosa, um barulho estranho veio do porão da velha casa.', 'E todos viveram felizes para sempre.', 'Depois de tudo resolvido, todos foram dormir.', 'Fim.'], a: 0, h: ['O início apresenta o lugar e cria curiosidade.', 'As outras parecem finais.'], e: 'O início apresenta o cenário e desperta curiosidade: "<b>Numa noite chuvosa, um barulho estranho...</b>"' },
  { id: 'ppr4', t: 'p_producao', d: 2, q: 'Qual frase reescreve melhor "O gato subiu no muro. O gato miou. O gato pulou."?', o: ['O gato subiu no muro, miou e pulou.', 'O gato, o gato e o gato.', 'Subiu, miou, pulou o gato o muro.', 'O gato subiu. Miou o gato. Pulou o gato.'], a: 0, h: ['Evite repetir "o gato".', 'Junte as ações com vírgula e "e".'], e: '"<b>O gato subiu no muro, miou e pulou.</b>" — sem repetições e na ordem certa.' },
  { id: 'ppr5', t: 'p_producao', d: 1, q: 'Para que servem os <b>parágrafos</b> em um texto?', o: ['Para organizar o texto em partes ou ideias', 'Para deixar a letra maior', 'Para terminar uma pergunta', 'Para indicar um grito'], a: 0, h: ['Pense numa história longa.', 'Cada momento novo começa com recuo.'], e: 'Os parágrafos <b>organizam o texto</b> em partes, facilitando a leitura.' },
  { id: 'ppr6', t: 'p_producao', d: 1, q: 'O <b>desfecho</b> de uma história é:', o: ['como ela termina e o problema se resolve', 'a apresentação dos personagens', 'o momento em que surge o problema', 'o título'], a: 0, h: ['Des-fecho: fecha a história.', 'Vem no final.'], e: 'O desfecho é <b>o final</b>, quando o conflito se resolve.' },
  { id: 'ppr7', t: 'p_producao', d: 2, q: 'Qual expressão indica que algo <b>inesperado</b> aconteceu?', o: ['De repente', 'No final', 'Primeiro', 'Por isso'], a: 0, h: ['Surpresa!', 'Algo que acontece sem aviso.'], e: '"<b>De repente</b>" indica algo inesperado.' },
  { id: 'ppr8', t: 'p_producao', d: 3, q: 'Qual é a melhor revisão de "ontem eu fui no parque e eu vi um passarinho e eu dei comida"?', o: ['Ontem, fui ao parque, vi um passarinho e dei comida a ele.', 'ontem eu fui no parque, e eu vi um passarinho, e eu dei comida.', 'Ontem eu fui no parque e eu vi um passarinho e eu dei comida.', 'Ontem. Fui. Parque. Passarinho. Comida.'], a: 0, h: ['Olhe a letra maiúscula e a repetição de "e eu".', 'Junte as ações com vírgulas.'], e: 'A melhor versão começa com maiúscula, evita repetir "e eu" e organiza as ações com vírgulas: "<b>Ontem, fui ao parque, vi um passarinho e dei comida a ele.</b>"' },

  // Imagens (sem texto base)
  { id: 'pi1', t: 'p_imagem', d: 1, q: 'Numa história em quadrinhos, o balão com o contorno em <b>pontas</b> (como uma estrela) geralmente indica:', o: ['grito ou susto', 'pensamento', 'fala baixinha', 'o nome do personagem'], a: 0, h: ['As pontas mostram força.', 'O balão de nuvem é o pensamento.'], e: 'O balão com pontas indica <b>grito ou susto</b>.' },

  // Interpretação (frases curtas)
  { id: 'pin1', t: 'p_interp', d: 1, q: '"Quando o juiz apitou o fim do jogo, a torcida azul cantava e pulava, enquanto a torcida vermelha ficou em silêncio." Qual time provavelmente venceu?', o: ['O time azul', 'O time vermelho', 'Empataram', 'O juiz'], a: 0, h: ['Quem estava comemorando?', 'Silêncio no estádio indica tristeza.'], e: 'Pistas: a torcida azul comemorava e a vermelha ficou em silêncio. Provavelmente o <b>time azul</b> venceu.' },
  { id: 'pin2', t: 'p_interp', d: 2, q: '"Tomás vestiu o casaco, as luvas e o gorro antes de sair. Mesmo assim, chegou à escola com o nariz vermelho." Como provavelmente estava o tempo?', o: ['Muito frio', 'Muito quente', 'Chuvoso e abafado', 'Agradável'], a: 0, h: ['Casaco, luvas, gorro...', 'Nariz vermelho de...'], e: 'Roupas de inverno e nariz vermelho são pistas de que estava <b>muito frio</b>.' },

  /* ---------- Questões dos textos ---------- */
  { id: 't1a', txt: 'T1', t: 'p_interp', d: 1, q: 'Onde Caio encontrou o mapa?', o: ['No sótão da casa do avô', 'No quintal, perto da figueira', 'Dentro de uma latinha', 'Na escola'], a: 0, h: ['Volte ao primeiro parágrafo.', 'A informação está escrita.'], e: 'O texto diz: "<b>No sótão da casa do avô</b>, Caio encontrou um papel amarelado".' },
  { id: 't1b', txt: 'T1', t: 'p_interp', d: 1, q: 'Quem desenhou o mapa?', o: ['O avô, quando era menino', 'Caio', 'Um pirata', 'O pai de Caio'], a: 0, h: ['Releia a resposta do avô.', 'O avô sorriu e respondeu que...'], e: 'O avô contou que <b>ele mesmo tinha desenhado o mapa quando era menino</b>.' },
  { id: 't1c', txt: 'T1', t: 'p_interp', d: 2, q: 'A expressão "com os olhos brilhando" mostra que Caio estava:', o: ['animado e curioso', 'com sono', 'com medo', 'chorando de tristeza'], a: 0, h: ['Ele achou que era um mapa do tesouro!', 'Como ficamos quando algo nos empolga?'], e: '"Olhos brilhando" indica <b>empolgação e curiosidade</b> com a descoberta.' },
  { id: 't1d', txt: 'T1', t: 'p_interp', d: 1, q: 'O que havia dentro da latinha?', o: ['Bolinhas de gude e um bilhete', 'Moedas de ouro', 'Um novo mapa', 'Uma chave'], a: 0, h: ['Releia o quarto parágrafo.', 'Procure "Dentro dela havia..."'], e: 'O texto diz: "Dentro dela havia <b>bolinhas de gude coloridas e um bilhete</b>".' },
  { id: 't1e', txt: 'T1', t: 'p_discurso', d: 2, q: 'O trecho "O avô sorriu e respondeu que ele mesmo tinha desenhado aquele mapa" está em discurso:', o: ['indireto, pois o narrador conta o que o avô disse', 'direto, pois tem travessão', 'direto, pois o avô fala em primeira pessoa', 'teatral, pois tem rubricas'], a: 0, h: ['Há travessão nesse trecho?', 'Repare no "respondeu que...".'], e: 'Não há travessão: o narrador conta a fala usando "que". É <b>discurso indireto</b>.' },
  { id: 't1f', txt: 'T1', t: 'p_contexto', d: 2, q: '"Avô e neto jogaram bolinha de gude <b>até o sol se pôr</b>." Isso quer dizer que jogaram:', o: ['até o fim da tarde', 'até o meio-dia', 'a manhã inteira', 'só um pouquinho'], a: 0, h: ['Quando o sol "se põe"?', 'É quando começa a anoitecer.'], e: 'O sol se põe no fim da tarde: eles jogaram <b>até anoitecer</b>.' },
  { id: 't1g', txt: 'T1', t: 'p_producao', d: 3, q: 'Qual é a ordem dos acontecimentos no texto?', o: ['Encontra o mapa → pergunta ao avô → cava no quintal → joga com o avô', 'Cava no quintal → encontra o mapa → joga com o avô → pergunta ao avô', 'Joga com o avô → encontra o mapa → cava no quintal → pergunta ao avô', 'Pergunta ao avô → joga com o avô → encontra o mapa → cava no quintal'], a: 0, h: ['O que acontece primeiro: achar o mapa ou cavar?', 'O texto termina com a brincadeira.'], e: 'Caio <b>encontra o mapa, pergunta ao avô, cava no quintal e depois joga com o avô</b>.' },

  { id: 't2a', txt: 'T2', t: 'p_interp', d: 1, q: 'Qual é a principal finalidade desse texto?', o: ['Informar um acontecimento', 'Contar uma história inventada', 'Ensinar uma receita', 'Convencer a comprar verduras'], a: 0, h: ['Que gênero é esse texto?', 'Notícias contam fatos.'], e: 'É uma <b>notícia</b>: sua finalidade é informar um fato que aconteceu.' },
  { id: 't2b', txt: 'T2', t: 'p_interp', d: 1, q: 'Quando os alunos plantaram a horta?', o: ['Em agosto', 'Na última sexta-feira', 'No próximo semestre', 'Em dezembro'], a: 0, h: ['Cuidado: plantar e colher são momentos diferentes.', 'Releia o primeiro parágrafo.'], e: 'A horta foi plantada <b>em agosto</b>. Na sexta-feira foi a colheita.', w: { 1: 'Na sexta-feira eles COLHERAM. A pergunta é sobre quando PLANTARAM.' } },
  { id: 't2c', txt: 'T2', t: 'p_interp', d: 1, q: 'O que foi feito com as verduras colhidas?', o: ['Foram usadas na merenda da escola', 'Foram vendidas na feira', 'Foram levadas para casa', 'Foram jogadas fora'], a: 0, h: ['Releia o último parágrafo.', 'A informação está escrita.'], e: 'O texto diz: "As verduras colhidas foram <b>usadas na merenda</b> da escola."' },
  { id: 't2d', txt: 'T2', t: 'p_contexto', d: 2, q: 'No texto, "cada aluno ficou <b>encarregado</b> de regar os canteiros" significa que cada aluno ficou:', o: ['responsável por essa tarefa', 'cansado dessa tarefa', 'proibido de fazer a tarefa', 'com medo da tarefa'], a: 0, h: ['Cada um tinha que regar uma vez por semana.', 'Quem tem uma tarefa para cumprir é...'], e: 'Encarregado = <b>responsável</b> por fazer algo.' },
  { id: 't2e', txt: 'T2', t: 'p_interp', d: 3, q: 'Qual trecho mostra que a turma pretende continuar o projeto?', o: ['"A turma já planeja plantar cenouras e tomates no próximo semestre."', '"O projeto começou depois que a turma estudou..."', '"As verduras colhidas foram usadas na merenda."', '"Os alunos colheram as primeiras alfaces."'], a: 0, h: ['Procure algo sobre o futuro.', 'Planejar = pensar no que fazer depois.'], e: 'O trecho "<b>já planeja plantar cenouras e tomates no próximo semestre</b>" mostra a continuação.' },
  { id: 't2f', txt: 'T2', t: 'p_discurso', d: 2, q: 'O trecho entre aspas ("Eles aprenderam que uma planta precisa de cuidado constante") é:', o: ['a fala da professora, reproduzida em discurso direto', 'a opinião do jornalista', 'o título da notícia', 'a fala de um aluno'], a: 0, h: ['Logo depois aparece "contou".', 'Quem contou? Releia o começo do parágrafo.'], e: 'As aspas reproduzem as palavras exatas <b>da professora</b>: discurso direto.' },

  { id: 't3a', txt: 'T3', t: 'p_interp', d: 1, q: 'No poema, de que era feito o gol?', o: ['De chinelos', 'De pedras', 'De madeira', 'De caixas'], a: 0, h: ['Releia o segundo verso.', '"o gol é feito de..."'], e: 'O verso diz: "o gol é feito de <b>chinelo</b>".' },
  { id: 't3b', txt: 'T3', t: 'p_interp', d: 1, q: 'Por que o jogo terminou?', o: ['Porque a mãe chamou para jantar', 'Porque a bola furou', 'Porque o cachorro fugiu', 'Porque começou a chover'], a: 0, h: ['Releia a segunda estrofe.', 'Quem chama e para quê?'], e: '"Quando a mãe chama: \'Jantar!\'" — o jogo parou <b>porque a mãe chamou para jantar</b>.' },
  { id: 't3c', txt: 'T3', t: 'p_interp', d: 2, q: 'O que se pode concluir pelos dois últimos versos?', o: ['As crianças vão jogar de novo no dia seguinte', 'O jogo acabou com um vencedor', 'O cachorro venceu o jogo', 'As crianças nunca mais vão jogar'], a: 0, h: ['O placar ficou empatado.', '"Amanhã vamos jogar..."'], e: 'Como ficou empatado e "o desempate está marcado" para amanhã, <b>vão jogar de novo no dia seguinte</b>.' },
  { id: 't3d', txt: 'T3', t: 'p_interp', d: 2, q: 'Esse texto é um poema porque:', o: ['está organizado em versos e estrofes, com rimas', 'informa um fato real', 'tem rubricas entre parênteses', 'ensina como jogar futebol'], a: 0, h: ['Repare como as linhas estão organizadas.', 'chão / cachorrão, chinelo / caramelo...'], e: 'O texto tem <b>versos, estrofes e rimas</b> (chão/cachorrão, chinelo/caramelo).' },
  { id: 't3e', txt: 'T3', t: 'p_interp', d: 1, q: 'Quantas <b>estrofes</b> tem o poema?', o: ['2', '4', '8', '1'], a: 0, h: ['Estrofe é um grupo de versos.', 'Conte os blocos separados.'], e: 'O poema tem <b>2 estrofes</b>, cada uma com 4 versos.' },

  { id: 't4a', txt: 'T4', t: 'p_imagem', d: 1, q: 'O que é preciso levar como <b>entrada</b> para participar da gincana?', o: ['Um brinquedo para doação', 'Uma garrafa de água', 'Um boné', 'Um ingresso pago'], a: 0, h: ['Procure a palavra "Entrada" no cartaz.', 'Boné e água são recomendações.'], e: 'O cartaz diz: "Entrada: <b>1 brinquedo para doação</b>".', w: { 1: 'A garrafa de água é recomendada, mas a entrada é o brinquedo.' } },
  { id: 't4b', txt: 'T4', t: 'p_imagem', d: 1, q: 'Qual é a finalidade desse cartaz?', o: ['Convidar e informar sobre um evento', 'Contar uma história de aventura', 'Vender brinquedos', 'Ensinar a pintar'], a: 0, h: ['Ele tem data, horário e local.', 'Para que servem cartazes assim?'], e: 'O cartaz <b>divulga um evento</b> com data, hora, local e atividades.' },
  { id: 't4c', txt: 'T4', t: 'p_imagem', d: 2, q: 'No cartaz, os desenhos ⏰ e 📍 ajudam o leitor a:', o: ['encontrar rapidamente o horário e o local', 'saber quem organizou a festa', 'descobrir quanto custa', 'ler a história do evento'], a: 0, h: ['Que informação está ao lado de cada desenho?', 'Relógio... alfinete de mapa...'], e: 'Os ícones ficam ao lado do <b>horário (⏰)</b> e do <b>local (📍)</b>, facilitando a leitura.' },

  { id: 't5a', txt: 'T5', t: 'p_imagem', d: 2, q: 'Por que o menino arrumou o quarto tão rápido?', o: ['Porque queria ir jogar bola', 'Porque gosta muito de arrumar', 'Porque a mãe ia arrumar por ele', 'Porque estava com sono'], a: 0, h: ['O que ele pediu no primeiro quadrinho?', 'A mãe colocou uma condição.'], e: 'A mãe disse que ele só poderia jogar bola depois de arrumar o quarto. Ele <b>queria jogar bola</b>.' },
  { id: 't5b', txt: 'T5', t: 'p_imagem', d: 1, q: 'No segundo quadrinho, o balão "Que preguiça..." tem forma de nuvem. Isso indica que o menino:', o: ['pensou, sem falar em voz alta', 'gritou com a mãe', 'cantou uma música', 'chorou'], a: 0, h: ['Lembre dos tipos de balão.', 'Nuvem = ...'], e: 'Balão de nuvem indica <b>pensamento</b>.' },
  { id: 't5c', txt: 'T5', t: 'p_imagem', d: 2, q: 'A expressão da mãe no último quadrinho (😮) mostra que ela ficou:', o: ['surpresa', 'brava', 'triste', 'com sono'], a: 0, h: ['Olhe a boca aberta.', 'Ela não esperava que fosse tão rápido.'], e: 'A boca aberta mostra <b>surpresa</b> com a rapidez do filho.' },

  { id: 't6a', txt: 'T6', t: 'p_interp', d: 1, q: 'Quantos corações tem o polvo?', o: ['Três', 'Um', 'Dois', 'Oito'], a: 0, h: ['Está na primeira frase.', 'Oito é o número de braços.'], e: 'O texto diz que o polvo tem <b>três corações</b>.' },
  { id: 't6b', txt: 'T6', t: 'p_interp', d: 2, q: 'Para que o polvo solta tinta na água?', o: ['Para fugir sem ser visto quando se sente ameaçado', 'Para pintar as pedras', 'Para agarrar os alimentos', 'Para mudar a cor do sangue'], a: 0, h: ['Releia a última frase.', 'Quando ele faz isso?'], e: 'Quando se sente ameaçado, ele solta tinta e <b>foge sem ser visto</b>.' },
  { id: 't6c', txt: 'T6', t: 'p_contexto', d: 2, q: 'No texto, "quando se sente <b>ameaçado</b>" quer dizer quando o polvo se sente:', o: ['em perigo', 'com fome', 'feliz', 'cansado'], a: 0, h: ['O que ele faz em seguida? Foge!', 'Fugimos quando estamos...'], e: 'Ameaçado = <b>em perigo</b>. Por isso ele foge.' },
  { id: 't6d', txt: 'T6', t: 'p_interp', d: 1, q: 'Qual é a finalidade desse texto?', o: ['Informar curiosidades sobre um animal', 'Contar uma aventura de um polvo', 'Convidar para ir ao aquário', 'Ensinar uma receita'], a: 0, h: ['"Você sabia que...?"', 'Ele traz fatos reais.'], e: 'É um texto informativo: apresenta <b>curiosidades sobre o polvo</b>.' },

  { id: 't7a', txt: 'T7', t: 'p_drama', d: 1, q: 'Esse texto é um texto dramático porque:', o: ['foi escrito para ser encenado, com falas dos personagens e indicações de cena', 'conta uma notícia real', 'tem versos e rimas', 'ensina como fazer algo'], a: 0, h: ['Veja como as falas aparecem.', 'Há nomes de personagens e rubricas.'], e: 'Tem <b>nomes de personagens antes das falas, rubricas e cena</b>: é um texto para ser encenado.' },
  { id: 't7b', txt: 'T7', t: 'p_drama', d: 1, q: 'As indicações entre parênteses, como "(coçando a cabeça)", servem para:', o: ['indicar gestos, sentimentos e movimentos dos personagens', 'mostrar o que o narrador pensa', 'indicar o título da peça', 'mostrar o fim da peça'], a: 0, h: ['Os atores falam essas palavras?', 'São as rubricas.'], e: 'As <b>rubricas</b> orientam os atores sobre gestos, sentimentos e movimentos.' },
  { id: 't7c', txt: 'T7', t: 'p_drama', d: 1, q: 'Onde acontece a cena?', o: ['No pátio da escola, no recreio', 'Na horta da escola', 'Na sala de aula', 'No campo de futebol'], a: 0, h: ['Releia a primeira linha.', 'CENA 1 — ...'], e: 'A rubrica inicial diz: "<b>Pátio da escola, na hora do recreio</b>".' },
  { id: 't7d', txt: 'T7', t: 'p_drama', d: 2, q: 'Por que Rafa e Bia decidem ir até a horta?', o: ['Porque viram pegadas de lama indo para lá', 'Porque o sinal tocou', 'Porque a professora mandou', 'Porque queriam colher verduras'], a: 0, h: ['O que Bia mostrou no chão?', 'Eles vão "seguir as pistas".'], e: 'Bia viu <b>pegadas de lama indo para a horta</b>, uma pista do sumiço da bola.' },
  { id: 't7e', txt: 'T7', t: 'p_drama', d: 2, q: 'Como os nomes dos personagens aparecem nesse texto?', o: ['Antes de cada fala, em letras maiúsculas', 'No fim do texto', 'Entre aspas', 'Só no título'], a: 0, h: ['Olhe o começo de cada fala.', 'BIA: ... RAFA: ...'], e: 'Os nomes aparecem <b>antes de cada fala, em maiúsculas</b> (BIA:, RAFA:).' },
  { id: 't7f', txt: 'T7', t: 'p_drama', d: 3, q: 'Diferente de um conto, nesse texto:', o: ['não há narrador: a história aparece pelas falas e ações dos personagens', 'há um narrador que conta tudo', 'não existem personagens', 'tudo é escrito em versos'], a: 0, h: ['Quem conta a história no conto?', 'No teatro, quem "conta" são os personagens.'], e: 'No texto dramático <b>não há narrador</b>; a história aparece pelas falas e rubricas.' },
  { id: 'pdr1', t: 'p_drama', d: 2, q: 'Num texto teatral, as partes em que a peça se divide são chamadas de:', o: ['cenas ou atos', 'estrofes', 'parágrafos', 'capítulos de notícia'], a: 0, h: ['"CENA 1" aparece no começo do texto do recreio.', 'Estrofes são de poemas.'], e: 'Peças de teatro se dividem em <b>cenas</b> e <b>atos</b>.' }
];

/* ======================= GERADORES (Matemática) ======================= */
var GEN = (function () {
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function fmt(n) { return n.toLocaleString('pt-BR'); }
  function brl(c) { // c em centavos
    var r = Math.floor(c / 100), ce = c % 100;
    return 'R$ ' + fmt(r) + ',' + (ce < 10 ? '0' : '') + ce;
  }
  function hm(h, m) { return h + ':' + (m < 10 ? '0' : '') + m; }
  // monta alternativas únicas: correta + distratores
  function opts(correct, distr, filler) {
    var out = [correct];
    distr.forEach(function (x) { if (out.indexOf(x) < 0 && out.length < 4) out.push(x); });
    var guard = 0;
    while (out.length < 4 && guard++ < 50) { var f = filler(); if (out.indexOf(f) < 0) out.push(f); }
    return out;
  }

  // ---- número por extenso (até 99.999)
  var U = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  var D = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  var C = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
  function ate999(n) {
    if (n === 0) return '';
    if (n === 100) return 'cem';
    var p = [], c = Math.floor(n / 100), r = n % 100;
    if (c) p.push(C[c]);
    if (r) {
      if (r < 20) p.push(U[r]);
      else { var d = Math.floor(r / 10), u = r % 10; p.push(u ? D[d] + ' e ' + U[u] : D[d]); }
    }
    return p.join(' e ');
  }
  function extenso(n) {
    if (n === 0) return 'zero';
    var m = Math.floor(n / 1000), r = n % 1000, s = '';
    if (m) s = (m === 1 ? 'mil' : ate999(m) + ' mil');
    if (r) {
      if (m) s += (r < 100 || r % 100 === 0) ? ' e ' : ' ';
      s += ate999(r);
    }
    return s;
  }

  var G = {};

  /* ---------- m_num ---------- */
  G.m_num = [
    function (d) { // valor posicional
      var n, digits;
      do { n = ri(10000, 99999); digits = String(n).split(''); } while (new Set(digits).size < 5 || digits.indexOf('0') >= 0);
      var pos = d === 1 ? ri(2, 3) : ri(1, 4); // 0=unidade ... 4=dezena de milhar
      var s = String(n), dig = +s[4 - pos], val = dig * Math.pow(10, pos);
      var nomes = ['unidades', 'dezenas', 'centenas', 'unidades de milhar', 'dezenas de milhar'];
      var o = opts(fmt(val), [fmt(dig), fmt(dig * Math.pow(10, pos + 1)), fmt(dig * Math.pow(10, Math.max(0, pos - 1)))], function () { return fmt(dig * Math.pow(10, ri(0, 4))); });
      return { key: 'vp' + n + pos, q: 'Qual é o valor do algarismo <b>' + dig + '</b> no número <b>' + fmt(n) + '</b>?', o: o, a: 0,
        h: ['Conte as ordens a partir da direita: unidades, dezenas, centenas...', 'O ' + dig + ' está na casa das ' + nomes[pos] + '.'],
        e: 'O ' + dig + ' ocupa as <b>' + nomes[pos] + '</b>, então vale ' + dig + ' × ' + fmt(Math.pow(10, pos)) + ' = <b>' + fmt(val) + '</b>.' };
    },
    function (d) { // composição com zero
      var a = ri(1, 9), b = ri(1, 9), c = ri(1, 9), z = ri(1, 9);
      var n = a * 10000 + b * 1000 + c * 100 + z; // dezena zero
      var expr = fmt(a * 10000) + ' + ' + fmt(b * 1000) + ' + ' + c * 100 + ' + ' + z;
      if (d >= 2) expr = a + ' × 10.000 + ' + b + ' × 1.000 + ' + c + ' × 100 + ' + z + ' × 1';
      var o = opts(fmt(n), [fmt(a * 10000 + b * 1000 + c * 100 + z * 10), fmt(a * 1000 + b * 100 + c * 10 + z), fmt(a * 10000 + b * 1000 + c * 10 + z)], function () { return fmt(n + ri(1, 9) * 10); });
      return { key: 'cp' + n + d, q: 'Qual número é igual a <b>' + expr + '</b>?', o: o, a: 0,
        h: ['Junte as partes ordem por ordem.', 'Não há dezenas: a casa das dezenas fica com zero.'],
        e: 'Juntando: ' + a + ' dezenas de milhar, ' + b + ' unidades de milhar, ' + c + ' centenas, <b>0 dezenas</b> e ' + z + ' unidades = <b>' + fmt(n) + '</b>.' };
    },
    function (d) { // maior número
      var base = ri(2, 8) * 10000 + ri(0, 9) * 1000;
      var arr = [base + ri(100, 999), base + ri(100, 999), base + 1000 + ri(0, 99), base - 1000 + ri(900, 999)];
      arr = arr.filter(function (v, i) { return arr.indexOf(v) === i; });
      while (arr.length < 4) arr.push(base + ri(1, 999));
      var mx = Math.max.apply(null, arr), menor = d === 3 && Math.random() < .5;
      var alvo = menor ? Math.min.apply(null, arr) : mx;
      var o = [fmt(alvo)].concat(arr.filter(function (v) { return v !== alvo; }).map(fmt)).slice(0, 4);
      return { key: 'cmp' + arr.join('-') + menor, q: 'Qual destes números é o <b>' + (menor ? 'menor' : 'maior') + '</b>?', o: o, a: 0,
        h: ['Todos têm 5 algarismos. Compare da esquerda para a direita.', 'Primeiro as dezenas de milhar, depois as unidades de milhar...'],
        e: 'Comparando ordem por ordem, da esquerda para a direita, o ' + (menor ? 'menor' : 'maior') + ' é <b>' + fmt(alvo) + '</b>.' };
    },
    function (d) { // por extenso
      var n = d === 1 ? ri(1001, 9999) : ri(10001, 99999);
      if (Math.random() < .5) n = Math.floor(n / 10) * 10 + (Math.random() < .5 ? 0 : ri(1, 9));
      var vizinhos = [n + 100 <= 99999 ? n + 100 : n - 100, n + 1000 <= 99999 ? n + 1000 : n - 1000, n % 100 >= 10 ? n - 10 : n + 10];
      var o = opts(extenso(n), vizinhos.map(extenso), function () { return extenso(n + ri(1, 9)); });
      return { key: 'ext' + n, q: 'Como se escreve <b>' + fmt(n) + '</b> por extenso?', o: o, a: 0,
        h: ['Leia primeiro a parte antes do ponto (os milhares).', 'Depois leia o resto: centenas, dezenas e unidades.'],
        e: fmt(n) + ' = <b>' + extenso(n) + '</b>.' };
    }
  ];

  /* ---------- m_ops ---------- */
  var coisas = [['caixa', 'caixas', 'bombons'], ['pacote', 'pacotes', 'figurinhas'], ['saquinho', 'saquinhos', 'bolinhas de gude'], ['estojo', 'estojos', 'lápis de cor']];
  var nomes = ['Ana', 'Bruno', 'Clara', 'Davi', 'Elisa', 'Felipe', 'Gabi', 'Heitor', 'Isabela', 'João', 'Luna', 'Miguel', 'Nina', 'Otávio', 'Pietra', 'Rafael', 'Sofia', 'Theo'];
  G.m_ops = [
    function (d) {
      var c = pick(coisas), A = d === 1 ? ri(6, 12) : ri(12, 48), B = d === 1 ? ri(3, 6) : ri(4, 9), r = A * B;
      var o = opts(fmt(r), [fmt(A + B), fmt(A * (B - 1)), fmt(r + 10)], function () { return fmt(r + ri(-12, 12)); });
      return { key: 'mul' + A + 'x' + B, q: 'Cada ' + c[0] + ' tem <b>' + A + ' ' + c[2] + '</b>. Quantos ' + c[2] + ' há em <b>' + B + ' ' + c[1] + '</b>?', o: o, a: 0,
        h: ['São grupos iguais: use a multiplicação.', 'Calcule ' + A + ' × ' + B + '. Se ajudar, separe em dezenas e unidades.'],
        e: A + ' × ' + B + ' = <b>' + fmt(r) + '</b>.', w: { 1: 'Somar ' + A + ' + ' + B + ' não resolve: são ' + B + ' grupos de ' + A + '.' } };
    },
    function (d) {
      var k = d === 1 ? ri(2, 5) : ri(3, 9), each = d === 1 ? ri(5, 12) : ri(12, 30), N = k * each;
      var o = opts(fmt(each), [fmt(N - k), fmt(each + 1), fmt(N + k)], function () { return fmt(each + ri(-5, 5)); });
      return { key: 'div' + N + '/' + k, q: '<b>' + N + ' figurinhas</b> serão repartidas igualmente entre <b>' + k + ' amigos</b>. Quantas cada um vai receber?', o: o, a: 0,
        h: ['Repartir igualmente é dividir.', 'Que número vezes ' + k + ' dá ' + N + '?'],
        e: N + ' ÷ ' + k + ' = <b>' + each + '</b>. Confira: ' + each + ' × ' + k + ' = ' + N + '.' };
    },
    function (d) {
      var R = ri(4, 12), Cc = ri(6, 15), r = R * Cc;
      var o = opts(fmt(r), [fmt(R + Cc), fmt(r - R), fmt(r + Cc)], function () { return fmt(r + ri(-9, 9)); });
      return { key: 'ret' + R + 'x' + Cc, q: 'Um auditório tem <b>' + R + ' fileiras</b> com <b>' + Cc + ' cadeiras</b> em cada uma. Quantas cadeiras há ao todo?', o: o, a: 0,
        h: ['Fileiras × cadeiras em cada fileira.', R + ' × ' + Cc + ' = ?'],
        e: R + ' × ' + Cc + ' = <b>' + r + ' cadeiras</b> (configuração retangular).' };
    },
    function (d) {
      var n1 = pick(nomes), n2 = pick(nomes.filter(function (x) { return x !== n1; }));
      var X = d === 1 ? ri(30, 99) : ri(120, 980), Y = X - ri(d === 1 ? 5 : 25, d === 1 ? 25 : 99), r = X - Y;
      var o = opts(fmt(r), [fmt(X + Y), fmt(r + 10), fmt(r - 1)], function () { return fmt(r + ri(-11, 11)); });
      return { key: 'cmpar' + X + '-' + Y, q: n1 + ' tem <b>' + X + '</b> figurinhas e ' + n2 + ' tem <b>' + Y + '</b>. Quantas figurinhas ' + n1 + ' tem <b>a mais</b> que ' + n2 + '?', o: o, a: 0,
        h: ['"Quantas a mais" é comparar: use a subtração.', X + ' − ' + Y + ' = ?'],
        e: X + ' − ' + Y + ' = <b>' + r + '</b>. Confira: ' + Y + ' + ' + r + ' = ' + X + '.' };
    },
    function (d) {
      var n1 = pick(nomes), X = ri(40, 150), Y = ri(10, 60), Z = ri(5, X), r = X + Y - Z;
      var o = opts(fmt(r), [fmt(X + Y + Z), fmt(X - Y - Z), fmt(X + Y)], function () { return fmt(r + ri(-10, 10)); });
      return { key: 'ms' + X + '+' + Y + '-' + Z, q: n1 + ' tinha <b>' + X + '</b> bolinhas de gude. Ganhou <b>' + Y + '</b> do primo e depois deu <b>' + Z + '</b> para a irmã. Com quantas ficou?', o: o, a: 0,
        h: ['Ganhar = somar; dar = tirar.', 'Faça ' + X + ' + ' + Y + ' e depois tire ' + Z + '.'],
        e: X + ' + ' + Y + ' = ' + (X + Y) + '; ' + (X + Y) + ' − ' + Z + ' = <b>' + r + '</b>.' };
    },
    function (d) { // estratégia
      var A = pick([12, 15, 21, 23, 25, 32, 34, 41, 43]), B = pick([4, 6, 7, 8, 9, 12]);
      var dz = Math.floor(A / 10) * 10, un = A % 10;
      var certo = dz + ' × ' + B + ' + ' + un + ' × ' + B;
      var o = opts(certo, [dz + ' × ' + B + ' + ' + un, dz + ' + ' + un + ' × ' + B, A + ' + ' + B], function () { return dz + ' × ' + (B + 1) + ' + ' + un; });
      return { key: 'est' + A + 'x' + B, q: 'Qual cálculo dá o <b>mesmo resultado</b> que <b>' + A + ' × ' + B + '</b>?', o: o, a: 0,
        h: ['Separe ' + A + ' em ' + dz + ' + ' + un + '.', 'As DUAS partes precisam ser multiplicadas por ' + B + '.'],
        e: A + ' = ' + dz + ' + ' + un + ', então ' + A + ' × ' + B + ' = <b>' + certo + '</b> = ' + (dz * B) + ' + ' + (un * B) + ' = ' + (A * B) + '.', w: { 1: 'Faltou multiplicar o ' + un + ' por ' + B + '.' } };
    },
    function (d) { // divisão como medida
      var p = pick([5, 10, 15, 20, 25]), n = ri(3, 12), L = p * n;
      var o = opts(fmt(n), [fmt(L - p), fmt(n + 1), fmt(L + p)], function () { return fmt(n + ri(-3, 3)); });
      return { key: 'med' + L + '/' + p, q: 'Uma fita de <b>' + L + ' cm</b> será cortada em pedaços de <b>' + p + ' cm</b>. Quantos pedaços serão formados?', o: o, a: 0,
        h: ['Quantas vezes ' + p + ' cabe em ' + L + '?', 'Divida ' + L + ' por ' + p + '.'],
        e: L + ' ÷ ' + p + ' = <b>' + n + ' pedaços</b>.' };
    },
    function (d) { // proporcionalidade
      var q1 = ri(2, 4), preco = ri(2, 6) * q1, k = ri(2, 4), q2 = q1 * k, r = preco * k;
      var o = opts(brl(r * 100), [brl((preco + q2) * 100), brl((preco * 2) * 100 === r * 100 ? (preco * 3) * 100 : preco * 2 * 100), brl((r + q1) * 100)], function () { return brl((r + ri(1, 9)) * 100); });
      return { key: 'prop' + q1 + '-' + preco + '-' + q2, q: '<b>' + q1 + ' pacotes</b> de figurinhas custam <b>' + brl(preco * 100) + '</b>. Quanto custam <b>' + q2 + ' pacotes</b>?', o: o, a: 0,
        h: [q2 + ' pacotes são quantas vezes ' + q1 + ' pacotes?', 'Se a quantidade é ' + k + ' vezes maior, o preço também é.'],
        e: q2 + ' é ' + k + ' vezes ' + q1 + '. Então o preço é ' + k + ' × ' + brl(preco * 100) + ' = <b>' + brl(r * 100) + '</b>.' };
    }
  ];

  /* ---------- m_frac ---------- */
  G.m_frac = [
    function (d) { // figura
      var den = d === 1 ? pick([2, 3, 4]) : pick([3, 4, 5, 6, 8, 10]);
      var n = d === 1 ? 1 : ri(1, den - 1);
      var shape = Math.random() < .5 ? 'pizza' : 'bar';
      var c = n + '/' + den;
      var o = opts(c, [n + '/' + (den - n), den + '/' + n, (den - n) + '/' + den], function () { return ri(1, 9) + '/' + ri(2, 10); });
      return { key: 'fig' + n + '/' + den + shape, q: 'Que fração da figura está <b>pintada</b>?', fig: { t: 'frac', n: n, d: den, shape: shape }, o: o, a: 0,
        h: ['Conte TODAS as partes iguais: esse número vai embaixo (denominador).', 'Conte as partes pintadas: esse número vai em cima.'],
        e: 'A figura tem ' + den + ' partes iguais (denominador) e ' + n + ' pintada' + (n > 1 ? 's' : '') + ' (numerador): <b>' + c + '</b>.',
        w: { 1: 'Cuidado: o denominador é o TOTAL de partes, não só as não pintadas.' } };
    },
    function (d) { // não pintada
      var den = pick([4, 5, 6, 8, 10]), n = ri(1, den - 1), np = den - n;
      var c = np + '/' + den;
      var o = opts(c, [n + '/' + den, np + '/' + n, n + '/' + np], function () { return ri(1, 9) + '/' + den; });
      return { key: 'nfig' + n + '/' + den, q: 'Que fração da figura <b>NÃO</b> está pintada?', fig: { t: 'frac', n: n, d: den, shape: 'bar' }, o: o, a: 0,
        h: ['Conte o total de partes.', 'Agora conte só as partes brancas.'],
        e: 'São ' + den + ' partes e ' + np + ' não estão pintadas: <b>' + c + '</b>.' };
    },
    function (d) { // fração de quantidade
      var den = d === 1 ? pick([2, 4, 5, 10]) : pick([3, 4, 5, 10]);
      var each = d === 1 ? ri(2, 8) : ri(4, 15), N = den * each;
      var ctx = pick([['balas', 'Mia ganhou <b>1/' + den + '</b> de um pacote com <b>' + N + ' balas</b>. Quantas balas ela ganhou?'], ['figurinhas', 'Gael deu <b>1/' + den + '</b> das suas <b>' + N + ' figurinhas</b> para o primo. Quantas figurinhas ele deu?'], ['alunos', 'Numa turma de <b>' + N + ' alunos</b>, <b>1/' + den + '</b> torce para o time verde. Quantos alunos torcem para o verde?']]);
      var o = opts(fmt(each), [fmt(N - each), fmt(N + den), fmt(each + 1)], function () { return fmt(each + ri(-3, 3)); });
      return { key: 'fq' + N + '/' + den, q: ctx[1], o: o, a: 0,
        h: ['1/' + den + ' de ' + N + ' = dividir ' + N + ' em ' + den + ' grupos iguais.', 'Calcule ' + N + ' ÷ ' + den + '.'],
        e: '1/' + den + ' de ' + N + ' = ' + N + ' ÷ ' + den + ' = <b>' + each + '</b>.', w: { 1: 'Esse é o que SOBROU, não o 1/' + den + '.' } };
    },
    function (d) { // maior/menor unitária
      var ds = [2, 3, 4, 5, 10, 100].sort(function () { return Math.random() - .5; }).slice(0, 4);
      var maior = Math.random() < .5, alvo = maior ? Math.min.apply(null, ds) : Math.max.apply(null, ds);
      var o = ['1/' + alvo].concat(ds.filter(function (x) { return x !== alvo; }).map(function (x) { return '1/' + x; }));
      return { key: 'uc' + ds.join('') + maior, q: 'Uma mesma barra de chocolate foi dividida de jeitos diferentes. Qual fração representa o <b>' + (maior ? 'MAIOR' : 'MENOR') + '</b> pedaço?', o: o, a: 0,
        h: ['Quanto mais partes, menor fica cada pedaço.', maior ? 'O maior pedaço é o que tem MENOS partes (menor denominador).' : 'O menor pedaço é o que tem MAIS partes (maior denominador).'],
        e: 'Com numerador 1, quanto ' + (maior ? 'menor' : 'maior') + ' o denominador, ' + (maior ? 'maior' : 'menor') + ' o pedaço: <b>1/' + alvo + '</b>.' };
    },
    function (d) { // medidas e frações
      var it = pick([
        ['1/2 hora', '30 minutos', ['20 minutos', '50 minutos', '12 minutos'], '1 hora = 60 minutos; 60 ÷ 2 = 30.'],
        ['1/4 de hora', '15 minutos', ['25 minutos', '40 minutos', '4 minutos'], '60 ÷ 4 = 15.'],
        ['1/2 de R$ 10,00', 'R$ 5,00', ['R$ 2,00', 'R$ 20,00', 'R$ 8,00'], '10 ÷ 2 = 5.'],
        ['1/5 de R$ 10,00', 'R$ 2,00', ['R$ 5,00', 'R$ 0,50', 'R$ 15,00'], '10 ÷ 5 = 2.'],
        ['1/4 de R$ 1,00', '25 centavos', ['40 centavos', '4 centavos', '75 centavos'], '100 centavos ÷ 4 = 25.'],
        ['1/10 de 1 metro', '10 centímetros', ['1 centímetro', '100 centímetros', '50 centímetros'], '1 m = 100 cm; 100 ÷ 10 = 10.'],
        ['1/2 quilo', '500 gramas', ['200 gramas', '50 gramas', '250 gramas'], '1 kg = 1.000 g; 1.000 ÷ 2 = 500.'],
        ['1/4 de 1 litro', '250 mL', ['400 mL', '25 mL', '500 mL'], '1 L = 1.000 mL; 1.000 ÷ 4 = 250.'],
        ['1/3 de 1 dia', '8 horas', ['3 horas', '6 horas', '12 horas'], '1 dia = 24 horas; 24 ÷ 3 = 8.'],
        ['1/100 de R$ 1,00', '1 centavo', ['10 centavos', '100 centavos', '50 centavos'], 'R$ 1,00 = 100 centavos; 100 ÷ 100 = 1.']
      ]);
      return { key: 'fm' + it[0], q: 'Quanto é <b>' + it[0] + '</b>?', o: [it[1]].concat(it[2]), a: 0,
        h: ['Transforme o inteiro numa unidade menor (minutos, centavos, centímetros, gramas...).', 'Depois divida pelo denominador.'],
        e: it[3] + ' Resposta: <b>' + it[1] + '</b>.' };
    }
  ];

  /* ---------- m_seq ---------- */
  G.m_seq = [
    function (d) {
      var r = d === 1 ? pick([2, 3, 5, 10]) : pick([3, 4, 6, 7, 8, 9, 11, 12, 15, 25]);
      var a0 = d === 3 ? ri(1, 30) : r * ri(1, 4), len = 6, miss = ri(2, 5);
      var decresc = d === 3 && Math.random() < .4;
      var arr = [];
      for (var i = 0; i < len; i++) arr.push(decresc ? a0 + r * (len - 1 - i) : a0 + r * i);
      var c = arr[miss];
      var show = arr.map(function (v, i) { return i === miss ? '<b>__</b>' : fmt(v); }).join(', ');
      var o = opts(fmt(c), [fmt(c + 1), fmt(c + r), fmt(c - 1)], function () { return fmt(c + ri(-r - 3, r + 3)); });
      return { key: 'seq' + arr.join(',') + miss, q: 'Qual número está faltando na sequência?<br><span class="seq">' + show + '</span>', o: o, a: 0,
        h: ['Veja quanto ' + (decresc ? 'diminui' : 'aumenta') + ' de um número para o seguinte.', 'A regra é ' + (decresc ? 'tirar ' : 'somar ') + r + '.'],
        e: 'A regra é <b>' + (decresc ? 'tirar ' : 'somar ') + r + '</b>. O número que falta é <b>' + fmt(c) + '</b>.' };
    },
    function (d) {
      var k = pick([3, 4, 6, 7, 8, 9]), m = k * ri(3, 12);
      var nao = []; var g = 0;
      while (nao.length < 3 && g++ < 100) { var x = m + ri(-9, 9); if (x > 0 && x % k !== 0 && nao.indexOf(x) < 0) nao.push(x); }
      return { key: 'mult' + k + '-' + m, q: 'Qual destes números é <b>múltiplo de ' + k + '</b>?', o: [fmt(m)].concat(nao.map(fmt)), a: 0,
        h: ['Múltiplo de ' + k + ' é um resultado da tabuada do ' + k + '.', 'Tente dividir cada número por ' + k + ': o múltiplo não deixa resto.'],
        e: fmt(m) + ' = ' + k + ' × ' + (m / k) + ', então <b>' + fmt(m) + '</b> é múltiplo de ' + k + '.' };
    },
    function (d) {
      var r = ri(2, 9), a0 = ri(1, 20), arr = [a0, a0 + r, a0 + 2 * r, a0 + 3 * r];
      var o = opts('somar ' + r + ' a cada termo', ['somar ' + (r + 1) + ' a cada termo', 'multiplicar por 2', 'somar ' + (r - 1 === 0 ? 10 : r - 1) + ' a cada termo'], function () { return 'somar ' + ri(10, 15) + ' a cada termo'; });
      return { key: 'regra' + arr.join(','), q: 'Qual é a <b>regra</b> da sequência <span class="seq">' + arr.join(', ') + ', ...</span>', o: o, a: 0,
        h: ['Faça a conta: ' + arr[1] + ' − ' + arr[0] + ' = ?', 'Confira se a diferença é sempre a mesma.'],
        e: 'De um termo para o outro aumenta sempre ' + r + ': a regra é <b>somar ' + r + '</b>.' };
    },
    function (d) {
      var k = pick([4, 5, 6, 7, 8, 9]), n = ri(6, 12), r = k * n;
      var o = opts(fmt(r), [fmt(k * (n - 1)), fmt(k * (n + 1)), fmt(k + n)], function () { return fmt(r + ri(-5, 5)); });
      return { key: 'nterm' + k + '-' + n, q: 'Na sequência dos múltiplos de ' + k + ' <span class="seq">' + k + ', ' + 2 * k + ', ' + 3 * k + ', ' + 4 * k + ', ...</span> qual é o <b>' + n + 'º</b> termo?', o: o, a: 0,
        h: ['O 1º termo é ' + k + ' × 1, o 2º é ' + k + ' × 2...', 'Então o ' + n + 'º é ' + k + ' × ' + n + '.'],
        e: 'O ' + n + 'º termo é ' + k + ' × ' + n + ' = <b>' + r + '</b>.' };
    }
  ];

  /* ---------- m_loc ---------- */
  var L = 'ABCDE';
  var emojis = ['⚽', '🧰', '🌳', '🏠', '🐶', '🚲', '⭐', '🎈'];
  G.m_loc = [
    function (d) {
      var es = emojis.slice().sort(function () { return Math.random() - .5; }).slice(0, 3);
      var items = [], used = {};
      es.forEach(function (e) { var c, r; do { c = ri(1, 5); r = ri(1, 5); } while (used[c + '' + r]); used[c + '' + r] = 1; items.push({ c: c, r: r, e: e }); });
      var alvo = items[0], certo = L[alvo.c - 1] + alvo.r;
      var o = opts(certo, [alvo.r + L[alvo.c - 1], L[alvo.r - 1] + alvo.c, L[items[1].c - 1] + items[1].r], function () { return L[ri(0, 4)] + ri(1, 5); });
      return { key: 'gl' + JSON.stringify(items), q: 'Em qual casa da malha está o <b>' + alvo.e + '</b>?', fig: { t: 'grid', cols: 5, rows: 5, items: items }, o: o, a: 0,
        h: ['Primeiro a letra da coluna (embaixo), depois o número da linha (ao lado).', 'Desça o dedo até a letra e vá até o número.'],
        e: 'O ' + alvo.e + ' está na coluna ' + L[alvo.c - 1] + ' e na linha ' + alvo.r + ': <b>' + certo + '</b>.' };
    },
    function (d) {
      var c0 = ri(1, 3), r0 = ri(1, 3), dx = ri(1, 5 - c0), dy = ri(1, 5 - r0);
      var certo = L[c0 - 1 + dx] + (r0 + dy);
      var o = opts(certo, [L[c0 - 1 + Math.min(dy, 4 - (c0 - 1))] + (r0 + Math.min(dx, 5 - r0)), L[c0 - 1] + (r0 + dy), L[c0 - 1 + dx] + r0], function () { return L[ri(0, 4)] + ri(1, 5); });
      return { key: 'mv' + c0 + r0 + dx + dy, q: 'O robô 🤖 está em <b>' + L[c0 - 1] + r0 + '</b>. Ele anda <b>' + dx + ' casa' + (dx > 1 ? 's' : '') + ' para a direita</b> e <b>' + dy + ' casa' + (dy > 1 ? 's' : '') + ' para cima</b>. Onde ele para?', fig: { t: 'grid', cols: 5, rows: 5, items: [{ c: c0, r: r0, e: '🤖' }] }, o: o, a: 0,
        h: ['Para a direita, a letra muda.', 'Para cima, o número aumenta.'],
        e: 'Direita: ' + L[c0 - 1] + ' → ' + L[c0 - 1 + dx] + '. Para cima: ' + r0 + ' → ' + (r0 + dy) + '. Ele para em <b>' + certo + '</b>.' };
    }
  ];

  /* ---------- m_medidas ---------- */
  G.m_medidas = [
    function (d) {
      var t = pick(['m', 'kg', 'L', 'km']), a = ri(1, 9), b;
      var cfg = { m: ['m', 'cm', 100, ri(5, 95)], kg: ['kg', 'g', 1000, ri(1, 9) * 100], L: ['L', 'mL', 1000, ri(1, 9) * 100], km: ['km', 'm', 1000, ri(1, 9) * 100] }[t];
      b = cfg[3]; var r = a * cfg[2] + b;
      var o = opts(fmt(r) + ' ' + cfg[1], [fmt(a * 10 + b) + ' ' + cfg[1], fmt(a + b) + ' ' + cfg[1], fmt(a * cfg[2] * 10 + b) + ' ' + cfg[1]], function () { return fmt(r + ri(1, 9) * 10) + ' ' + cfg[1]; });
      return { key: 'conv' + t + a + b, q: '<b>' + a + ' ' + cfg[0] + ' e ' + b + ' ' + cfg[1] + '</b> é o mesmo que:', o: o, a: 0,
        h: ['Lembre: 1 ' + cfg[0] + ' = ' + fmt(cfg[2]) + ' ' + cfg[1] + '.', 'Transforme os ' + a + ' ' + cfg[0] + ' em ' + cfg[1] + ' e some ' + b + '.'],
        e: a + ' ' + cfg[0] + ' = ' + fmt(a * cfg[2]) + ' ' + cfg[1] + '. ' + fmt(a * cfg[2]) + ' + ' + b + ' = <b>' + fmt(r) + ' ' + cfg[1] + '</b>.' };
    },
    function (d) {
      var copo = pick([100, 200, 250, 500]), L2 = pick([1, 2, 3]), tot = L2 * 1000;
      if (tot % copo) { copo = 250; }
      var n = tot / copo;
      var o = opts(fmt(n), [fmt(n * 2), fmt(n / 2 === Math.floor(n / 2) ? n / 2 : n + 2), fmt(n + 1)], function () { return fmt(n + ri(-3, 3)); });
      return { key: 'copos' + L2 + '-' + copo, q: 'Uma jarra tem <b>' + L2 + ' litro' + (L2 > 1 ? 's' : '') + '</b> de suco. Quantos copos de <b>' + copo + ' mL</b> dá para encher?', o: o, a: 0,
        h: ['Transforme litros em mililitros: 1 L = 1.000 mL.', 'Quantas vezes ' + copo + ' cabe em ' + fmt(tot) + '?'],
        e: L2 + ' L = ' + fmt(tot) + ' mL. ' + fmt(tot) + ' ÷ ' + copo + ' = <b>' + n + ' copos</b>.' };
    },
    function (d) {
      var a = ri(2, 9) * 10, b = ri(2, 9) * 10, tot = a + b;
      var o = opts(fmt(tot) + ' cm', [fmt(tot) + ' m', fmt(Math.abs(a - b)) + ' cm', fmt(tot * 10) + ' cm'], function () { return fmt(tot + 5) + ' cm'; });
      return { key: 'soma' + a + b, q: 'Lia tinha uma fita de <b>' + a + ' cm</b> e emendou outra de <b>' + b + ' cm</b>. Qual o comprimento total?', o: o, a: 0,
        h: ['Emendar = juntar.', 'Some ' + a + ' + ' + b + '.'], e: a + ' + ' + b + ' = <b>' + tot + ' cm</b>.' };
    }
  ];

  /* ---------- m_tempo ---------- */
  G.m_tempo = [
    function (d) { // relógio analógico
      var h = ri(1, 12), m = d === 1 ? pick([0, 30]) : (d === 2 ? pick([0, 15, 30, 45]) : ri(1, 11) * 5);
      var c = hm(h, m);
      var hh = (h % 12) + 1, troc = (m / 5 === 0 ? 12 : m / 5);
      var o = opts(c, [hm(hh, m), hm(troc, (h % 12) * 5), hm(h, (m + 30) % 60)], function () { return hm(ri(1, 12), ri(0, 11) * 5); });
      return { key: 'clk' + h + ':' + m, q: 'Que horas o relógio está marcando?', fig: { t: 'clock', h: h, m: m }, o: o, a: 0,
        h: ['O ponteiro PEQUENO mostra a hora. O GRANDE mostra os minutos.', 'Cada número que o ponteiro grande aponta vale 5 minutos.'],
        e: 'Ponteiro pequeno: ' + h + ' horas' + (m >= 30 ? ' (já passando para a próxima hora)' : '') + '. Ponteiro grande: ' + (m / 5 || 12) + (m ? ' × 5 = ' + m + ' minutos' : ', hora exata') + '. São <b>' + c + '</b>.',
        w: { 2: 'Você trocou os ponteiros: o pequeno é o das horas.' } };
    },
    function (d) { // término
      var h = ri(7, 18), m = ri(0, 11) * 5, dh = ri(0, 2), dm = pick([15, 20, 30, 40, 45, 50]);
      var tot = h * 60 + m + dh * 60 + dm, eh = Math.floor(tot / 60), em = tot % 60;
      var c = hm(eh, em);
      var o = opts(c, [hm(eh + 1, em), hm(h + dh, m + dm < 60 ? m + dm + 10 : em + 5), hm(eh, (em + 10) % 60)], function () { return hm(eh, ri(0, 11) * 5); });
      var dur = (dh ? dh + ' hora' + (dh > 1 ? 's' : '') + ' e ' : '') + dm + ' minutos';
      return { key: 'fim' + h + m + dh + dm, q: 'Um filme começou às <b>' + hm(h, m) + '</b> e durou <b>' + dur + '</b>. A que horas terminou?', o: o, a: 0,
        h: ['Some primeiro as horas, depois os minutos.', 'Se os minutos passarem de 60, vira mais 1 hora.'],
        e: hm(h, m) + ' + ' + dur + ' = <b>' + c + '</b>.' };
    },
    function (d) { // duração
      var h = ri(8, 16), m = pick([0, 10, 20, 30, 40, 50]), dur = pick([35, 45, 50, 70, 80, 95, 105, 125]);
      var tot = h * 60 + m + dur, eh = Math.floor(tot / 60), em = tot % 60;
      var txt = function (x) { var H = Math.floor(x / 60), M = x % 60; return (H ? H + ' h' + (M ? ' ' : '') : '') + (M ? M + ' min' : ''); };
      var o = opts(txt(dur), [txt(dur + 10), txt(dur - 5 > 0 ? dur - 5 : dur + 20), txt(dur + 60)], function () { return txt(dur + ri(1, 5) * 5); });
      return { key: 'dur' + h + m + dur, q: 'O treino começou às <b>' + hm(h, m) + '</b> e terminou às <b>' + hm(eh, em) + '</b>. Quanto tempo durou?', o: o, a: 0,
        h: ['Conte até a próxima hora "redonda".', 'Depois conte as horas inteiras e os minutos que faltam.'],
        e: 'De ' + hm(h, m) + ' até ' + hm(eh, em) + ' passaram ' + dur + ' minutos = <b>' + txt(dur) + '</b>.' };
    },
    function (d) { // conversão
      var it = pick([
        function () { var h = ri(1, 3), m = pick([10, 15, 20, 30, 45]), r = h * 60 + m; return ['<b>' + h + ' hora' + (h > 1 ? 's' : '') + ' e ' + m + ' minutos</b> são quantos minutos?', r + ' minutos', [(h * 100 + m) + ' minutos', (h + m) + ' minutos', (r + 60) + ' minutos'], h + ' × 60 = ' + h * 60 + '; ' + h * 60 + ' + ' + m + ' = ' + r + '.']; },
        function () { var s = ri(2, 6), r = s * 7; return ['<b>' + s + ' semanas</b> têm quantos dias?', r + ' dias', [(s * 5) + ' dias', (r + 7) + ' dias', (s + 7) + ' dias'], s + ' × 7 = ' + r + '.']; },
        function () { var m = pick([120, 180, 240, 90, 150]), H = Math.floor(m / 60), M = m % 60, r = H + ' hora' + (H > 1 ? 's' : '') + (M ? ' e ' + M + ' minutos' : ''); return ['<b>' + m + ' minutos</b> são:', r, [(m / 100) + ' horas', (H + 1) + ' horas', H + ' hora' + (H > 1 ? 's' : '') + ' e ' + (M + 10) + ' minutos'], 'Cada 60 minutos = 1 hora. ' + m + ' = ' + (H * 60) + ' + ' + M + '.']; },
        function () { var d2 = ri(2, 4), r = d2 * 24; return ['<b>' + d2 + ' dias</b> têm quantas horas?', r + ' horas', [(d2 * 12) + ' horas', (d2 * 60) + ' horas', (r + 24) + ' horas'], '1 dia = 24 horas. ' + d2 + ' × 24 = ' + r + '.']; }
      ])();
      return { key: 'tconv' + it[0], q: it[0], o: opts(it[1], it[2], function () { return ri(10, 99) + ' minutos'; }), a: 0,
        h: ['1 hora = 60 minutos; 1 dia = 24 horas; 1 semana = 7 dias.', 'Multiplique (ou divida) usando essas relações.'], e: it[3] + ' Resposta: <b>' + it[1] + '</b>.' };
    }
  ];

  /* ---------- m_dinheiro ---------- */
  G.m_dinheiro = [
    function (d) { // troco
      var pago = pick([1000, 2000, 5000]), preco = ri(Math.floor(pago * 0.3 / 5), Math.floor(pago * 0.95 / 5)) * 5;
      if (d === 1) preco = Math.round(preco / 50) * 50;
      if (preco >= pago) preco = pago - 150;
      var r = pago - preco;
      var o = opts(brl(r), [brl(r + 100), brl(Math.abs(r - 50)), brl(pago + preco)], function () { return brl(r + ri(1, 9) * 10); });
      var item = pick(['um livro', 'uma bola', 'um lanche', 'um álbum de figurinhas', 'um brinquedo']);
      return { key: 'troco' + pago + '-' + preco, q: 'Theo comprou ' + item + ' por <b>' + brl(preco) + '</b> e pagou com uma cédula de <b>' + brl(pago) + '</b>. Quanto recebeu de troco?', o: o, a: 0,
        h: ['Troco = valor pago − preço.', 'Dica: complete de ' + brl(preco) + ' até ' + brl(pago) + '.'],
        e: brl(pago) + ' − ' + brl(preco) + ' = <b>' + brl(r) + '</b>. Confira: ' + brl(preco) + ' + ' + brl(r) + ' = ' + brl(pago) + '.' };
    },
    function (d) { // contar dinheiro
      var notas = [200, 500, 1000, 2000, 5000], moedas = [5, 10, 25, 50, 100];
      var itens = [], tot = 0, desc = [];
      var nn = ri(1, 3);
      for (var i = 0; i < nn; i++) { var v = pick(notas), q = ri(1, 3); tot += v * q; desc.push(q + ' cédula' + (q > 1 ? 's' : '') + ' de ' + brl(v)); for (var j = 0; j < q; j++) itens.push('n' + v / 100); }
      var mv = pick(moedas), mq = ri(1, 4); tot += mv * mq;
      desc.push(mq + ' moeda' + (mq > 1 ? 's' : '') + ' de ' + (mv === 100 ? 'R$ 1,00' : mv + ' centavos'));
      for (var k = 0; k < mq; k++) itens.push(mv === 100 ? 'c100' : 'c' + mv);
      var o = opts(brl(tot), [brl(tot + mv), brl(tot - mv * mq + mq * 10), brl(tot + 500)], function () { return brl(tot + ri(1, 20) * 5); });
      return { key: 'cnt' + desc.join(), q: 'Quanto dinheiro há ao todo?<br>' + desc.join(', ') + '.', fig: { t: 'money', items: itens }, o: o, a: 0,
        h: ['Some primeiro as cédulas.', 'Depois some as moedas. Lembre: 100 centavos = R$ 1,00.'],
        e: 'Somando tudo: <b>' + brl(tot) + '</b>.' };
    },
    function (d) { // preço × quantidade
      var p = ri(1, 9) * 100 + pick([0, 50, 25, 75]), q = ri(2, 6), r = p * q;
      var item = pick(['picolé', 'caderno', 'suco', 'pacote de figurinhas', 'pão de queijo']);
      var o = opts(brl(r), [brl(p + q * 100), brl(r - p), brl(r + 100)], function () { return brl(r + ri(1, 9) * 25); });
      return { key: 'pq' + p + 'x' + q, q: 'Cada ' + item + ' custa <b>' + brl(p) + '</b>. Quanto custam <b>' + q + '</b>?', o: o, a: 0,
        h: ['Multiplique o preço pela quantidade.', 'Faça separado: reais × ' + q + ' e centavos × ' + q + '.'],
        e: q + ' × ' + brl(p) + ' = <b>' + brl(r) + '</b>.' };
    }
  ];

  /* ---------- m_graf ---------- */
  var cats = [
    ['Fruta preferida', ['Banana', 'Maçã', 'Uva', 'Manga'], 'alunos'],
    ['Esporte preferido', ['Futebol', 'Vôlei', 'Natação', 'Basquete'], 'alunos'],
    ['Livros lidos no mês', ['Ana', 'Beto', 'Caio', 'Duda'], 'livros'],
    ['Gols no campeonato', ['Leões', 'Águias', 'Tubarões', 'Lobos'], 'gols']
  ];
  G.m_graf = [
    function (d) {
      var c = pick(cats), step = d === 1 ? 1 : 2, vals = c[1].map(function () { return ri(1, 7) * step; });
      while (new Set(vals).size < 4) vals = c[1].map(function () { return ri(1, 7) * step; });
      var tipo = d === 1 ? 'max' : pick(['dif', 'tot', 'max', 'min']);
      var iMax = vals.indexOf(Math.max.apply(null, vals)), iMin = vals.indexOf(Math.min.apply(null, vals));
      var fig = { t: 'bars', title: c[0], labels: c[1], values: vals, show: d === 1, step: step, horiz: Math.random() < .3 };
      var q, o, e, hh;
      if (tipo === 'max' || tipo === 'min') {
        var i = tipo === 'max' ? iMax : iMin;
        q = 'De acordo com o gráfico, qual teve o <b>' + (tipo === 'max' ? 'maior' : 'menor') + '</b> número de ' + c[2] + '?';
        o = [c[1][i]].concat(c[1].filter(function (x, j) { return j !== i; }));
        e = 'A ' + (fig.horiz ? 'barra' : 'coluna') + ' mais ' + (tipo === 'max' ? 'comprida' : 'curta') + ' é a de <b>' + c[1][i] + '</b>, com ' + vals[i] + ' ' + c[2] + '.';
        hh = ['Compare o tamanho das ' + (fig.horiz ? 'barras' : 'colunas') + '.', 'Procure a ' + (tipo === 'max' ? 'maior' : 'menor') + '.'];
      } else if (tipo === 'dif') {
        var a = iMax, b = iMin, r = vals[a] - vals[b];
        q = 'Quantos ' + c[2] + ' <b>' + c[1][a] + '</b> tem a mais que <b>' + c[1][b] + '</b>?';
        o = opts(String(r), [String(vals[a] + vals[b]), String(vals[a]), String(r + step)], function () { return String(r + ri(1, 5)); });
        e = c[1][a] + ': ' + vals[a] + '. ' + c[1][b] + ': ' + vals[b] + '. ' + vals[a] + ' − ' + vals[b] + ' = <b>' + r + '</b>.';
        hh = ['Leia o valor de cada um no gráfico (use as linhas de guia).', '"A mais" é subtração.'];
      } else {
        var t = vals.reduce(function (s, v) { return s + v; }, 0);
        q = 'Qual é o <b>total</b> de ' + c[2] + ' mostrado no gráfico?';
        o = opts(String(t), [String(t - vals[0]), String(t + step), String(Math.max.apply(null, vals))], function () { return String(t + ri(1, 6)); });
        e = vals.join(' + ') + ' = <b>' + t + '</b>.';
        hh = ['Leia o valor de cada ' + (fig.horiz ? 'barra' : 'coluna') + '.', 'Some todos os valores.'];
      }
      return { key: 'bar' + c[0] + vals.join() + tipo, q: q, fig: fig, o: o, a: 0, h: hh, e: e };
    },
    function (d) { // pictórico
      var k = pick([2, 5, 10]);
      var ctx = pick([
        { title: 'Livros emprestados na biblioteca', labels: ['Segunda', 'Terça', 'Quarta', 'Quinta'], icon: '📚', q: function (l) { return 'Quantos livros foram emprestados na <b>' + l.toLowerCase() + '</b>?'; } },
        { title: 'Maçãs colhidas por turma', labels: ['4º A', '4º B', '5º A', '5º B'], icon: '🍎', q: function (l) { return 'Quantas maçãs o <b>' + l + '</b> colheu?'; } },
        { title: 'Gols marcados por time', labels: ['Leões', 'Águias', 'Lobos', 'Tubarões'], icon: '⚽', q: function (l) { return 'Quantos gols marcou o time <b>' + l + '</b>?'; } }
      ]);
      var labels = ctx.labels, icon = ctx.icon;
      var counts = labels.map(function () { return ri(1, 6); });
      var i = ri(0, 3), r = counts[i] * k;
      var o = opts(String(r), [String(counts[i]), String(r + k), String(counts[i] + k)], function () { return String(r + ri(1, 4)); });
      return { key: 'pic' + k + counts.join() + i + icon, q: 'No gráfico, cada ' + icon + ' vale <b>' + k + '</b>. ' + ctx.q(labels[i]), fig: { t: 'picto', title: ctx.title, labels: labels, counts: counts, icon: icon, k: k }, o: o, a: 0,
        h: ['Conte as figuras de ' + labels[i] + '.', 'Multiplique pelo valor da legenda (' + k + ').'],
        e: labels[i] + ' tem ' + counts[i] + ' figura' + (counts[i] > 1 ? 's' : '') + ' × ' + k + ' = <b>' + r + '</b>.', w: { 1: 'Você contou as figuras, mas esqueceu de multiplicar pelo valor de cada uma (' + k + ').' } };
    },
    function (d) { // dupla entrada
      var rows = ['4º A', '4º B', '5º A'], cols = pick([['Meninos', 'Meninas'], ['Manhã', 'Tarde']]);
      var data = rows.map(function () { return [ri(8, 18), ri(8, 18)]; });
      var tipo = pick(['cel', 'lin', 'col']), r, q, e;
      var ri2 = ri(0, 2), ci = ri(0, 1);
      if (tipo === 'cel') { r = data[ri2][ci]; q = 'Na tabela, quantos(as) <b>' + cols[ci].toLowerCase() + '</b> há no <b>' + rows[ri2] + '</b>?'; e = 'Cruzando a linha ' + rows[ri2] + ' com a coluna ' + cols[ci] + ': <b>' + r + '</b>.'; }
      else if (tipo === 'lin') { r = data[ri2][0] + data[ri2][1]; q = 'Quantos alunos há no <b>' + rows[ri2] + '</b> ao todo?'; e = data[ri2][0] + ' + ' + data[ri2][1] + ' = <b>' + r + '</b>.'; }
      else { r = data[0][ci] + data[1][ci] + data[2][ci]; q = 'Qual o total da coluna <b>' + cols[ci] + '</b> nas três turmas?'; e = data.map(function (x) { return x[ci]; }).join(' + ') + ' = <b>' + r + '</b>.'; }
      var o = opts(String(r), [String(data[ri2][1 - ci]), String(r + 2), String(r - 1)], function () { return String(r + ri(3, 9)); });
      return { key: 'tab' + JSON.stringify(data) + tipo + ri2 + ci, q: q, fig: { t: 'table', head: ['Turma'].concat(cols), rows: data.map(function (x, i) { return [rows[i], String(x[0]), String(x[1])]; }) }, o: o, a: 0,
        h: ['Encontre a linha e a coluna certas.', tipo === 'cel' ? 'O número está no cruzamento.' : 'Some os números indicados.'], e: e };
    }
  ];

  G.m_solidos = []; // apenas questões fixas
  return { G: G, extenso: extenso, brl: brl, fmt: fmt };
})();

// gera uma questão nova de um assunto (ou null se o assunto não tem gerador)
function generateQuestion(topicId, d) {
  var list = GEN.G[topicId];
  if (!list || !list.length) return null;
  var f = list[Math.floor(Math.random() * list.length)];
  var q = f(d || 2);
  q.id = 'g:' + topicId + ':' + q.key;
  q.t = topicId; q.d = d || 2; q.gen = true;
  return q;
}
