/*
  Fare Casa Ceramiche — Home (elemento personalizzato per Wix)
  Tag name:  farecasa-home
  Attributi facoltativi:
    offset-top     altezza in px dell'intestazione fissa di Wix (es. 80)
    mostra-altezza "si" per vedere in alto l'altezza da dare all'elemento in Wix
  Link del menu Wix: indirizzo web che finisce con
    #fc-metodo  #fc-ambienti  #fc-chi-siamo  #fc-video  #fc-social  #fc-contatti
*/
(function () {
  if (customElements.get('farecasa-home')) return;
  var BASE = 'https://cdn.jsdelivr.net/gh/Musux28/farecasa-media@v1/';
  var IMG = function (f) { return BASE + f; };
  var VID = function (f) { return BASE + f; };

  var FASI = [
    ['Sopralluogo', 'OGGI', "Partiamo dal bagno com'è adesso. Veniamo a casa tua, prendiamo le misure e ascoltiamo come lo vuoi vivere."],
    ['Demolizione', 'DEMOLIZIONE', 'Si riparte da zero: togliamo piastrelle, sanitari e mobili vecchi. Il cantiere lo gestiamo noi.'],
    ['Impianti', 'IMPIANTI', "Quello che non si vede, fatto bene: tubi dell'acqua, scarichi e impianto elettrico pronti per il bagno nuovo."],
    ['Posa in opera', 'POSA', 'I materiali che hai scelto tu in showroom prendono posto, pezzo dopo pezzo: mattonelle, doccia, mobile e sanitari.'],
    ['Chiavi in mano', 'FINITO', 'Pronto, pulito e da vivere. Tu hai scelto i materiali, noi abbiamo pensato a tutto il resto.']
  ];
  var CHIPS = [
    ['Misure e rilievo', 'Idee e budget', 'Prenota un sopralluogo'],
    ['Rimozione rivestimenti', 'Smontaggio sanitari', 'Pulizia del cantiere'],
    ['Idraulico', 'Elettrico', 'Scarichi'],
    ['Pavimenti e rivestimenti', 'Box doccia', 'Mobili bagno', 'Sanitari'],
    ['Richiedi un preventivo', 'Guarda altri lavori']
  ];
  var AMBIENTI = [
    ['Bagni', 'Rifatti da zero, dalle piastrelle ai sanitari', 'bagno.jpg'],
    ['Cucine', 'Componibili, su misura, con rivestimenti', 'cucina.jpg'],
    ['Pavimenti interni', 'Gres, grandi lastre, parquet e SPC', 'lastre.jpg'],
    ['Soggiorni e camere', 'Pavimenti effetto legno e finiture per ogni stanza', 'soggiorno.jpg'],
    ['Porte e finiture', 'Porte interne e dettagli che fanno la differenza', 'porte-espo.jpg'],
    ['Tutta la casa', 'Ristrutturazione completa, chiavi in mano', 'showroom-cucine.jpg']
  ];
  var SHOWROOM = ['Arredo bagno', 'Sanitari', 'Docce e piatti doccia', 'Rubinetteria', 'Pavimenti e rivestimenti', 'Grandi lastre', 'Parquet e SPC', 'Pavimenti per esterni', 'Porte interne', 'Cucine', 'Riscaldamento', 'Ausili per disabili'];
  var VIDEO = [
    ['Una casa intera, chiavi in mano', '1_casa_completa.mp4', 'v1.jpg'],
    ['Si parte: demolizione e impianti', '2_demolizione.mp4', 'v2.jpg'],
    ['Via la vecchia doccia, dentro quella nuova', '3_doccia.mp4', 'v3.jpg'],
    ['Il bagno finito, raccontato da noi', '4_bagno_finito.mp4', 'v4.jpg'],
    ['Arredo bagno su misura in showroom', '5_showroom.mp4', 'v5.jpg']
  ];
  var SOCIAL = [
    ['Instagram', '@fare_casa', 'Segui', 'https://www.instagram.com/fare_casa/'],
    ['Facebook', 'Fare Casa Giarre', 'Segui', 'https://www.facebook.com/farecasagiarre'],
    ['TikTok', '@farecasaceramiche', 'Guarda i video', 'https://www.tiktok.com/@farecasaceramiche']
  ];
  var MAPPA_LINK = { metodo: 'fc-metodo', ambienti: 'fc-ambienti', 'chi-siamo': 'fc-chi-siamo', video: 'fc-video', social: 'fc-social' };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  var CSS = [
    "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');",
    ':host{display:block;position:relative;width:100%;--blu:#003C7F;--off:0px;color:#1C1B19;font-family:Inter,system-ui,sans-serif;background:#F4F1EC}',
    '*{box-sizing:border-box}img,video{display:block;max-width:100%}a{color:inherit}',
    '.w{width:940px;margin:0 auto;padding:0}',
    '.k{font-family:"Space Grotesk",Inter,sans-serif;font-size:14px;letter-spacing:.14em;color:var(--blu);text-transform:uppercase}',
    'h1,h2,h3{font-family:"Space Grotesk",Inter,sans-serif;font-weight:700;letter-spacing:-.02em;margin:0}',
    'h1{font-size:80px;line-height:.95;letter-spacing:-.03em}h2{font-size:54px;line-height:1}h3{font-size:30px}',
    'p{margin:0;line-height:1.6;color:#3E3B36}.lead{font-size:19px}',
    '.btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:14px 24px;font-weight:600;font-size:16px;text-decoration:none;border:1px solid #1C1B19;background:transparent;color:#1C1B19;cursor:pointer;font-family:inherit}',
    '.btn.p{background:var(--blu);border-color:var(--blu);color:#fff}',
    '.sec{padding:104px 0}',
    '.hero{padding:96px 0 64px;display:flex;flex-wrap:wrap;gap:40px;align-items:flex-end;justify-content:space-between}',
    '.hero .l{flex:999 1 560px}.hero .r{flex:1 1 300px;display:flex;flex-direction:column;gap:20px}',
    '.hero h1 span{color:var(--blu)}.row{display:flex;flex-wrap:wrap;gap:12px}',
    '.foto{width:100%;height:540px;object-fit:cover}',
    '.strip{background:#fff;border-top:1px solid rgba(28,27,25,.14);border-bottom:1px solid rgba(28,27,25,.14)}',
    '.strip .w{display:flex;flex-wrap:wrap;gap:12px 32px;justify-content:space-between;padding-top:22px;padding-bottom:22px;font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:21px}',
    '.strip i{font-style:normal;color:var(--blu)}',
    '.intro{padding:96px 0 0}.intro p{max-width:680px;margin-top:16px;font-size:18px}',
    '.story{position:relative;height:3600px}',
    '.stage{position:sticky;top:var(--off);height:var(--sh,760px);display:flex;gap:48px;align-items:center;justify-content:center;padding:28px 40px;overflow:hidden}',
    '.stage.abs{position:absolute;left:0;right:0}',
    '.texts{position:relative;flex:0 1 480px;height:440px}',
    '.card{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:16px;opacity:0;transform:translateY(16px);transition:opacity .45s,transform .45s;pointer-events:none}',
    '.card.on{opacity:1;transform:none}.card h3{font-size:56px;line-height:.95}.card p{font-size:19px}',
    '.media{position:relative;height:100%;aspect-ratio:9/16;background:#EDEAE4;overflow:hidden}',
    '.media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}',
    '.hud{position:absolute;left:0;right:0;top:0;padding:14px 16px;display:flex;flex-direction:column;gap:10px;background:linear-gradient(rgba(28,27,25,.55),rgba(28,27,25,0));color:#fff;font-family:"Space Grotesk",sans-serif;font-size:12px;letter-spacing:.12em}',
    '.hud .t{display:flex;justify-content:space-between}.bar{height:3px;background:rgba(255,255,255,.35)}.bar b{display:block;height:3px;width:0;background:#fff}',
    '.panel{height:100%;min-width:420px;display:flex;flex-direction:column;gap:14px}.ptop{display:flex;justify-content:space-between;align-items:center;gap:16px}.nome2{font-family:"Space Grotesk",sans-serif;font-size:13px;letter-spacing:.14em;color:#5E5A54}.fbtn{display:flex;gap:8px}.fbtn button{width:44px;height:44px;padding:0;border:1px solid rgba(28,27,25,.25);background:#fff;color:#1C1B19;font:700 14px "Space Grotesk",sans-serif;cursor:pointer}.fbtn button.v{border-color:var(--blu)}.fbtn button.on{background:var(--blu);border-color:var(--blu);color:#fff}.pbar{height:4px;background:rgba(28,27,25,.1)}.pbar b{display:block;height:4px;width:0;background:var(--blu)}.panel .media{height:calc(var(--sh,760px) - 132px);align-self:center}:host(:not(.m)) .hud{display:none}.fchips{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}.fchips span,.fchips a{background:#fff;border:1px solid rgba(28,27,25,.16);padding:10px 16px;font-size:15px;text-decoration:none;color:#1C1B19}.fchips a{border-color:var(--blu);color:var(--blu);font-weight:600}.card.on{pointer-events:auto}.pwrap{flex:1 1 0;min-width:0;height:100%;display:flex;justify-content:center}:host(.m) .pwrap{position:absolute;inset:0;display:block}:host(:not(.m)) .stage{width:940px;margin:0 auto;padding:28px 0;justify-content:space-between}:host(.xl) .stage{width:min(1480px,calc(100% - 128px))}:host(.xl) .hero .r{flex-basis:420px}',
    '.dove{padding-top:56px}.dv{display:flex;flex-wrap:wrap;gap:16px;align-items:stretch}.map{flex:999 1 520px;min-height:460px;background:#E9E3D9;position:relative}.map iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.dcard{flex:1 1 360px;background:#fff;border:1px solid rgba(28,27,25,.12);padding:32px;display:flex;flex-direction:column;gap:18px}.dcard h2{font-size:44px}.dk{font-size:13px;letter-spacing:.12em;color:#5E5A54}.dvv{font-size:18px;margin-top:4px;line-height:1.5}.dvv a{text-decoration:none;font-weight:600}.dbtn{display:flex;flex-direction:column;gap:10px;margin-top:auto}:host(.m) .map{flex-basis:100%;min-height:320px}:host(.m) .dcard{padding:22px}:host(.m) .dcard h2{font-size:32px}:host(.m) .dove{padding-top:32px}:host(.xl) .dcard h2{font-size:52px}:host(.xl) .dvv{font-size:20px}:host(.xl) .map{min-height:560px}',
    '.dots{display:none;gap:8px;margin-top:20px}.dot{width:28px;height:4px;background:rgba(28,27,25,.15)}.dot.on{background:var(--blu)}',
    '.two{display:flex;flex-wrap:wrap;gap:16px}.box{background:#fff;border:1px solid rgba(28,27,25,.12);padding:36px;display:flex;flex-direction:column;gap:14px}',
    '.box.b{background:var(--blu);color:#fff}.box.b p{color:#fff}.box.b .k{color:#fff}',
    '.grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px 24px;font-size:18px;font-weight:600}',
    '.amb{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}',
    '.amb a{text-decoration:none;background:#fff;border:1px solid rgba(28,27,25,.1);display:flex;flex-direction:column}',
    '.amb img{width:100%;aspect-ratio:4/3;object-fit:cover}.amb span{display:flex;flex-direction:column;gap:6px;padding:20px}',
    '.amb b{font-family:"Space Grotesk",sans-serif;font-size:23px}.amb small{font-size:15px;color:#3E3B36}',
    '.chips{display:flex;flex-wrap:wrap;gap:8px}.chips span{border:1px solid rgba(28,27,25,.18);padding:8px 14px;font-size:15px;font-weight:500}',
    '.chi{background:#E9E3D9}.chi .w{display:flex;flex-wrap:wrap;gap:48px;align-items:center}',
    '.chi img{flex:1 1 440px;min-width:0;aspect-ratio:4/3;object-fit:cover}.chi .tx{flex:1 1 400px;display:flex;flex-direction:column;gap:22px}',
    '.num{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;border-top:1px solid rgba(28,27,25,.2);padding-top:22px}',
    '.num b{display:block;font-family:"Space Grotesk",sans-serif;font-size:46px}.num small{font-size:14px;color:#5E5A54}',
    '.vids{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:18px}',
    '.vids figure{margin:0;display:flex;flex-direction:column;gap:10px}.vids video{width:100%;aspect-ratio:9/16;object-fit:cover;background:#1C1B19}',
    '.vids figcaption{font-size:16px;font-weight:600;line-height:1.3}',
    '.soc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}',
    '.soc a{text-decoration:none;background:#fff;border:1px solid rgba(28,27,25,.12);padding:26px;display:flex;flex-direction:column;gap:6px}',
    '.soc small{font-size:14px;color:#5E5A54}.soc b{font-family:"Space Grotesk",sans-serif;font-size:24px}.soc em{font-style:normal;color:var(--blu);font-weight:600}',
    '.hdr{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:36px}',
    '.altezza{position:absolute;top:0;left:0;z-index:9;background:#E10020;color:#fff;font:600 14px Inter,sans-serif;padding:8px 12px}',
    ':host(.xl) .w{width:min(1480px,calc(100% - 128px))}:host(.xl) p{font-size:18px}:host(.xl) .k{font-size:15px}:host(.xl) h1{font-size:clamp(96px,6vw,120px)}:host(.xl) h2{font-size:clamp(64px,4vw,78px)}:host(.xl) h3{font-size:34px}:host(.xl) .lead{font-size:22px}:host(.xl) .btn{font-size:18px;min-height:56px;padding:16px 28px}:host(.xl) .foto{height:clamp(600px,40vw,760px)}:host(.xl) .strip .w{font-size:24px}:host(.xl) .intro p{max-width:900px;font-size:21px}:host(.xl) .texts{flex-basis:640px;height:480px}:host(.xl) .card h3{font-size:clamp(64px,4.2vw,80px)}:host(.xl) .card p{font-size:21px}:host(.xl) .grid3{font-size:20px}:host(.xl) .box{padding:44px}:host(.xl) .amb b{font-size:27px}:host(.xl) .amb small{font-size:17px}:host(.xl) .chips span{font-size:17px;padding:10px 16px}:host(.xl) .chi .w{gap:64px}:host(.xl) .chi .tx p{font-size:20px}:host(.xl) .num b{font-size:58px}:host(.xl) .num small{font-size:16px}:host(.xl) .vids{gap:22px}:host(.xl) .vids figcaption{font-size:18px}:host(.xl) .soc a{padding:32px}:host(.xl) .soc small{font-size:16px}:host(.xl) .soc b{font-size:28px}',
    ':host(.m) .w{width:auto;padding:0 16px}:host(.m) .k{font-size:12px}:host(.m) h1{font-size:44px}:host(.m) h2{font-size:32px;line-height:1.05}:host(.m) h3{font-size:24px}:host(.m) .lead{font-size:16px}:host(.m) .sec{padding-top:52px;padding-bottom:52px}:host(.m) .hero{padding-top:36px;padding-bottom:24px;gap:18px}:host(.m) .hero .l,:host(.m) .hero .r{flex:1 1 100%}:host(.m) .row{flex-direction:column}:host(.m) .btn{width:100%}:host(.m) .foto{height:260px}:host(.m) .strip .w{gap:8px;font-size:14px;justify-content:flex-start}:host(.m) .strip i{display:none}:host(.m) .strip .w span{border:1px solid rgba(28,27,25,.18);padding:7px 10px}:host(.m) .intro{padding-top:48px}:host(.m) .intro p{font-size:16px}:host(.m) .story{height:3000px;margin-top:20px}:host(.m) .stage{display:block;padding:0}:host(.m) .media{position:absolute;inset:0;height:100%;width:100%;aspect-ratio:auto}:host(.m) .texts{position:absolute;left:12px;right:12px;bottom:16px;height:auto;min-height:190px;flex:none;z-index:2}:host(.m) .card{inset:auto 0 0 0;background:rgba(255,255,255,.94);padding:18px;gap:8px;justify-content:flex-start}:host(.m) .card h3{font-size:28px;line-height:1}:host(.m) .card p{font-size:15px;line-height:1.5}:host(.m) .dots{display:none}:host(.m) .panel{position:absolute;inset:0;display:block;min-width:0}:host(.m) .ptop,:host(.m) .pbar,:host(.m) .fchips{display:none}:host(.m) .panel .media{height:100%}:host(.m) .box{padding:20px}:host(.m) .grid3{grid-template-columns:repeat(2,minmax(0,1fr));font-size:15px;gap:10px 16px}:host(.m) .amb{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}:host(.m) .amb img{aspect-ratio:1}:host(.m) .amb span{padding:12px}:host(.m) .amb b{font-size:16px}:host(.m) .amb small{display:none}:host(.m) .chips span{font-size:14px;padding:7px 10px}:host(.m) .chi .w{gap:24px;padding:0}:host(.m) .chi img{flex:1 1 100%}:host(.m) .chi .tx{padding:0 16px 8px}:host(.m) .num b{font-size:30px}:host(.m) .vids{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -16px;padding:0 16px 8px}:host(.m) .vids figure{flex:0 0 240px;scroll-snap-align:start}:host(.m) .soc{grid-template-columns:1fr;gap:8px}:host(.m) .soc a{padding:16px;flex-direction:row;justify-content:space-between;align-items:center}:host(.m) .soc b{font-size:18px}',
  ].join('');

  function html() {
    var fasi = FASI.map(function (f, i) {
      return '<article class="card" data-i="' + i + '"><span class="k">Fase 0' + (i + 1) + ' / 05</span><h3>' + esc(f[0]) + '</h3><p>' + esc(f[2]) + '</p><div class="fchips">' + CHIPS[i].map(function (c) { var go = /preventivo|sopralluogo/i.test(c) ? 'contatti' : (/lavori/i.test(c) ? 'video' : ''); return go ? '<a href="#fc-' + go + '" data-go="' + go + '">' + esc(c) + '</a>' : '<span>' + esc(c) + '</span>'; }).join('') + '</div></article>';
    }).join('') + '<div class="dots" aria-hidden="true">' + FASI.map(function (f, i) { return '<span class="dot" data-i="' + i + '"></span>'; }).join('') + '</div>';
    var amb = AMBIENTI.map(function (a) {
      return '<a href="#fc-contatti" data-go="contatti"><img loading="lazy" src="' + IMG(a[2]) + '" alt="' + esc(a[0]) + '"><span><b>' + esc(a[0]) + '</b><small>' + esc(a[1]) + '</small></span></a>';
    }).join('');
    var vids = VIDEO.map(function (v) {
      return '<figure><video controls playsinline preload="none" poster="' + IMG(v[2]) + '" src="' + VID(v[1]) + '"></video><figcaption>' + esc(v[0]) + '</figcaption></figure>';
    }).join('');
    var soc = SOCIAL.map(function (s) {
      return '<a href="' + s[3] + '" target="_blank" rel="noopener"><span><small>' + s[0] + '</small><br><b>' + esc(s[1]) + '</b></span><em>' + s[2] + ' →</em></a>';
    }).join('');
    var tag = ['Bagni', 'Cucine', 'Pavimenti interni', 'Esterni e terrazzi', 'Porte', 'Parquet', 'Tutta la casa']
      .map(function (t) { return '<span>' + t + '</span>'; }).join('<i>·</i>');
    return '<style>' + CSS + '</style>' +
      '<section class="w hero"><div class="l"><span class="k">Ristrutturazioni chiavi in mano · 40 anni · Giarre</span>' +
      '<h1 style="margin-top:16px">Tu scegli<br>i materiali.<br><span>Al resto pensiamo noi.</span></h1></div>' +
      '<div class="r"><p class="lead">Bagni, cucine, pavimenti per interni ed esterni, porte, tutta la casa. Vendiamo i materiali nei nostri 1.000 mq di showroom e ristrutturiamo dalla demolizione alla consegna delle chiavi.</p>' +
      '<div class="row"><a class="btn p" href="#fc-contatti" data-go="contatti">Richiedi un preventivo</a><a class="btn" href="#fc-metodo" data-go="metodo">Guarda come lavoriamo ↓</a></div></div></section>' +
      '<div class="w" style="padding-bottom:48px"><img class="foto" src="' + IMG('showroom.jpg') + '" alt="Lo showroom Fare Casa a Giarre"></div>' +
      '<div class="strip"><div class="w">' + tag + '</div></div>' +
      '<section class="w intro" id="fc-metodo"><span class="k">Il nostro metodo</span><h2 style="margin-top:12px">Prendiamo un bagno come esempio.</h2>' +
      '<p>Scorri e guardalo rinascere fase dopo fase. Lo stesso metodo vale per la cucina, i pavimenti, gli esterni e per tutta la casa.</p></section>' +
      '<div class="story"><div class="stage"><div class="texts">' + fasi + '</div>' +
      '<div class="pwrap"><div class="panel"><div class="ptop"><span class="nome2">IL BAGNO · OGGI</span><nav class="fbtn" aria-label="Fasi">' + FASI.map(function (f, i) { return '<button type="button" data-fase="' + i + '" aria-label="Vai alla fase ' + (i + 1) + ': ' + esc(f[0]) + '">0' + (i + 1) + '</button>'; }).join('') + '</nav></div><div class="pbar"><b></b></div>' +
      '<div class="media" role="img" aria-label="Un bagno che si trasforma dal vecchio al nuovo"><video class="bv" muted playsinline preload="auto" poster="' + IMG('bagno_poster.jpg') + '" src="' + VID('bagno_scroll.mp4') + '"></video>' +
      '<div class="hud" aria-hidden="true"><div class="t"><span class="nome">IL BAGNO · OGGI</span><span class="numf">01 / 05</span></div><div class="bar"><b></b></div></div></div></div></div></div></div>' +
      '<section class="w sec"><h2 style="margin-bottom:32px">Tu scegli. Noi facciamo tutto il resto.</h2><div class="two">' +
      '<div class="box" style="flex:1 1 340px"><span class="k" style="color:#5E5A54">A te tocca</span><h3 style="line-height:1.15">Scegliere i materiali che ti piacciono, in showroom.</h3><p>Piastrelle, sanitari, cucine, porte, parquet: li vedi e li tocchi dal vivo, con noi accanto a consigliarti.</p></div>' +
      '<div class="box b" style="flex:1.6 1 480px"><span class="k">A noi tocca tutto il resto</span><div class="grid3">' +
      ['Sopralluogo', 'Progetto', 'Demolizione', 'Impianti', 'Muratura', 'Posa in opera', 'Montaggio', 'Pulizia finale', 'Consegna chiavi'].map(function (x) { return '<span>✓ ' + x + '</span>'; }).join('') +
      '</div><p>Un solo referente coordina tutte le squadre. Tu non devi chiamare nessun altro.</p></div></div>' +
      '<h3 id="fc-ambienti" style="margin:64px 0 24px">Ristrutturiamo ogni ambiente</h3><div class="amb">' + amb + '</div>' +
      '<div class="box" style="margin-top:20px;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 36px"><div style="flex:999 1 560px;display:flex;flex-direction:column;gap:12px">' +
      '<span class="k">Nel nostro showroom trovi</span><div class="chips">' + SHOWROOM.map(function (s) { return '<span>' + s + '</span>'; }).join('') + '</div></div>' +
      '<a class="btn p" style="flex:1 1 240px" href="#fc-contatti" data-go="contatti">Vieni a vederli in showroom</a></div></section>' +
      '<section class="chi sec" id="fc-chi-siamo"><div class="w"><img loading="lazy" src="' + IMG('facciata.jpg') + '" alt="La sede di Fare Casa Ceramiche in Viale Don Luigi Sturzo a Giarre">' +
      '<div class="tx"><span class="k">Chi siamo</span><h2>Da 40 anni,<br>la casa la facciamo noi.</h2>' +
      '<p style="font-size:18px">Fare Casa Ceramiche è a Giarre da 40 anni. Nel nostro showroom di oltre 1.000 mq trovi tutto per la casa, e le persone che ti seguono dal primo sopralluogo alla consegna delle chiavi.</p>' +
      '<div class="num"><div><b>40</b><small>anni di esperienza</small></div><div><b>1.000</b><small>mq di showroom</small></div><div><b>1</b><small>referente unico</small></div></div></div></div></section>' +
      '<section class="w sec" id="fc-video"><div class="hdr"><div><span class="k">Video</span><h2 style="margin-top:12px">I nostri lavori, raccontati da noi.</h2></div>' +
      '<p style="max-width:380px">Girati nei nostri cantieri, raccontati da chi segue ogni giorno i vostri lavori.</p></div><div class="vids">' + vids + '</div></section>' +
      '<section class="w sec" id="fc-social" style="padding-top:0"><span class="k">Social</span><h2 style="margin:12px 0 32px">Seguici, ogni settimana un cantiere nuovo.</h2><div class="soc">' + soc + '</div></section>';
  }

  function htmlDove(solo) {
    var q = 'Fare Casa Ceramiche, Viale Don Luigi Sturzo 157, 95014 Giarre CT';
    var map = 'https://www.google.com/maps?q=' + encodeURIComponent(q) + '&output=embed';
    var link = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
    var riga = function (k, v) { return '<div><div class="dk">' + k + '</div><div class="dvv">' + v + '</div></div>'; };
    return (solo ? '<style>' + CSS + '</style>' : '') +
      '<section class="w sec dove" id="fc-dove"' + (solo ? '' : ' style="padding-top:0"') + '><div class="dv">' +
      '<div class="map"><iframe src="' + map + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mappa: Fare Casa Ceramiche a Giarre" allowfullscreen></iframe></div>' +
      '<div class="dcard"><span class="k">Dove siamo</span><h2>Vieni in showroom.</h2>' +
      riga('INDIRIZZO', 'Viale Don Luigi Sturzo 157<br>95014 Giarre (CT)') +
      riga('TELEFONO', '<a href="tel:+390957167068">095 716 7068</a>') +
      riga('CELLULARE E WHATSAPP', '<a href="https://wa.me/393911164060" target="_blank" rel="noopener">+39 391 116 4060</a>') +
      riga('ORARI', 'Lunedì – Sabato<br>9:00 – 13:00 · 16:00 – 20:00<br><span style="color:#5E5A54">Domenica chiuso</span>') +
      '<div class="dbtn"><a class="btn p" href="https://wa.me/393911164060" target="_blank" rel="noopener">Scrivici su WhatsApp</a><a class="btn" href="tel:+390957167068">Chiama</a><a class="btn" href="' + link + '" target="_blank" rel="noopener">Apri in Google Maps</a></div>' +
      '</div></div></section>';
  }

  class FarecasaHome extends HTMLElement {
    constructor() {
      super();
      this._r = this.attachShadow({ mode: 'open' });
      this._raf = 0; this._mode = 'sticky'; this._fase = -1; this._off = 0;
      this._onScroll = this._sched.bind(this);
      this._onDocClick = this._docClick.bind(this);
      this._onHash = this._hash.bind(this);
      this._prime = this._primeVid.bind(this);
    }
    static get observedAttributes() { return ['offset-top', 'mostra-altezza']; }
    attributeChangedCallback() { if (this._built) this._attrs(); }
    connectedCallback() {
      this.style.display = 'block'; this.style.width = '100%';
      if (!this._built) this._build();
      this._attrs();
      window.addEventListener('scroll', this._onScroll, { passive: true });
      window.addEventListener('resize', this._onScroll);
      window.addEventListener('resize', this._layout.bind(this));
      window.addEventListener('hashchange', this._onHash);
      if (!this._dove) document.addEventListener('click', this._onDocClick, true);
      window.addEventListener('touchstart', this._prime, { passive: true, once: true });
      window.addEventListener('pointerdown', this._prime, { passive: true, once: true });
      var self = this;
      setTimeout(function () { if (!self._dove) self._hash(); self._size(); }, 600);
      setTimeout(function () { self._size(); }, 2500);
      window.addEventListener('load', function () { self._size(); });
      var n = 0, iv = setInterval(function () { self._size(); if (++n > 12) clearInterval(iv); }, 1500);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { self._size(); });
      this._update();
    }
    disconnectedCallback() {
      window.removeEventListener('scroll', this._onScroll);
      window.removeEventListener('resize', this._onScroll);
      window.removeEventListener('hashchange', this._onHash);
      document.removeEventListener('click', this._onDocClick, true);
    }
    _build() {
      this._built = true;
      this._dove = (this.getAttribute('sezione') || '').toLowerCase() === 'dove';
      this._r.innerHTML = (this._dove ? htmlDove(true) : html() + htmlDove(false)) + '<div class="altezza" hidden></div>';
      var q = this._r.querySelector.bind(this._r);
      this._story = q('.story'); this._stage = q('.stage'); this._vid = q('.bv');
      this._cards = Array.prototype.slice.call(this._r.querySelectorAll('.card'));
      this._dots = Array.prototype.slice.call(this._r.querySelectorAll('.dot'));
      this._nome = q('.nome'); this._nome2 = q('.nome2'); this._pbar = q('.pbar b'); this._fb = Array.prototype.slice.call(this._r.querySelectorAll('.fbtn button')); this._numf = q('.numf'); this._bar = q('.bar b'); this._alt = q('.altezza');
      var self = this;
      if (this._vid) { this._vid.muted = true; this._vid.addEventListener('loadedmetadata', function () { self._update(); }); }
      this._r.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('[data-go]');
        if (a) { e.preventDefault(); self.vai(a.getAttribute('data-go')); return; }
        var b = e.target.closest && e.target.closest('[data-fase]');
        if (b) { e.preventDefault(); self.vaiFase(+b.getAttribute('data-fase')); }
      });
      if (window.ResizeObserver) new ResizeObserver(function () { self._layout(); self._size(); }).observe(this);
    }
    _layout() {
      var vw = window.innerWidth, par = this.parentElement;
      if (vw < 768 && this.getBoundingClientRect().width > vw + 2) {
        this.style.width = vw + 'px';
        if (par && par !== document.body) { par.style.width = vw + 'px'; par.style.maxWidth = '100vw'; }
      }
      var off = this._offAttr || 0, hd = document.getElementById('SITE_HEADER');
      if (hd) { var hp = getComputedStyle(hd).position; off = (hp === 'sticky' || hp === 'fixed') ? Math.round(hd.getBoundingClientRect().height) : 0; }
      if (off !== this._off) { this._off = off; this.style.setProperty('--off', off + 'px'); }
      var w = this.getBoundingClientRect().width || window.innerWidth;
      this.classList.toggle('m', w < 768); this.classList.toggle('xl', w >= 1280);
      var vh = window.innerHeight;
      if (window.screen && screen.height && vh > screen.height) vh = screen.height;
      var sh = Math.max(420, vh - this._off);
      if (!this.classList.contains('m')) sh = Math.min(sh, 900);
      if (sh !== this._sh) { this._sh = sh; this.style.setProperty('--sh', sh + 'px'); }
    }
    _attrs() {
      this._offAttr = parseInt(this.getAttribute('offset-top') || '0', 10) || 0;
      this._layout(); this._size(); this._update();
    }
    _size() {
      if (!this._alt) return;
      var last = this._r.querySelector('#fc-dove');
      var h = last ? last.getBoundingClientRect().bottom - this.getBoundingClientRect().top : this.offsetHeight;
      this._h = h;
      if (this.getAttribute('altezza-auto') !== 'no' && h > 200) {
        var hp = Math.ceil(h) + 'px';
        if (this.style.height !== hp) {
          this.style.height = hp; this.style.minHeight = hp; this.style.maxHeight = hp;
          var par = this.parentElement;
          if (par && par !== document.body) { par.style.height = hp; par.style.minHeight = hp; }
        }
      }
      var show = (this.getAttribute('mostra-altezza') || '').toLowerCase() === 'si';
      this._alt.hidden = !show;
      if (show) this._alt.textContent = 'Altezza da dare all’elemento in Wix: ' + Math.ceil(h) + ' px (larghezza schermo ' + window.innerWidth + ' px)';
    }
    vai(nome) {
      var y;
      if (nome === 'contatti') {
        y = this.getBoundingClientRect().bottom + window.scrollY - this._off;
      } else {
        var el = this._r.getElementById('fc-' + nome);
        if (!el) { var all = document.querySelectorAll('farecasa-home'); for (var i = 0; i < all.length && !el; i++) { if (all[i].shadowRoot) el = all[i].shadowRoot.getElementById('fc-' + nome); } }
        if (!el) return;
        y = el.getBoundingClientRect().top + window.scrollY - this._off - 16;
      }
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
    vaiFase(i) {
      var rect = this._story.getBoundingClientRect();
      var corsa = Math.max(1, rect.height - this._stage.offsetHeight);
      var y = rect.top + window.scrollY - this._off + (i / 4) * corsa + (i === 0 ? 2 : 0);
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
    _docClick(e) {
      var a = e.target && e.target.closest && e.target.closest('a[href*="#fc-"]');
      if (!a) return;
      var m = a.getAttribute('href').match(/#fc-([a-z-]+)/);
      if (!m) return;
      e.preventDefault(); e.stopPropagation();
      this.vai(m[1]);
    }
    _hash() { var m = (location.hash || '').match(/#fc-([a-z-]+)/); if (m) this.vai(m[1]); }
    _primeVid() { var v = this._vid; if (!v) return; var p = v.play(); if (p && p.then) p.then(function () { v.pause(); }).catch(function () {}); }
    _sched() { if (this._raf) return; var s = this; this._raf = requestAnimationFrame(function () { s._raf = 0; s._update(); }); }
    _update() {
      if (!this._story) return;
      var vh = window.innerHeight, off = this._off;
      var rect = this._story.getBoundingClientRect();
      var stH = this._stage.offsetHeight;
      var corsa = Math.max(1, rect.height - stH);
      var progress = clamp((off - rect.top) / corsa, 0, 1);
      if (this._mode === 'sticky') {
        var s = this._stage.getBoundingClientRect();
        var atteso = rect.top >= off ? rect.top : Math.min(off, rect.bottom - s.height);
        if (Math.abs(s.top - atteso) > 4) { this._mode = 'manual'; this._stage.classList.add('abs'); }
      }
      if (this._mode === 'manual') this._stage.style.top = clamp(off - rect.top, 0, corsa) + 'px';
      var v = this._vid;
      if (v && v.duration && isFinite(v.duration)) {
        var t = progress * (v.duration - 0.05);
        if (Math.abs(v.currentTime - t) > 0.01) v.currentTime = t;
      }
      var f = clamp(Math.round(progress * 4), 0, 4);
      this._bar.style.width = Math.round(progress * 100) + '%'; if (this._pbar) this._pbar.style.width = this._bar.style.width;
      if (f !== this._fase) {
        this._fase = f;
        this._cards.forEach(function (c, i) { c.classList.toggle('on', i === f); });
        this._dots.forEach(function (d, i) { d.classList.toggle('on', i <= f); });
        this._nome.textContent = 'IL BAGNO · ' + FASI[f][1]; if (this._nome2) this._nome2.textContent = this._nome.textContent;
        this._fb.forEach(function (b, i) { b.classList.toggle('on', i === f); b.classList.toggle('v', i < f); });
        this._numf.textContent = '0' + (f + 1) + ' / 05';
      }
    }
  }
  customElements.define('farecasa-home', FarecasaHome);
})();
