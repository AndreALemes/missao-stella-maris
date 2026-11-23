/* Figuras (SVG/HTML) usadas nas lições e questões */
var FIG = (function () {
  var COR = '#4f7cff', COR2 = '#ffb020', LINHA = '#334';
  function svg(w, h, body, label) { return '<svg class="fig-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (label || 'figura') + '">' + body + '</svg>'; }
  function polar(cx, cy, r, ang) { var a = (ang - 90) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }

  function frac(f) {
    var n = f.n, d = f.d, out = '';
    if (f.shape === 'pizza') {
      var cx = 80, cy = 80, r = 70;
      for (var i = 0; i < d; i++) {
        var a1 = i * 360 / d, a2 = (i + 1) * 360 / d, p1 = polar(cx, cy, r, a1), p2 = polar(cx, cy, r, a2);
        var large = (a2 - a1) > 180 ? 1 : 0;
        out += '<path d="M' + cx + ' ' + cy + ' L' + p1[0] + ' ' + p1[1] + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + p2[0] + ' ' + p2[1] + ' Z" fill="' + (i < n ? COR2 : '#fff') + '" stroke="' + LINHA + '" stroke-width="2"/>';
      }
      if (d === 1) out = '<circle cx="80" cy="80" r="70" fill="' + COR2 + '" stroke="' + LINHA + '" stroke-width="2"/>';
      return svg(160, 160, out, 'círculo dividido em ' + d + ' partes iguais, ' + n + ' pintada(s)');
    }
    var W = 300, H = 50, w = W / d;
    for (var j = 0; j < d; j++) out += '<rect x="' + (j * w + 1) + '" y="1" width="' + w + '" height="' + H + '" fill="' + (j < n ? COR : '#fff') + '" stroke="' + LINHA + '" stroke-width="2"/>';
    return svg(W + 2, H + 2, out, 'barra dividida em ' + d + ' partes iguais, ' + n + ' pintada(s)');
  }
  function fraccompare(f) {
    var out = '', W = 300, H = 34, y = 0;
    f.ds.forEach(function (d) {
      var w = W / d;
      for (var j = 0; j < d; j++) out += '<rect x="' + (60 + j * w) + '" y="' + y + '" width="' + w + '" height="' + H + '" fill="' + (j === 0 ? COR2 : '#fff') + '" stroke="' + LINHA + '" stroke-width="1.5"/>';
      out += '<text x="10" y="' + (y + 23) + '" font-size="18" font-weight="700">1/' + d + '</text>';
      y += H + 10;
    });
    return svg(365, y, out, 'comparação de frações unitárias');
  }
  function clock(f) {
    var cx = 90, cy = 90, r = 80, out = '<circle cx="90" cy="90" r="80" fill="#fff" stroke="' + LINHA + '" stroke-width="4"/>';
    for (var i = 0; i < 60; i++) { var p1 = polar(cx, cy, r - 4, i * 6), p2 = polar(cx, cy, r - (i % 5 ? 9 : 14), i * 6); out += '<line x1="' + p1[0] + '" y1="' + p1[1] + '" x2="' + p2[0] + '" y2="' + p2[1] + '" stroke="' + LINHA + '" stroke-width="' + (i % 5 ? 1 : 3) + '"/>'; }
    for (var k = 1; k <= 12; k++) { var p = polar(cx, cy, r - 28, k * 30); out += '<text x="' + p[0] + '" y="' + (p[1] + 6) + '" text-anchor="middle" font-size="16" font-weight="700">' + k + '</text>'; }
    var ha = ((f.h % 12) + f.m / 60) * 30, ma = f.m * 6, hp = polar(cx, cy, 40, ha), mp = polar(cx, cy, 64, ma);
    out += '<line x1="90" y1="90" x2="' + hp[0] + '" y2="' + hp[1] + '" stroke="#d33" stroke-width="7" stroke-linecap="round"/>';
    out += '<line x1="90" y1="90" x2="' + mp[0] + '" y2="' + mp[1] + '" stroke="' + COR + '" stroke-width="4" stroke-linecap="round"/>';
    out += '<circle cx="90" cy="90" r="5" fill="' + LINHA + '"/>';
    return svg(180, 180, out, 'relógio de ponteiros') + '<div class="legend"><span style="color:#d33">━ ponteiro pequeno (horas)</span> <span style="color:' + COR + '">━ ponteiro grande (minutos)</span></div>';
  }
  function bars(f) {
    var max = Math.max.apply(null, f.values), step = f.step || 1, gstep = step;
    while (max / gstep > 8) gstep *= 2;
    var top = Math.ceil((max + 1) / gstep) * gstep, out = '', n = f.values.length;
    var cores = ['#4f7cff', '#ffb020', '#2fbf71', '#e8566c'];
    if (f.horiz) {
      var L = 95, W = 300, bh = 30, gap = 14, H = n * (bh + gap) + 30;
      for (var g = 0; g <= top; g += gstep) { var x = L + g / top * W; out += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + (H - 28) + '" stroke="#dde" /><text x="' + x + '" y="' + (H - 10) + '" text-anchor="middle" font-size="13">' + g + '</text>'; }
      f.values.forEach(function (v, i) { var y = i * (bh + gap) + 6; out += '<text x="' + (L - 6) + '" y="' + (y + 21) + '" text-anchor="end" font-size="14">' + f.labels[i] + '</text><rect x="' + L + '" y="' + y + '" width="' + (v / top * W) + '" height="' + bh + '" fill="' + cores[i % 4] + '" rx="3"/>' + (f.show ? '<text x="' + (L + v / top * W + 5) + '" y="' + (y + 21) + '" font-size="14" font-weight="700">' + v + '</text>' : ''); });
      return '<div class="fig-title">' + f.title + '</div>' + svg(L + W + 30, H, out, 'gráfico de barras: ' + f.title);
    }
    var L2 = 36, Hh = 200, bw = 52, gp = 26, Wd = L2 + n * (bw + gp) + 10;
    for (var g2 = 0; g2 <= top; g2 += gstep) { var y2 = 10 + Hh - g2 / top * Hh; out += '<line x1="' + L2 + '" y1="' + y2 + '" x2="' + Wd + '" y2="' + y2 + '" stroke="#dde"/><text x="' + (L2 - 6) + '" y="' + (y2 + 5) + '" text-anchor="end" font-size="13">' + g2 + '</text>'; }
    f.values.forEach(function (v, i) { var x2 = L2 + 14 + i * (bw + gp), h2 = v / top * Hh; out += '<rect x="' + x2 + '" y="' + (10 + Hh - h2) + '" width="' + bw + '" height="' + h2 + '" fill="' + cores[i % 4] + '" rx="3"/><text x="' + (x2 + bw / 2) + '" y="' + (Hh + 30) + '" text-anchor="middle" font-size="13">' + f.labels[i] + '</text>' + (f.show ? '<text x="' + (x2 + bw / 2) + '" y="' + (4 + Hh - h2) + '" text-anchor="middle" font-size="14" font-weight="700">' + v + '</text>' : ''); });
    return '<div class="fig-title">' + f.title + '</div>' + svg(Wd, Hh + 40, out, 'gráfico de colunas: ' + f.title);
  }
  function picto(f) {
    var rows = f.labels.map(function (l, i) { return '<tr><th>' + l + '</th><td class="icons">' + new Array(f.counts[i] + 1).join(f.icon + ' ') + '</td></tr>'; }).join('');
    return '<div class="fig-title">' + f.title + '</div><table class="picto">' + rows + '</table><div class="legend"><b>Legenda:</b> cada ' + f.icon + ' = ' + f.k + '</div>';
  }
  function table(f) {
    return '<table class="datatab"><thead><tr>' + f.head.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr></thead><tbody>' +
      f.rows.map(function (r) { return '<tr>' + r.map(function (x, i) { return i ? '<td>' + x + '</td>' : '<th>' + x + '</th>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
  }
  function grid(f) {
    var s = 44, L = 30, out = '', W = L + f.cols * s, H = f.rows * s;
    for (var c = 0; c < f.cols; c++) for (var r = 0; r < f.rows; r++) out += '<rect x="' + (L + c * s) + '" y="' + (r * s) + '" width="' + s + '" height="' + s + '" fill="' + ((c + r) % 2 ? '#f3f6ff' : '#fff') + '" stroke="#99a"/>';
    for (var c2 = 0; c2 < f.cols; c2++) out += '<text x="' + (L + c2 * s + s / 2) + '" y="' + (H + 22) + '" text-anchor="middle" font-size="17" font-weight="700">' + 'ABCDEFGH'[c2] + '</text>';
    for (var r2 = 0; r2 < f.rows; r2++) out += '<text x="' + (L - 10) + '" y="' + ((f.rows - 1 - r2) * s + s / 2 + 6) + '" text-anchor="middle" font-size="17" font-weight="700">' + (r2 + 1) + '</text>';
    (f.items || []).forEach(function (it) { out += '<text x="' + (L + (it.c - 1) * s + s / 2) + '" y="' + ((f.rows - it.r) * s + s / 2 + 10) + '" text-anchor="middle" font-size="28">' + it.e + '</text>'; });
    return svg(W + 4, H + 30, out, 'malha quadriculada com colunas de A a ' + 'ABCDEFGH'[f.cols - 1] + ' e linhas de 1 a ' + f.rows) + '<div class="legend">Colunas: letras (embaixo) • Linhas: números (ao lado, de baixo para cima)</div>';
  }
  function net(f) {
    var st = 'fill="#e8f0ff" stroke="' + LINHA + '" stroke-width="2"', out = '', s = 44;
    if (f.kind === 'cube') {
      [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]].forEach(function (p) { out += '<rect x="' + (5 + p[0] * s) + '" y="' + (5 + p[1] * s) + '" width="' + s + '" height="' + s + '" ' + st + '/>'; });
      return svg(4 * s + 10, 3 * s + 10, out, 'planificação com 6 quadrados');
    }
    if (f.kind === 'pyr4') {
      var x0 = 70, y0 = 70, q = 60;
      out += '<rect x="' + x0 + '" y="' + y0 + '" width="' + q + '" height="' + q + '" ' + st + '/>';
      out += '<polygon points="' + x0 + ',' + y0 + ' ' + (x0 + q) + ',' + y0 + ' ' + (x0 + q / 2) + ',' + (y0 - 62) + '" ' + st + '/>';
      out += '<polygon points="' + x0 + ',' + (y0 + q) + ' ' + (x0 + q) + ',' + (y0 + q) + ' ' + (x0 + q / 2) + ',' + (y0 + q + 62) + '" ' + st + '/>';
      out += '<polygon points="' + x0 + ',' + y0 + ' ' + x0 + ',' + (y0 + q) + ' ' + (x0 - 62) + ',' + (y0 + q / 2) + '" ' + st + '/>';
      out += '<polygon points="' + (x0 + q) + ',' + y0 + ' ' + (x0 + q) + ',' + (y0 + q) + ' ' + (x0 + q + 62) + ',' + (y0 + q / 2) + '" ' + st + '/>';
      return svg(200, 200, out, 'planificação com um quadrado e quatro triângulos');
    }
    if (f.kind === 'prism3') {
      var w = 50, h = 90, X = 10, Y = 46;
      for (var i = 0; i < 3; i++) out += '<rect x="' + (X + i * w) + '" y="' + Y + '" width="' + w + '" height="' + h + '" ' + st + '/>';
      out += '<polygon points="' + (X + w) + ',' + Y + ' ' + (X + 2 * w) + ',' + Y + ' ' + (X + 1.5 * w) + ',' + (Y - 43) + '" ' + st + '/>';
      out += '<polygon points="' + (X + w) + ',' + (Y + h) + ' ' + (X + 2 * w) + ',' + (Y + h) + ' ' + (X + 1.5 * w) + ',' + (Y + h + 43) + '" ' + st + '/>';
      return svg(170, 230, out, 'planificação com três retângulos e dois triângulos');
    }
    if (f.kind === 'cyl') {
      out += '<rect x="20" y="60" width="160" height="80" ' + st + '/><circle cx="100" cy="30" r="28" ' + st + '/><circle cx="100" cy="170" r="28" ' + st + '/>';
      return svg(200, 202, out, 'planificação com um retângulo e dois círculos');
    }
    return '';
  }
  function lines(f) {
    var out = '', st = 'stroke="' + COR + '" stroke-width="5" stroke-linecap="round"';
    if (f.kind === 'par') out = '<line x1="20" y1="40" x2="240" y2="20" ' + st + '/><line x1="20" y1="110" x2="240" y2="90" ' + st + '/>';
    else if (f.kind === 'perp') out = '<line x1="30" y1="70" x2="230" y2="70" ' + st + '/><line x1="130" y1="5" x2="130" y2="135" ' + st + '/><rect x="130" y="52" width="18" height="18" fill="none" stroke="#d33" stroke-width="2"/>';
    else out = '<line x1="20" y1="120" x2="240" y2="30" ' + st + '/><line x1="30" y1="30" x2="230" y2="110" ' + st + '/>';
    return svg(260, 140, out, f.kind === 'par' ? 'duas retas que não se cruzam' : 'duas retas que se cruzam');
  }
  function place(f) {
    var s = String(f.n), nomes = ['Dezena de milhar', 'Unidade de milhar', 'Centena', 'Dezena', 'Unidade'], pot = [10000, 1000, 100, 10, 1];
    while (s.length < 5) s = '0' + s;
    return '<table class="datatab place"><thead><tr>' + nomes.map(function (n) { return '<th>' + n + '</th>'; }).join('') + '</tr></thead><tbody><tr>' + s.split('').map(function (d) { return '<td class="big">' + d + '</td>'; }).join('') + '</tr><tr>' + s.split('').map(function (d, i) { return '<td>' + (+d * pot[i]).toLocaleString('pt-BR') + '</td>'; }).join('') + '</tr></tbody></table>';
  }
  function array(f) {
    var out = '';
    for (var r = 0; r < f.r; r++) for (var c = 0; c < f.c; c++) out += '<circle cx="' + (20 + c * 34) + '" cy="' + (20 + r * 34) + '" r="12" fill="' + COR2 + '"/>';
    return svg(f.c * 34 + 6, f.r * 34 + 6, out, f.r + ' fileiras com ' + f.c + ' bolinhas') + '<div class="legend">' + f.r + ' fileiras × ' + f.c + ' = ' + (f.r * f.c) + '</div>';
  }
  function money(f) {
    return '<div class="money">' + f.items.map(function (it) {
      if (it[0] === 'n') return '<span class="nota n' + it.slice(1) + '">R$ ' + it.slice(1) + '</span>';
      var v = +it.slice(1); return '<span class="moeda">' + (v === 100 ? 'R$ 1' : v + '¢') + '</span>';
    }).join('') + '</div><div class="legend">¢ = centavos</div>';
  }
  var TAGN = { art: 'artigo', sub: 'substantivo', adj: 'adjetivo', pron: 'pronome', verb: 'verbo' };
  function tagged(f) {
    return '<div class="tagged">' + f.words.map(function (w) { return w[1] === 'x' ? '<span class="tw x">' + w[0] + '</span>' : '<span class="tw ' + w[1] + '"><b>' + w[0] + '</b><small>' + TAGN[w[1]] + '</small></span>'; }).join(' ') + '</div>';
  }
  function render(f) {
    if (!f) return '';
    var fn = { frac: frac, fraccompare: fraccompare, clock: clock, bars: bars, picto: picto, table: table, grid: grid, net: net, lines: lines, place: place, array: array, money: money, tagged: tagged }[f.t];
    return fn ? '<div class="fig">' + fn(f) + '</div>' : '';
  }
  return { render: render, TAGN: TAGN };
})();
