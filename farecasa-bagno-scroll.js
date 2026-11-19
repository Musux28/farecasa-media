/*
  Fare Casa Ceramiche — "Il bagno che si trasforma"
  Elemento personalizzato per Wix (Custom Element).
  Tag name da usare in Wix:  farecasa-bagno-scroll

  Attributi (si impostano in Wix: Imposta attributi):
    video-src   (obbligatorio) indirizzo https del video caricato su Wix
    poster      (facoltativo)  indirizzo https dell'immagine iniziale
    accent      (facoltativo)  colore principale, es. #003C7F
    offset-top  (facoltativo)  altezza in px dell'intestazione fissa del sito, es. 80

  L'altezza dell'elemento in Wix decide quanto scorrimento dura la trasformazione:
  consigliato circa 4000 px sul computer e 3200 px sul telefono.
*/
(function () {
  if (customElements.get('farecasa-bagno-scroll')) return;

  var FASI = [
    { titolo: 'Sopralluogo', nome: 'OGGI', testo: "Partiamo dal bagno com'è adesso. Veniamo a casa tua, prendiamo le misure e ascoltiamo come lo vuoi vivere." },
    { titolo: 'Demolizione', nome: 'DEMOLIZIONE', testo: 'Si riparte da zero: togliamo piastrelle, sanitari e mobili vecchi. Il cantiere lo gestiamo noi.' },
    { titolo: 'Impianti', nome: 'IMPIANTI', testo: "Quello che non si vede, fatto bene: tubi dell'acqua, scarichi e impianto elettrico pronti per il bagno nuovo." },
    { titolo: 'Posa in opera', nome: 'POSA', testo: 'I materiali che hai scelto tu in showroom prendono posto, pezzo dopo pezzo: mattonelle, doccia, mobile e sanitari.' },
    { titolo: 'Chiavi in mano', nome: 'FINITO', testo: 'Pronto, pulito e da vivere. Tu hai scelto i materiali, noi abbiamo pensato a tutto il resto.' }
  ];

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  class FarecasaBagnoScroll extends HTMLElement {
    constructor() {
      super();
      this._root = this.attachShadow({ mode: 'open' });
      this._raf = 0;
      this._mode = 'sticky';
      this._fase = -1;
      this._onScroll = this._schedule.bind(this);
      this._prime = this._primeVideo.bind(this);
    }

    static get observedAttributes() { return ['video-src', 'poster', 'accent', 'offset-top']; }

    attributeChangedCallback() { if (this._built) this._applyAttrs(); }

    connectedCallback() {
      this.style.display = 'block';
      this.style.position = 'relative';
      this.style.width = '100%';
      if (!this.style.height) this.style.height = '100%';
      if (!this._built) this._build();
      this._applyAttrs();
      window.addEventListener('scroll', this._onScroll, { passive: true });
      window.addEventListener('resize', this._onScroll);
      window.addEventListener('touchstart', this._prime, { passive: true, once: true });
      window.addEventListener('pointerdown', this._prime, { passive: true, once: true });
      this._update();
    }

    disconnectedCallback() {
      window.removeEventListener('scroll', this._onScroll);
      window.removeEventListener('resize', this._onScroll);
      cancelAnimationFrame(this._raf);
    }

    _build() {
      this._built = true;
      var fasiHtml = FASI.map(function (f, i) {
        return '<article class="card" data-i="' + i + '">' +
          '<span class="kicker">FASE 0' + (i + 1) + ' / 05</span>' +
          '<h3>' + f.titolo + '</h3><p>' + f.testo + '</p></article>';
      }).join('');
      var dots = FASI.map(function (f, i) {
        return '<span class="dot" data-i="' + i + '"></span>';
      }).join('');
      this._root.innerHTML =
        '<style>' +
        ':host{display:block;position:relative;--accent:#003C7F;--offset:0px}' +
        '*{box-sizing:border-box}' +
        '.stage{position:sticky;top:var(--offset);height:calc(100vh - var(--offset));width:100%;display:flex;gap:48px;align-items:center;justify-content:center;padding:32px 40px;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:#1C1B19}' +
        '.stage.abs{position:absolute;left:0;right:0}' +
        '.texts{position:relative;flex:0 1 460px;height:340px}' +
        '.card{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:16px;opacity:0;transform:translateY(16px);transition:opacity .45s ease,transform .45s ease;pointer-events:none}' +
        '.card.on{opacity:1;transform:none}' +
        '.kicker{font-family:"Space Grotesk",Inter,sans-serif;font-size:14px;letter-spacing:.14em;color:var(--accent)}' +
        'h3{margin:0;font-family:"Space Grotesk",Inter,sans-serif;font-weight:700;font-size:56px;line-height:.95;letter-spacing:-.02em}' +
        'p{margin:0;font-size:19px;line-height:1.6;color:#3E3B36}' +
        '.media{position:relative;height:100%;max-height:820px;aspect-ratio:9/16;background:#EDEAE4;overflow:hidden}' +
        'video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}' +
        '.hud{position:absolute;left:0;right:0;top:0;padding:14px 16px;display:flex;flex-direction:column;gap:10px;background:linear-gradient(rgba(28,27,25,.55),rgba(28,27,25,0));color:#fff;font-family:"Space Grotesk",Inter,sans-serif;font-size:12px;letter-spacing:.12em}' +
        '.hud .row{display:flex;justify-content:space-between}' +
        '.bar{height:3px;background:rgba(255,255,255,.35)}.bar i{display:block;height:3px;width:0;background:#fff}' +
        '.dots{display:flex;gap:8px;margin-top:20px}.dot{width:28px;height:4px;background:rgba(28,27,25,.15)}.dot.on{background:var(--accent)}' +
        '@media (max-width:767px){' +
        '.stage{display:block;padding:0}' +
        '.media{position:absolute;inset:0;height:100%;max-height:none;aspect-ratio:auto;width:100%}' +
        '.texts{position:absolute;left:12px;right:12px;bottom:16px;height:auto;min-height:190px;flex:none;z-index:2}' +
        '.card{inset:auto 0 0 0;background:rgba(255,255,255,.94);padding:18px;gap:8px;justify-content:flex-start}' +
        'h3{font-size:28px;line-height:1}p{font-size:15px;line-height:1.5}.kicker{font-size:12px}.dots{display:none}' +
        '}' +
        '</style>' +
        '<div class="stage" part="stage">' +
        '<div class="texts">' + fasiHtml + '<div class="dots" aria-hidden="true">' + dots + '</div></div>' +
        '<div class="media" role="img" aria-label="Un bagno che si trasforma dal vecchio al nuovo">' +
        '<video muted playsinline preload="auto"></video>' +
        '<div class="hud" aria-hidden="true"><div class="row"><span class="nome">IL BAGNO · OGGI</span><span class="num">01 / 05</span></div><div class="bar"><i></i></div></div>' +
        '</div></div>';
      this._stage = this._root.querySelector('.stage');
      this._video = this._root.querySelector('video');
      this._cards = Array.prototype.slice.call(this._root.querySelectorAll('.card'));
      this._dots = Array.prototype.slice.call(this._root.querySelectorAll('.dot'));
      this._nome = this._root.querySelector('.nome');
      this._num = this._root.querySelector('.num');
      this._bar = this._root.querySelector('.bar i');
      this._video.muted = true;
      var self = this;
      this._video.addEventListener('loadedmetadata', function () { self._update(); });
    }

    _applyAttrs() {
      var src = this.getAttribute('video-src');
      if (src && this._video.getAttribute('src') !== src) { this._video.setAttribute('src', src); this._video.load(); }
      var poster = this.getAttribute('poster');
      if (poster) this._video.setAttribute('poster', poster);
      var accent = this.getAttribute('accent');
      if (accent) this.style.setProperty('--accent', accent);
      var off = parseInt(this.getAttribute('offset-top') || '0', 10) || 0;
      this._offset = off;
      this.style.setProperty('--offset', off + 'px');
      this._update();
    }

    _primeVideo() {
      // iOS carica il video solo dopo un tocco: lo avviamo e fermiamo subito.
      var v = this._video;
      if (!v) return;
      var p = v.play();
      if (p && p.then) p.then(function () { v.pause(); }).catch(function () {});
    }

    _schedule() {
      if (this._raf) return;
      var self = this;
      this._raf = requestAnimationFrame(function () { self._raf = 0; self._update(); });
    }

    _update() {
      if (!this._stage) return;
      var vh = window.innerHeight;
      var off = this._offset || 0;
      var rect = this.getBoundingClientRect();
      var corsa = Math.max(1, rect.height - (vh - off));
      var progress = clamp((off - rect.top) / corsa, 0, 1);

      // Se lo "sticky" non funziona dentro Wix, passiamo al posizionamento manuale.
      if (this._mode === 'sticky') {
        var s = this._stage.getBoundingClientRect();
        var atteso = rect.top >= off ? rect.top : Math.min(off, rect.bottom - s.height);
        if (Math.abs(s.top - atteso) > 4) { this._mode = 'manual'; this._stage.classList.add('abs'); }
      }
      if (this._mode === 'manual') {
        this._stage.style.top = clamp(off - rect.top, 0, corsa) + 'px';
      }

      var v = this._video;
      if (v && v.duration && isFinite(v.duration)) {
        var t = progress * (v.duration - 0.05);
        if (Math.abs(v.currentTime - t) > 0.01) v.currentTime = t;
      }

      var f = clamp(Math.round(progress * 4), 0, 4);
      this._bar.style.width = Math.round(progress * 100) + '%';
      if (f !== this._fase) {
        this._fase = f;
        this._cards.forEach(function (c, i) { c.classList.toggle('on', i === f); });
        this._dots.forEach(function (d, i) { d.classList.toggle('on', i <= f); });
        this._nome.textContent = 'IL BAGNO · ' + FASI[f].nome;
        this._num.textContent = '0' + (f + 1) + ' / 05';
      }
    }
  }

  customElements.define('farecasa-bagno-scroll', FarecasaBagnoScroll);
})();
