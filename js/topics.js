/* Assuntos e lições do Modo Aprender.
   origem:
   - 'edital'       : tópico enfatizado no regulamento para quem ingressa no 5º ano em 2027
   - 'anteriores'   : conteúdo listado no regulamento para séries anteriores (pode ser cobrado)
   - 'complementar' : revisão de apoio identificada nos estudos (não é transcrição do edital)
*/
var ORIGENS = {
  edital: { rotulo: 'Edital (5º ano)', cor: 'edital' },
  anteriores: { rotulo: 'Anos anteriores', cor: 'anteriores' },
  complementar: { rotulo: 'Revisão complementar', cor: 'complementar' }
};

var TOPICS = [
  /* ---------------- MATEMÁTICA ---------------- */
  {
    id: 'm_frac', s: 'mat', nome: 'Frações', icone: '🍕', origem: 'edital', prioridade: 1,
    desc: 'Numerador, denominador e frações unitárias (1/2, 1/3, 1/4, 1/5, 1/10 e 1/100).',
    licao: {
      cards: [
        { t: 'O que é uma fração?', h: 'Fração é <b>uma parte de um inteiro</b> que foi dividido em <b>partes IGUAIS</b>.<br>Pense numa pizza cortada em 4 pedaços do mesmo tamanho: cada pedaço é <b>1/4</b> (um quarto) da pizza.', fig: { t: 'frac', n: 1, d: 4, shape: 'pizza' } },
        { t: 'Numerador e denominador', h: '<div class="fracbig"><span class="num">3</span><span class="bar"></span><span class="den">8</span></div><b>Embaixo (denominador):</b> em quantas partes iguais o inteiro foi dividido → 8.<br><b>Em cima (numerador):</b> quantas partes estamos considerando → 3.<br>Dica para lembrar: o <b>D</b>enominador fica <b>D</b>embaixo... quer dizer, embaixo! 😄', fig: { t: 'frac', n: 3, d: 8, shape: 'bar' } },
        { t: 'Nomes das frações', h: '<table class="mini"><tr><td>1/2</td><td>um meio (metade)</td></tr><tr><td>1/3</td><td>um terço</td></tr><tr><td>1/4</td><td>um quarto</td></tr><tr><td>1/5</td><td>um quinto</td></tr><tr><td>1/10</td><td>um décimo</td></tr><tr><td>1/100</td><td>um centésimo</td></tr></table>' },
        { t: 'Qual pedaço é maior?', h: 'Quando o numerador é 1, <b>quanto MAIOR o denominador, MENOR o pedaço</b>.<br>Dividir uma barra de chocolate entre 2 pessoas dá pedaços maiores do que dividir entre 10!<br><b>1/2 &gt; 1/3 &gt; 1/4 &gt; 1/5 &gt; 1/10 &gt; 1/100</b>', fig: { t: 'fraccompare', ds: [2, 4, 10] } },
        { t: 'Fração de uma quantidade', h: 'Para achar <b>1/4 de 20</b>, divida 20 em 4 grupos iguais: <b>20 ÷ 4 = 5</b>.<br>Outros exemplos úteis:<br>• 1/2 hora = 30 minutos • 1/4 de hora = 15 minutos<br>• 1/10 de R$ 1,00 = 10 centavos • 1/100 de R$ 1,00 = 1 centavo<br>• 1/100 de 1 metro = 1 centímetro • 1/2 litro = 500 mL' }
      ],
      exemplo: { q: 'Bia tem 18 balas e deu <b>1/3</b> delas para o irmão. Quantas balas o irmão ganhou?', passos: ['O denominador 3 diz: dividir as 18 balas em <b>3 grupos iguais</b>.', '18 ÷ 3 = 6. Cada grupo tem 6 balas.', 'O numerador 1 diz: pegar <b>1 grupo</b>. O irmão ganhou <b>6 balas</b>. ✅'] },
      guiado: { q: 'Que fração da pizza está pintada?', fig: { t: 'frac', n: 1, d: 4, shape: 'pizza' }, o: ['1/4', '1/3', '4/1', '3/4'], a: 0, h: ['Conte em quantas partes iguais a pizza foi dividida. Esse número vai embaixo.', 'A pizza tem 4 partes e 1 está pintada: o 1 vai em cima.'], e: 'A pizza foi dividida em 4 partes iguais (denominador 4) e 1 parte está pintada (numerador 1): <b>1/4</b>.' },
      resumo: ['Fração = parte de um inteiro dividido em partes iguais.', 'Denominador (embaixo): em quantas partes dividi. Numerador (em cima): quantas partes peguei.', 'Com numerador 1: denominador maior = pedaço menor.', 'Fração de quantidade: divida pelo denominador (1/4 de 20 = 20 ÷ 4 = 5).']
    }
  },
  {
    id: 'm_num', s: 'mat', nome: 'Números até 99.999', icone: '🔢', origem: 'edital', prioridade: 3,
    desc: 'Leitura, escrita, valor posicional, comparação, composição e decomposição de números de até cinco ordens.',
    licao: {
      cards: [
        { t: 'Cada lugar tem um valor', h: 'No número <b>47.305</b>, cada algarismo vale conforme a <b>posição</b> (ordem) em que está:', fig: { t: 'place', n: 47305 } },
        { t: 'Decompor é desmontar', h: '47.305 = 40.000 + 7.000 + 300 + 5<br>ou, usando multiplicações por 10, 100, 1.000...:<br>47.305 = 4 × 10.000 + 7 × 1.000 + 3 × 100 + 5 × 1' },
        { t: 'O papel do zero', h: 'O zero <b>guarda o lugar</b> de uma ordem vazia. Em 47.305 não há dezenas, por isso aparece o 0.<br>Sem ele, teríamos 4.735 — um número bem diferente!' },
        { t: 'Ler e comparar', h: '47.305 lê-se: <b>quarenta e sete mil trezentos e cinco</b>.<br>Para comparar, olhe primeiro a quantidade de algarismos. Se for igual, compare da <b>esquerda para a direita</b>:<br>52.180 &gt; 51.999, porque 2 milhares &gt; 1 milhar.' }
      ],
      exemplo: { q: 'Qual é o valor do algarismo <b>8</b> no número <b>58.214</b>?', passos: ['Contando da direita: 4 (unidades), 1 (dezenas), 2 (centenas), <b>8 (unidades de milhar)</b>, 5 (dezenas de milhar).', 'O 8 está nas unidades de milhar: vale 8 × 1.000.', 'Valor = <b>8.000</b>. ✅'] },
      guiado: { q: 'Qual é o valor do algarismo <b>6</b> no número <b>36.902</b>?', o: ['6.000', '6', '600', '60.000'], a: 0, h: ['Comece pela direita: 2 é unidade, 0 é dezena, 9 é centena...', 'O 6 está na casa das unidades de milhar.'], e: 'Em 36.902 o 6 ocupa as unidades de milhar, então vale 6 × 1.000 = <b>6.000</b>.' },
      resumo: ['O valor do algarismo depende da posição.', 'Decompor: 47.305 = 40.000 + 7.000 + 300 + 5.', 'O zero guarda o lugar da ordem vazia.', 'Compare da esquerda para a direita.']
    }
  },
  {
    id: 'm_ops', s: 'mat', nome: 'Operações e problemas', icone: '➗', origem: 'edital', prioridade: 4,
    desc: 'Adição, subtração, multiplicação e divisão: estratégias de cálculo e problemas.',
    licao: {
      cards: [
        { t: 'Que conta eu faço?', h: '<b>+ Adição:</b> juntar, acrescentar, ganhar.<br><b>− Subtração:</b> tirar, perder, comparar ("quanto a mais?"), completar ("quanto falta?").<br><b>× Multiplicação:</b> grupos iguais, fileiras e colunas, "o dobro", "o triplo".<br><b>÷ Divisão:</b> repartir igualmente, "quantas vezes cabe?".' },
        { t: 'Multiplicar em partes', h: 'Para fazer <b>23 × 4</b> de cabeça, separe o 23 em 20 + 3:<br>20 × 4 = 80<br>3 × 4 = 12<br>80 + 12 = <b>92</b>' },
        { t: 'Truques que ajudam', h: '• A ordem não muda o resultado: 7 × 8 = 8 × 7.<br>• × 10: acrescente um zero (46 × 10 = 460). × 100: dois zeros.<br>• Fileiras: 6 fileiras com 9 cadeiras = 6 × 9 = 54.', fig: { t: 'array', r: 3, c: 5 } },
        { t: 'Divisão com resto', h: '25 balas para 4 crianças: 4 × 6 = 24, então cada uma ganha <b>6</b> e <b>sobra 1</b>.<br>Atenção! Se 30 pessoas vão em vans de 8 lugares: 3 vans levam 24 e sobram 6 pessoas — precisa de <b>4 vans</b>.' }
      ],
      exemplo: { q: 'Uma escola comprou <b>6 caixas</b> com <b>24 bolas</b> em cada uma. Quantas bolas ao todo?', passos: ['São grupos iguais → multiplicação: 24 × 6.', 'Separe: 20 × 6 = 120 e 4 × 6 = 24.', '120 + 24 = <b>144 bolas</b>. ✅'] },
      guiado: { q: '<b>84 figurinhas</b> serão repartidas igualmente entre <b>4 amigos</b>. Quantas cada um recebe?', o: ['21', '80', '88', '24'], a: 0, h: ['Repartir igualmente é divisão: 84 ÷ 4.', 'Separe 84 em 80 + 4. Quanto é 80 ÷ 4? E 4 ÷ 4?'], e: '84 ÷ 4: 80 ÷ 4 = 20 e 4 ÷ 4 = 1, então cada amigo recebe <b>21</b>. Confira: 21 × 4 = 84.' },
      resumo: ['Leia o problema e descubra a ação: juntar, tirar, grupos iguais ou repartir.', 'Multiplique em partes: 23 × 4 = 20 × 4 + 3 × 4.', 'Na divisão, pense no resto e no que o problema pede.']
    }
  },
  {
    id: 'm_seq', s: 'mat', nome: 'Sequências e múltiplos', icone: '🔁', origem: 'edital', prioridade: 2,
    desc: 'Descobrir a regra de sequências, termos que faltam e múltiplos de um número.',
    licao: {
      cards: [
        { t: 'Toda sequência tem uma regra', h: '<span class="seq">5 → 10 → 15 → 20 → 25</span>Regra: <b>somar 5</b> a cada termo.<br>Para descobrir a regra, veja <b>quanto aumenta (ou diminui)</b> de um número para o próximo.' },
        { t: 'Múltiplos', h: 'Os <b>múltiplos de 4</b> são os resultados da tabuada do 4:<br><span class="seq">0, 4, 8, 12, 16, 20, 24...</span>Um número é múltiplo de 4 quando a divisão por 4 <b>não deixa resto</b>.<br>Dica: todo múltiplo de 2 é par; múltiplos de 5 terminam em 0 ou 5; múltiplos de 10 terminam em 0.' },
        { t: 'Termo que falta', h: '<span class="seq">7, 14, 21, __, 35</span>De 7 para 14 aumentou 7; de 14 para 21 também. Então o próximo é 21 + 7 = <b>28</b>. É a sequência dos múltiplos de 7!' }
      ],
      exemplo: { q: 'Qual é o 8º termo da sequência <b>6, 12, 18, 24, ...</b>?', passos: ['A regra é somar 6: são os múltiplos de 6.', 'O 1º termo é 6 × 1, o 2º é 6 × 2... então o 8º é 6 × 8.', '6 × 8 = <b>48</b>. ✅'] },
      guiado: { q: 'Qual número continua a sequência <b>3, 6, 9, 12, __</b>?', o: ['15', '13', '14', '18'], a: 0, h: ['Quanto aumenta de 3 para 6? E de 6 para 9?', 'Sempre +3. Então 12 + 3 = ?'], e: 'A regra é somar 3 (múltiplos de 3): 12 + 3 = <b>15</b>.' },
      resumo: ['Descubra a regra olhando a diferença entre termos vizinhos.', 'Múltiplos de um número = tabuada dele.', 'O termo de posição n numa sequência de múltiplos de k é k × n.']
    }
  },
  {
    id: 'm_loc', s: 'mat', nome: 'Localização, paralelas e perpendiculares', icone: '🧭', origem: 'edital', prioridade: 5,
    desc: 'Pontos de referência, direção e sentido em malhas; retas paralelas e perpendiculares.',
    licao: {
      cards: [
        { t: 'Mapa com coordenadas', h: 'Numa malha, cada casa tem um "endereço": a <b>letra da coluna</b> e o <b>número da linha</b>. Como no jogo de batalha naval!<br>Aqui a bola está em <b>C2</b> e o baú do tesouro em <b>E4</b>.', fig: { t: 'grid', cols: 5, rows: 5, items: [{ c: 3, r: 2, e: '⚽' }, { c: 5, r: 4, e: '🧰' }] } },
        { t: 'Direção e sentido', h: 'Direita, esquerda, para cima, para baixo, frente, trás.<br>Pontos cardeais: <b>Norte</b> (em cima no mapa), <b>Sul</b>, <b>Leste</b> (direita) e <b>Oeste</b> (esquerda).<br>Olhando para o Norte, se virar à direita você fica de frente para o Leste. Meia-volta: fica de frente para o Sul.' },
        { t: 'Paralelas', h: 'Retas <b>paralelas</b> seguem lado a lado e <b>nunca se encontram</b>, como os trilhos do trem.', fig: { t: 'lines', kind: 'par' } },
        { t: 'Perpendiculares', h: 'Retas <b>perpendiculares</b> se cruzam formando um <b>ângulo reto</b> (o "cantinho" de 90°, como o canto de uma folha ou do quadrado).<br>Se elas se cruzam "tortas", são apenas <b>concorrentes</b>.', fig: { t: 'lines', kind: 'perp' } }
      ],
      exemplo: { q: 'Na malha do mapa, a bola está em <b>C2</b>. Se ela for movida <b>2 casas para a direita</b> e <b>2 casas para cima</b>, onde ficará?', fig: { t: 'grid', cols: 5, rows: 5, items: [{ c: 3, r: 2, e: '⚽' }, { c: 5, r: 4, e: '🧰' }] }, passos: ['Para a direita muda a letra: C → D → <b>E</b>.', 'Para cima muda o número: 2 → 3 → <b>4</b>.', 'A bola chega em <b>E4</b>, bem no baú! ✅'] },
      guiado: { q: 'Os dois trilhos de uma linha de trem representam retas:', o: ['paralelas', 'perpendiculares', 'que se cruzam', 'curvas que se encontram'], a: 0, h: ['Os trilhos alguma vez se encontram?', 'Retas que nunca se encontram têm um nome especial.'], e: 'Os trilhos ficam sempre à mesma distância e nunca se encontram: são <b>paralelos</b>.' },
      resumo: ['Coordenadas: letra da coluna + número da linha.', 'Paralelas nunca se encontram.', 'Perpendiculares se cruzam em ângulo reto.']
    }
  },
  {
    id: 'm_solidos', s: 'mat', nome: 'Prismas, pirâmides e planificações', icone: '🧊', origem: 'edital', prioridade: 6,
    desc: 'Reconhecer prismas e pirâmides, contar faces, arestas e vértices e identificar planificações.',
    licao: {
      cards: [
        { t: 'Faces, arestas e vértices', h: '<b>Face:</b> cada "lado" plano do sólido.<br><b>Aresta:</b> a linha onde duas faces se encontram.<br><b>Vértice:</b> o "bico", ponto onde as arestas se encontram.<br>O <b>cubo</b> tem 6 faces, 12 arestas e 8 vértices.' },
        { t: 'Prisma', h: 'Tem <b>duas bases iguais</b>, uma em cima e outra embaixo, e faces laterais retangulares.<br>Exemplos: cubo, caixa de sapato (bloco retangular), barraca em forma de prisma triangular.<br>O nome vem da base: prisma de base triangular, quadrada, retangular...', fig: { t: 'net', kind: 'prism3' } },
        { t: 'Pirâmide', h: 'Tem <b>uma só base</b> e faces laterais <b>triangulares</b> que se encontram num ponto lá em cima.<br>Pirâmide de base quadrada: 5 faces, 8 arestas e 5 vértices.', fig: { t: 'net', kind: 'pyr4' } },
        { t: 'Planificação', h: 'É o sólido "aberto" e esticado no papel, como desmontar uma caixa.<br>Esta é a planificação de um <b>cubo</b>: 6 quadrados.<br>Cilindros, cones e esferas são <b>corpos redondos</b> e rolam.', fig: { t: 'net', kind: 'cube' } }
      ],
      exemplo: { q: 'Quantas faces tem uma <b>pirâmide de base quadrada</b>?', passos: ['Ela tem 1 base: um quadrado.', 'Cada lado do quadrado tem um triângulo: são 4 triângulos.', '1 + 4 = <b>5 faces</b>. ✅'] },
      guiado: { q: 'Esta planificação forma qual sólido?', fig: { t: 'net', kind: 'pyr4' }, o: ['Pirâmide de base quadrada', 'Cubo', 'Prisma de base triangular', 'Cilindro'], a: 0, h: ['Quantas bases há? E qual a forma das faces laterais?', 'Um quadrado com triângulos em volta... os triângulos se fecham num bico.'], e: 'Um quadrado (base) e 4 triângulos que se encontram num ponto formam a <b>pirâmide de base quadrada</b>.' },
      resumo: ['Prisma: 2 bases iguais e faces laterais retangulares.', 'Pirâmide: 1 base e faces laterais triangulares.', 'Planificação = o sólido aberto no papel.']
    }
  },
  {
    id: 'm_medidas', s: 'mat', nome: 'Comprimento, massa e capacidade', icone: '📏', origem: 'edital', prioridade: 7,
    desc: 'Unidades mais usadas, instrumentos de medida, conversões simples e estimativas.',
    licao: {
      cards: [
        { t: 'Comprimento', h: 'Instrumentos: régua, fita métrica, trena.<br><b>1 km = 1.000 m</b> • <b>1 m = 100 cm</b> • <b>1 cm = 10 mm</b><br>Uma porta tem cerca de 2 m de altura; um lápis, uns 15 cm.' },
        { t: 'Massa ("peso")', h: 'Instrumento: balança.<br><b>1 kg = 1.000 g</b> • meio quilo = 500 g • 1 tonelada = 1.000 kg<br>Um pacote de arroz comum tem 5 kg; uma bala, poucos gramas.' },
        { t: 'Capacidade', h: 'Quanto cabe de líquido em um recipiente.<br><b>1 L = 1.000 mL</b> • meio litro = 500 mL<br>Uma garrafa de refrigerante grande tem 2 L; uma colher de remédio, poucos mL.' },
        { t: 'Estimar', h: 'Estimar é dar um valor aproximado que faça sentido. Pergunte-se: "Isso é do tamanho de quê?"<br>A distância entre cidades é em <b>km</b>; o tamanho de uma formiga, em <b>mm</b>.' }
      ],
      exemplo: { q: 'Uma jarra tem <b>2 L</b> de suco. Quantos copos de <b>250 mL</b> dá para encher?', passos: ['Transforme para a mesma unidade: 2 L = 2.000 mL.', 'Quantas vezes 250 cabe em 2.000? 4 copos = 1.000 mL.', 'Então 2.000 mL = 8 copos. Resposta: <b>8 copos</b>. ✅'] },
      guiado: { q: '<b>1 metro e meio</b> é igual a quantos centímetros?', o: ['150 cm', '105 cm', '15 cm', '1.500 cm'], a: 0, h: ['1 metro tem 100 cm.', 'Meio metro é metade de 100 cm.'], e: '1 m = 100 cm e meio metro = 50 cm. Total: <b>150 cm</b>.' },
      resumo: ['1 km = 1.000 m; 1 m = 100 cm; 1 cm = 10 mm.', '1 kg = 1.000 g.', '1 L = 1.000 mL.', 'Converta para a mesma unidade antes de calcular.']
    }
  },
  {
    id: 'm_tempo', s: 'mat', nome: 'Medidas de tempo', icone: '⏰', origem: 'edital', prioridade: 8,
    desc: 'Relógios digitais e analógicos, duração de eventos e relação entre unidades de tempo.',
    licao: {
      cards: [
        { t: 'Unidades de tempo', h: '1 minuto = 60 segundos • <b>1 hora = 60 minutos</b> • 1 dia = 24 horas<br>1 semana = 7 dias • 1 ano = 12 meses (365 dias; 366 no ano bissexto)<br>Meia hora = 30 min • um quarto de hora = 15 min' },
        { t: 'Relógio de ponteiros', h: 'O ponteiro <b>pequeno</b> mostra a hora; o <b>grande</b>, os minutos.<br>Cada número que o ponteiro grande passa vale <b>5 minutos</b>.<br>Este relógio marca <b>3h15</b> (três e quinze).', fig: { t: 'clock', h: 3, m: 15 } },
        { t: 'Relógio digital', h: '<b>14:30</b> = duas e meia da tarde. Depois do meio-dia, some 12: 14h é 2h da tarde.<br><b>16:45</b> = quinze para as cinco da tarde.' },
        { t: 'Quanto tempo durou?', h: 'Conte em pedaços até horas "redondas".<br>Das <b>14:40</b> às <b>16:15</b>:<br>14:40 → 15:00 = 20 min<br>15:00 → 16:00 = 60 min<br>16:00 → 16:15 = 15 min<br>Total: 95 min = <b>1 h 35 min</b>' }
      ],
      exemplo: { q: 'Um jogo de futebol começou às <b>16:00</b> e durou <b>1 hora e 50 minutos</b> (com o intervalo). A que horas terminou?', passos: ['16:00 + 1 hora = 17:00.', '17:00 + 50 minutos = 17:50.', 'Terminou às <b>17:50</b>. ✅'] },
      guiado: { q: 'Que horas o relógio está marcando?', fig: { t: 'clock', h: 8, m: 30 }, o: ['8:30', '6:40', '9:30', '8:06'], a: 0, h: ['O ponteiro pequeno está entre o 8 e o 9: ainda são 8 e pouco.', 'O ponteiro grande está no 6: 6 × 5 = ? minutos.'], e: 'Ponteiro pequeno entre 8 e 9 → 8 horas. Ponteiro grande no 6 → 6 × 5 = 30 minutos. São <b>8:30</b>.' },
      resumo: ['1 h = 60 min; 1 dia = 24 h.', 'Ponteiro grande: cada número = 5 minutos.', 'Para durações, conte até horas redondas.']
    }
  },
  {
    id: 'm_dinheiro', s: 'mat', nome: 'Sistema monetário', icone: '💰', origem: 'edital', prioridade: 9,
    desc: 'Cédulas e moedas do real, troco e problemas com dinheiro.',
    licao: {
      cards: [
        { t: 'Nosso dinheiro: o real', h: '<b>Cédulas:</b> R$ 2, R$ 5, R$ 10, R$ 20, R$ 50, R$ 100 e R$ 200.<br><b>Moedas:</b> 5, 10, 25 e 50 centavos e R$ 1.<br><b>R$ 1,00 = 100 centavos</b>.', fig: { t: 'money', items: ['n20', 'n5', 'c50', 'c25'] } },
        { t: 'Como escrever', h: 'R$ 12,50 = doze reais e cinquenta centavos.<br>Os números depois da vírgula são os centavos.<br>R$ 0,75 = setenta e cinco centavos.' },
        { t: 'Troco', h: 'Troco = valor pago − preço.<br>Dica: "complete" até o valor pago.<br>Comprei por R$ 17,50 e paguei com R$ 20,00:<br>17,50 → 18,00 (+ 0,50) → 20,00 (+ 2,00). Troco: <b>R$ 2,50</b>.' }
      ],
      exemplo: { q: 'Cada picolé custa <b>R$ 3,50</b>. Quanto custam <b>4 picolés</b>?', passos: ['4 × R$ 3,00 = R$ 12,00.', '4 × R$ 0,50 = R$ 2,00.', 'R$ 12,00 + R$ 2,00 = <b>R$ 14,00</b>. ✅'] },
      guiado: { q: 'Quanto dinheiro há em <b>3 moedas de 25 centavos</b> e <b>1 moeda de 50 centavos</b>?', o: ['R$ 1,25', 'R$ 0,75', 'R$ 1,00', 'R$ 1,50'], a: 0, h: ['Comece pelas moedas de 25: 25 + 25 + 25 = ?', '75 centavos + 50 centavos = ? Lembre: 100 centavos = R$ 1,00.'], e: '3 × 25 = 75 centavos. 75 + 50 = 125 centavos = <b>R$ 1,25</b>.' },
      resumo: ['R$ 1,00 = 100 centavos.', 'Troco = pago − preço (complete até o valor pago).', 'Separe reais e centavos para calcular.']
    }
  },
  {
    id: 'm_graf', s: 'mat', nome: 'Tabelas e gráficos', icone: '📊', origem: 'edital', prioridade: 10,
    desc: 'Tabelas de dupla entrada, gráficos de colunas, barras e pictóricos.',
    licao: {
      cards: [
        { t: 'Leia o título primeiro', h: 'O título diz <b>do que trata</b> o gráfico. Depois veja o que significa cada eixo, coluna ou legenda.', fig: { t: 'bars', title: 'Esporte preferido da turma', labels: ['Futebol', 'Vôlei', 'Natação', 'Basquete'], values: [12, 6, 4, 8], show: true } },
        { t: 'Tabela de dupla entrada', h: 'Cruze a <b>linha</b> com a <b>coluna</b>, como no mapa.', fig: { t: 'table', head: ['Turma', 'Meninos', 'Meninas'], rows: [['4º A', '12', '14'], ['4º B', '15', '10']] } },
        { t: 'Gráfico pictórico', h: 'Cada figura vale uma quantidade. <b>Sempre leia a legenda!</b><br>Aqui ⚽ = 2 gols. O time Azul fez 3 bolinhas = 3 × 2 = <b>6 gols</b>.', fig: { t: 'picto', title: 'Gols no campeonato', labels: ['Azul', 'Verde'], counts: [3, 5], icon: '⚽', k: 2 } }
      ],
      exemplo: { q: 'No gráfico "Esporte preferido da turma", quantos alunos a mais preferem futebol do que vôlei?', fig: { t: 'bars', title: 'Esporte preferido da turma', labels: ['Futebol', 'Vôlei', 'Natação', 'Basquete'], values: [12, 6, 4, 8], show: true }, passos: ['Futebol: 12 alunos. Vôlei: 6 alunos.', '"Quantos a mais" é comparar → subtração.', '12 − 6 = <b>6 alunos a mais</b>. ✅'] },
      guiado: { q: 'Na tabela, quantos alunos há no 4º B ao todo?', fig: { t: 'table', head: ['Turma', 'Meninos', 'Meninas'], rows: [['4º A', '12', '14'], ['4º B', '15', '10']] }, o: ['25', '15', '26', '51'], a: 0, h: ['Encontre a linha do 4º B.', 'Some os meninos e as meninas dessa linha.'], e: 'Na linha do 4º B: 15 meninos + 10 meninas = <b>25 alunos</b>.' },
      resumo: ['Leia título, eixos e legenda.', 'Tabela de dupla entrada: cruze linha e coluna.', 'Pictórico: multiplique as figuras pelo valor da legenda.']
    }
  },

  /* ---------------- LÍNGUA PORTUGUESA ---------------- */
  {
    id: 'p_gram', s: 'por', nome: 'Classes de palavras', icone: '🏷️', origem: 'complementar', prioridade: 1,
    desc: 'Substantivo, artigo, adjetivo, pronome e verbo dentro das frases (revisão de apoio; relaciona-se a "morfossintaxe" da lista do 4º ano).',
    licao: {
      cards: [
        { t: 'Substantivo: o nome das coisas', h: 'Dá nome a <b>pessoas, animais, objetos, lugares e sentimentos</b>.<br>menino, cachorro, bola, Curitiba, alegria, medo.<br>Nomes próprios (Curitiba, Ana) começam com letra maiúscula.' },
        { t: 'Artigo: o ajudante que vem antes', h: 'Vem <b>antes do substantivo</b>.<br><b>o, a, os, as</b> → algo específico ("o mapa").<br><b>um, uma, uns, umas</b> → algo qualquer ("um mapa").' },
        { t: 'Adjetivo: dá característica', h: 'Diz <b>como é</b> o substantivo.<br>Uma árvore <b>enorme</b>. Um pirata <b>esperto</b>. A bola <b>nova</b>.<br>🔎 Teste: pergunte "Como é a árvore?" → <b>enorme</b>. Então "enorme" é adjetivo.' },
        { t: 'Pronome: o substituto', h: '<b>Substitui ou acompanha</b> o substantivo para não repetir.<br>"Lucas perdeu a bola. <b>Ele</b> ficou triste." → Ele = Lucas.<br>Pessoais: eu, tu, ele, ela, nós, vós, eles, elas.<br>Possessivos: meu, minha, seu, nosso... Demonstrativos: este, esse, aquele...<br>🔎 Teste: dá para trocar por um nome? Então é pronome.' },
        { t: 'Verbo: ação, estado ou natureza', h: '<b>Ação:</b> correr, chutar, escrever. <b>Estado:</b> ser, estar, ficar. <b>Fenômeno da natureza:</b> chover, ventar.<br>O verbo muda com o tempo: corri (passado), corro (presente), correrei (futuro).' },
        { t: 'Tudo junto numa frase', h: '', fig: { t: 'tagged', words: [['O', 'art'], ['menino', 'sub'], ['corajoso', 'adj'], ['encontrou', 'verb'], ['um', 'art'], ['mapa', 'sub'], ['.', 'x'], ['Ele', 'pron'], ['ficou', 'verb'], ['feliz', 'adj'], ['.', 'x']] } }
      ],
      exemplo: { q: 'Classifique as palavras de <b>"uma árvore enorme"</b>.', passos: ['<b>uma</b> vem antes do substantivo e indica "qualquer uma": artigo (indefinido).', '<b>árvore</b> é o nome de um ser: substantivo.', '<b>enorme</b> responde "Como é a árvore?": é o adjetivo que caracteriza "árvore". ✅ Não é pronome, porque não substitui nenhum nome.'] },
      guiado: { q: 'Leia: "A menina ganhou um cachorro brincalhão. <b>Ela</b> adorou o presente." A palavra <b>Ela</b> é:', o: ['pronome', 'adjetivo', 'artigo', 'verbo'], a: 0, h: ['"Ela" está no lugar de quem?', 'Uma palavra que substitui um nome para não repeti-lo é...'], e: '"Ela" substitui "a menina" para não repetir: é um <b>pronome</b> (pessoal).' },
      resumo: ['Substantivo nomeia; artigo vem antes dele.', 'Adjetivo responde "como é?".', 'Pronome substitui ou acompanha o nome.', 'Verbo indica ação, estado ou fenômeno e muda com o tempo.']
    }
  },
  {
    id: 'p_interp', s: 'por', nome: 'Leitura e interpretação', icone: '📖', origem: 'edital', prioridade: 2,
    desc: 'Encontrar informações explícitas e fazer inferências; estratégias de leitura e finalidade do texto.',
    licao: {
      cards: [
        { t: 'Informação explícita', h: 'Está <b>escrita</b> no texto. Basta voltar e procurar.<br>"Lia pegou o guarda-chuva." → O que Lia pegou? O guarda-chuva.' },
        { t: 'Inferência: ser detetive 🕵️', h: 'A resposta <b>não está escrita</b>, mas as <b>pistas</b> mostram.<br>"Lia abriu a janela e viu poças na rua." → O que aconteceu durante a noite? <b>Choveu</b>.' },
        { t: 'Estratégias de leitura', h: '1. Leia o <b>título</b> e imagine o assunto.<br>2. Leia a <b>pergunta</b> antes de reler o texto.<br>3. Volte ao trecho certo e <b>sublinhe</b> palavras-chave.<br>4. <b>Elimine</b> alternativas que o texto não diz.<br>5. Desconfie de alternativas com "sempre", "nunca", "todos" que o texto não confirma.' },
        { t: 'Para que serve o texto?', h: '<b>Notícia:</b> informar um fato. <b>Conto/fábula:</b> contar uma história. <b>Receita:</b> ensinar a fazer. <b>Convite/cartaz:</b> chamar para um evento. <b>Propaganda:</b> convencer.' }
      ],
      exemplo: { q: '"Quando o juiz apitou o fim do jogo, a torcida azul cantava e pulava, enquanto a torcida vermelha ficou em silêncio." Qual time provavelmente venceu?', passos: ['O texto não diz quem venceu: é uma inferência.', 'Pistas: a torcida azul <b>cantava e pulava</b> (comemoração); a vermelha ficou <b>em silêncio</b> (tristeza).', 'Conclusão: o <b>time azul</b> venceu. ✅'] },
      guiado: { q: '"Joana olhou o relógio, arregalou os olhos, pegou a mochila correndo e saiu sem tomar café." O que podemos concluir?', o: ['Joana estava atrasada.', 'Joana estava com sono.', 'Joana não gosta de café.', 'Joana perdeu a mochila.'], a: 0, h: ['Que pistas mostram pressa?', 'Ela olhou o relógio, correu e nem tomou café...'], e: 'Olhar o relógio assustada, correr e sair sem o café são pistas de que <b>Joana estava atrasada</b>.' },
      resumo: ['Explícita: está escrita. Inferência: descubro pelas pistas.', 'Leia a pergunta e volte ao texto.', 'Elimine o que o texto não diz.']
    }
  },
  {
    id: 'p_contexto', s: 'por', nome: 'Sentido das palavras', icone: '🔍', origem: 'edital', prioridade: 4,
    desc: 'Descobrir o sentido de palavras pelo contexto; sinônimos, antônimos e palavras com mais de um sentido.',
    licao: {
      cards: [
        { t: 'Pistas ao redor', h: 'Quando não conhecer uma palavra, leia a frase inteira e procure pistas.<br>"Depois de correr a tarde toda, o cachorro estava <b>exausto</b> e dormiu no tapete." → exausto = <b>muito cansado</b>.' },
        { t: 'Sinônimos e antônimos', h: '<b>Sinônimo:</b> sentido parecido (alegre ↔ contente).<br><b>Antônimo:</b> sentido oposto (corajoso ↔ medroso).<br>🔎 Teste: troque a palavra na frase. Se o sentido continua, é sinônimo.' },
        { t: 'Mais de um sentido', h: 'A mesma palavra muda de sentido conforme a frase:<br>"Comi uma <b>manga</b>." (fruta) • "Sujei a <b>manga</b> da camisa." (parte da roupa)<br>Expressões também: "deu um <b>banho de bola</b>" = jogou muito bem.' }
      ],
      exemplo: { q: '"Ana ficou <b>perplexa</b> ao ver o coelho falar." O que significa perplexa?', passos: ['Pista: um coelho falando é algo muito estranho.', 'Como alguém fica ao ver algo assim? Espantado, surpreso.', 'Perplexa = <b>muito surpresa, espantada</b>. ✅'] },
      guiado: { q: 'Qual é o <b>antônimo</b> (sentido oposto) de <b>corajoso</b>?', o: ['medroso', 'valente', 'forte', 'esperto'], a: 0, h: ['Antônimo é o contrário.', 'Quem não tem coragem é...'], e: 'O contrário de corajoso é <b>medroso</b>. "Valente" é sinônimo.' },
      resumo: ['Use as pistas da frase.', 'Sinônimo = parecido; antônimo = oposto.', 'A mesma palavra pode ter sentidos diferentes.']
    }
  },
  {
    id: 'p_discurso', s: 'por', nome: 'Discurso direto e indireto', icone: '💬', origem: 'edital', prioridade: 3,
    desc: 'Reconhecer e transformar falas de personagens.',
    licao: {
      cards: [
        { t: 'Discurso direto', h: 'O personagem fala <b>com as próprias palavras</b>. Usa <b>travessão (—)</b> ou aspas e, muitas vezes, dois-pontos e um verbo de dizer (disse, perguntou, gritou).<br>— Eu estou com fome! — disse Ana.' },
        { t: 'Discurso indireto', h: 'O <b>narrador conta</b> o que o personagem disse. Sem travessão; geralmente aparece <b>"que"</b> ou <b>"se"</b>.<br>Ana disse <b>que estava</b> com fome.' },
        { t: 'O que muda na transformação', h: '<table class="mini"><tr><th>Direto</th><th>Indireto</th></tr><tr><td>— <b>Eu estou</b> cansado — disse Léo.</td><td>Léo disse que <b>ele estava</b> cansado.</td></tr><tr><td>— <b>Vou</b> jogar — falou Bia.</td><td>Bia falou que <b>ia</b> jogar.</td></tr><tr><td>— Você vem? — perguntou Rui.</td><td>Rui perguntou <b>se</b> eu ia.</td></tr></table>Muda a pessoa (eu → ele) e o tempo do verbo (estou → estava).' }
      ],
      exemplo: { q: 'Passe para o discurso indireto: <b>— Nós vamos ganhar o jogo! — disse o capitão.</b>', passos: ['Tire o travessão e comece pelo narrador: "O capitão disse que..."', 'Ajuste: "nós vamos" → "eles iam" (ou "o time ia").', 'Resultado: <b>O capitão disse que eles iam ganhar o jogo.</b> ✅'] },
      guiado: { q: 'Qual frase está em <b>discurso direto</b>?', o: ['— Vamos procurar o tesouro! — disse o capitão.', 'O capitão disse que iam procurar o tesouro.', 'O capitão procurou o tesouro na ilha.', 'O tesouro estava perdido havia anos.'], a: 0, h: ['Procure o sinal que indica a fala do personagem.', 'O travessão (—) mostra a fala exata.'], e: 'No discurso direto aparece a fala exata do personagem, marcada pelo <b>travessão</b>.' },
      resumo: ['Direto: fala exata, com travessão ou aspas.', 'Indireto: narrador conta, com "que" ou "se".', 'Na transformação mudam a pessoa e o tempo do verbo.']
    }
  },
  {
    id: 'p_imagem', s: 'por', nome: 'Imagens e textos', icone: '🖼️', origem: 'edital', prioridade: 6,
    desc: 'Relação entre imagens e textos: tirinhas, cartazes e legendas.',
    licao: {
      cards: [
        { t: 'A imagem também "fala"', h: 'Em tirinhas, cartazes e propagandas, a imagem dá informações: <b>expressões do rosto</b>, cenário, ações. Leia texto <b>e</b> imagem juntos.' },
        { t: 'Tipos de balão', h: '<div class="balloons"><span class="bal fala">Fala</span><span class="bal pensa">Pensamento</span><span class="bal grito">GRITO!</span></div>Balão liso = fala. Balão de nuvenzinha = pensamento. Balão com pontas = grito ou susto.' },
        { t: 'Legendas e símbolos', h: 'Legenda explica a imagem. Ícones (🧢, ⏰, 📍) ajudam a achar informações rápido, como em cartazes e convites.' }
      ],
      exemplo: { q: 'Numa tirinha, o personagem aparece com gotas de suor e um balão de nuvem dizendo "E agora?". O que isso mostra?', passos: ['Balão de nuvem = pensamento: ele não falou em voz alta.', 'Gotas de suor indicam nervosismo.', 'Ele está <b>pensando, preocupado</b>. ✅'] },
      guiado: { q: 'Em uma história em quadrinhos, o balão em forma de nuvem indica:', o: ['pensamento do personagem', 'grito do personagem', 'fala do narrador', 'fim da história'], a: 0, h: ['Lembre dos três tipos de balão.', 'O balão de nuvem não é dito em voz alta.'], e: 'O balão de nuvenzinha mostra o <b>pensamento</b> do personagem.' },
      resumo: ['Leia texto e imagem juntos.', 'Balão liso: fala; nuvem: pensamento; pontas: grito.', 'Expressões do rosto mostram sentimentos.']
    }
  },
  {
    id: 'p_drama', s: 'por', nome: 'Textos dramáticos', icone: '🎭', origem: 'edital', prioridade: 5,
    desc: 'Características e forma de composição do texto teatral.',
    licao: {
      cards: [
        { t: 'Texto para ser encenado', h: 'O texto dramático (teatral) é escrito para ser <b>apresentado no palco</b> por atores, para uma plateia.' },
        { t: 'Como ele é organizado', h: '• <b>Nome do personagem</b> antes de cada fala (muitas vezes em MAIÚSCULAS).<br>• <b>Falas</b> diretas, sem narrador contando.<br>• <b>Rubricas</b>: indicações entre parênteses sobre gestos, sentimentos, cenário e movimentos.<br>• Divisão em <b>cenas</b> ou <b>atos</b>.' },
        { t: 'Exemplo', h: '<div class="drama"><p class="rub">CENA 1 — Um quarto escuro.</p><p><b>LUÍSA:</b> <i>(sussurrando)</i> Você ouviu esse barulho?</p><p><b>PEDRO:</b> <i>(tremendo)</i> Ouvi... vem do armário!</p><p class="rub">(A porta do armário range e um gato sai pulando.)</p></div>' },
        { t: 'Conto x teatro', h: 'No <b>conto</b>, um narrador conta a história. No <b>teatro</b>, não há narrador: a história aparece pelas <b>falas e ações</b> dos personagens.' }
      ],
      exemplo: { q: 'No exemplo, para que serve "<i>(tremendo)</i>"?', passos: ['Está entre parênteses e não é falado pelo ator.', 'Indica como Pedro deve agir ao dizer a fala.', 'É uma <b>rubrica</b>: mostra que ele está com medo. ✅'] },
      guiado: { q: 'As indicações entre parênteses em um texto teatral, como "(sussurrando)", são chamadas de:', o: ['rubricas', 'estrofes', 'legendas', 'títulos'], a: 0, h: ['Elas não são faladas pelos atores.', 'Começa com a letra R.'], e: 'São as <b>rubricas</b>: orientam gestos, sentimentos, cenário e movimentos.' },
      resumo: ['Texto dramático é para ser encenado.', 'Nome do personagem antes da fala; sem narrador.', 'Rubricas entre parênteses orientam a encenação.']
    }
  },
  {
    id: 'p_producao', s: 'por', nome: 'Produção e organização de textos', icone: '✍️', origem: 'edital', prioridade: 7,
    desc: 'Partes da narrativa, sequência de ideias, conectivos, parágrafos e revisão.',
    licao: {
      cards: [
        { t: 'As partes da história', h: '1. <b>Início:</b> quem, onde, quando.<br>2. <b>Conflito:</b> o problema aparece.<br>3. <b>Clímax:</b> o momento mais emocionante.<br>4. <b>Desfecho:</b> como o problema se resolve.' },
        { t: 'Palavras que ligam ideias', h: 'Tempo e ordem: <b>primeiro, depois, então, no dia seguinte, finalmente</b>.<br>Surpresa: <b>de repente</b>.<br>Oposição: <b>mas, porém</b>.<br>Causa: <b>porque</b>.' },
        { t: 'Parágrafos e revisão', h: 'Cada parte nova da história vai num <b>parágrafo</b> (com recuo no início).<br>Revise: letra maiúscula no início das frases, ponto no final, palavras sem repetição ("aí... aí... aí").' }
      ],
      exemplo: { q: 'Melhore: "O gato subiu no muro. O gato miou. O gato pulou."', passos: ['A palavra "o gato" se repete três vezes.', 'Junte as ações numa frase só, separando com vírgula e "e".', '<b>"O gato subiu no muro, miou e pulou."</b> ✅'] },
      guiado: { q: 'Qual palavra completa melhor: "Caminhamos a manhã inteira. ______, chegamos à cachoeira."', o: ['Finalmente', 'Antes', 'Porém', 'Nunca'], a: 0, h: ['A frase fala do fim da caminhada.', 'Qual palavra indica que algo aconteceu depois de muito esperar?'], e: '<b>Finalmente</b> indica o fim de uma sequência de ações, depois de muito tempo.' },
      resumo: ['Início, conflito, clímax e desfecho.', 'Use conectivos para ligar as ideias.', 'Revise maiúsculas, pontuação e repetições.']
    }
  },
  {
    id: 'p_pont', s: 'por', nome: 'Pontuação', icone: '❗', origem: 'anteriores', prioridade: 8,
    desc: 'Ponto final, interrogação, exclamação, vírgula, dois-pontos, travessão e reticências.',
    licao: {
      cards: [
        { t: 'Fim da frase', h: '<b>.</b> Ponto final: afirma algo.<br><b>?</b> Interrogação: pergunta.<br><b>!</b> Exclamação: emoção, surpresa, ordem.<br><b>...</b> Reticências: pausa, suspense, ideia não terminada.' },
        { t: 'Vírgula', h: 'Separa itens de uma lista: "Comprei pão, leite, queijo e frutas."<br>Separa o nome de quem é chamado: "Pedro, venha jantar!"' },
        { t: 'Diálogo', h: '<b>Dois-pontos (:)</b> anunciam uma fala ou uma lista.<br><b>Travessão (—)</b> marca a fala do personagem.<br>A mãe avisou:<br>— Hora de dormir!' }
      ],
      exemplo: { q: 'Que sinal completa: "Você viu meu caderno__"', passos: ['A frase está perguntando algo.', 'Perguntas terminam com ponto de interrogação.', 'Resposta: <b>?</b> ✅'] },
      guiado: { q: 'Na frase "Pedro, venha jantar!", a vírgula serve para:', o: ['separar o nome de quem está sendo chamado', 'separar itens de uma lista', 'indicar uma pergunta', 'terminar a frase'], a: 0, h: ['Alguém está chamando o Pedro.', 'Não há lista nem pergunta aqui.'], e: 'A vírgula separa o nome da pessoa chamada (<b>vocativo</b>) do resto da frase.' },
      resumo: ['. afirma, ? pergunta, ! emociona, ... suspense.', 'Vírgula: listas e chamamentos.', 'Dois-pontos e travessão: diálogo.']
    }
  },
  {
    id: 'p_silabas', s: 'por', nome: 'Sílabas', icone: '🔤', origem: 'anteriores', prioridade: 9,
    desc: 'Separação silábica e classificação por número de sílabas.',
    licao: {
      cards: [
        { t: 'Bata palmas!', h: 'Cada "pedacinho" que falamos de uma vez é uma sílaba. Bata uma palma em cada:<br>sa-pa-to → 3 palmas → 3 sílabas.' },
        { t: 'Nomes pelo número de sílabas', h: '<b>Monossílaba:</b> 1 (pão, sol)<br><b>Dissílaba:</b> 2 (bo-la)<br><b>Trissílaba:</b> 3 (sa-pa-to)<br><b>Polissílaba:</b> 4 ou mais (bor-bo-le-ta)' },
        { t: 'Regrinhas importantes', h: '<b>RR</b> e <b>SS</b> se separam: car-ro, pás-sa-ro.<br><b>CH, LH, NH, QU, GU</b> não se separam: cho-co-la-te, ga-li-nha, guer-rei-ro.' }
      ],
      exemplo: { q: 'Separe as sílabas de <b>passarinho</b>.', passos: ['O SS se separa: pas-sa...', 'O NH fica junto: ...ri-nho.', '<b>pas-sa-ri-nho</b>: 4 sílabas, polissílaba. ✅'] },
      guiado: { q: 'Qual é a separação correta de <b>carro</b>?', o: ['car-ro', 'ca-rro', 'carr-o', 'c-arro'], a: 0, h: ['Lembre da regra do RR.', 'RR sempre se separa: uma letra fica em cada sílaba.'], e: 'O RR se separa: <b>car-ro</b>.' },
      resumo: ['Bata palmas para contar sílabas.', 'RR e SS se separam.', 'CH, LH, NH, QU e GU ficam juntos.']
    }
  }
];

var TOPIC_BY_ID = {};
TOPICS.forEach(function (t) { TOPIC_BY_ID[t.id] = t; });
