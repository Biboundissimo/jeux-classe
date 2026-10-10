/*
 * Moteur de jeu « mots croisés » (horizontal et vertical uniquement).
 * La grille est construite automatiquement à partir de la liste de mots.
 * Les lettres s'écrivent au stylet (reconnaissance d'écriture), au doigt, ou avec le clavier.
 *
 * configuration = {
 *   titre: "Mots croisés",
 *   consigne: "...",
 *   mots: [ { mot: 'museau', definition: "Le nez et la bouche d'un animal." }, ... ]
 * }
 */
function lancerMotsCroises(config) {
  const $ = sel => document.querySelector(sel);
  const ICONE_SON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>' +
    '<path d="M16.5 12A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor"/>' +
    '<path d="M14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" fill="currentColor"/></svg>';
  const normaliser = mot => mot.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  document.title = config.titre;
  document.body.innerHTML = `
    <div class="jeu mots-croises">
      <header class="bandeau">
        <a class="retour" href="../../index.html" aria-label="Retour à l'accueil">⌂</a>
        <h1>${config.titre}</h1>
        <div class="compteur"></div>
      </header>

      <main class="plateau-croise">
        <aside class="definitions">
          <h2>Horizontal →</h2>
          <ol class="defs-h"></ol>
          <h2>Vertical ↓</h2>
          <ol class="defs-v"></ol>
        </aside>

        <div class="zone-grille"><div class="grille-croisee"></div></div>

        <aside class="ardoise">
          <p class="aide-ardoise">Écris la lettre ici, en CAPITALE</p>
          <canvas aria-label="Zone d'écriture"></canvas>
          <div class="alternatives"></div>
          <div class="outils">
            <button class="outil" id="gomme" title="Effacer la lettre">⌫ Gomme</button>
            <button class="outil" id="bouton-clavier" title="Afficher le clavier">⌨ Clavier</button>
          </div>
          <div class="clavier cache">${ALPHABET.map(l => `<button>${l}</button>`).join('')}</div>
        </aside>
      </main>

      <div class="ecran" id="ecran-debut">
        <div class="boite">
          <h2>${config.titre}</h2>
          <p>${config.consigne}</p>
          <p class="petit">Appuie sur une définition pour l'entendre ${ICONE_SON.replace('<svg', '<svg class="inline"')}</p>
          <button class="gros-bouton" id="commencer">Commencer</button>
        </div>
      </div>

      <div class="ecran cache" id="ecran-fin">
        <div class="boite">
          <div class="etoiles"><span class="pleine">★</span><span class="pleine">★</span><span class="pleine">★</span></div>
          <h2>Bravo !</h2>
          <p class="resultat"></p>
          <div class="boutons">
            <button class="gros-bouton" id="rejouer">Nouvelle grille</button>
            <a class="gros-bouton secondaire" href="../../index.html">Accueil</a>
          </div>
        </div>
      </div>
    </div>`;

  // =====================================================================
  //  Construction de la grille
  // =====================================================================
  const cle = (l, c) => l + ',' + c;

  /** Essaie de placer tous les mots en les croisant ; renvoie null en cas d'échec. */
  function essayerPlacement(ordre) {
    const cases = new Map(); // "l,c" -> { lettre, h, v }
    const places = [];

    function peutPlacer(texte, l, c, dl, dc) {
      const avant = cases.get(cle(l - dl, c - dc));
      const apres = cases.get(cle(l + dl * texte.length, c + dc * texte.length));
      if (avant || apres) return -1;
      let croisements = 0;
      for (let i = 0; i < texte.length; i++) {
        const li = l + dl * i, ci = c + dc * i;
        const deja = cases.get(cle(li, ci));
        if (deja) {
          if (deja.lettre !== texte[i] || (dl ? deja.v : deja.h)) return -1;
          croisements++;
        } else if (cases.get(cle(li + dc, ci + dl)) || cases.get(cle(li - dc, ci - dl))) {
          return -1; // une lettre collée à côté formerait un mot qui n'existe pas
        }
      }
      return croisements;
    }

    function placer(m, l, c, dl, dc) {
      for (let i = 0; i < m.texte.length; i++) {
        const k = cle(l + dl * i, c + dc * i);
        const caseG = cases.get(k) || { lettre: m.texte[i] };
        if (dl) caseG.v = true; else caseG.h = true;
        cases.set(k, caseG);
      }
      places.push({ ...m, l, c, dl, dc });
    }

    placer(ordre[0], 0, 0, 0, 1);
    let restants = ordre.slice(1);
    let progres = true;
    while (restants.length && progres) {
      progres = false;
      for (const m of restants.slice()) {
        const possibles = [];
        for (const [k, caseG] of cases) {
          const [l, c] = k.split(',').map(Number);
          for (let i = 0; i < m.texte.length; i++) {
            if (m.texte[i] !== caseG.lettre) continue;
            for (const [dl, dc] of [[0, 1], [1, 0]]) {
              const n = peutPlacer(m.texte, l - dl * i, c - dc * i, dl, dc);
              if (n > 0) possibles.push([l - dl * i, c - dc * i, dl, dc]);
            }
          }
        }
        if (possibles.length) {
          placer(m, ...possibles[Math.floor(Math.random() * possibles.length)]);
          restants = restants.filter(x => x !== m);
          progres = true;
        }
      }
    }
    return restants.length ? null : places;
  }

  /** Cherche une grille compacte, à peu près carrée, avec beaucoup de croisements. */
  function construireGrille(mots) {
    let meilleure = null, meilleurScore = -Infinity;
    for (let essai = 0; essai < 400; essai++) {
      const ordre = Ecole.melanger(mots);
      const places = essayerPlacement(ordre);
      if (!places) continue;
      const ls = places.flatMap(p => [p.l, p.l + p.dl * (p.texte.length - 1)]);
      const cs = places.flatMap(p => [p.c, p.c + p.dc * (p.texte.length - 1)]);
      const hauteur = Math.max(...ls) - Math.min(...ls) + 1;
      const largeur = Math.max(...cs) - Math.min(...cs) + 1;
      const lettres = new Set();
      places.forEach(p => { for (let i = 0; i < p.texte.length; i++) lettres.add(cle(p.l + p.dl * i, p.c + p.dc * i)); });
      const croisements = places.reduce((s, p) => s + p.texte.length, 0) - lettres.size;
      const score = croisements * 6 - hauteur * largeur * 0.5 - Math.abs(hauteur - largeur) * 3;
      if (score > meilleurScore) {
        meilleurScore = score;
        const l0 = Math.min(...ls), c0 = Math.min(...cs);
        meilleure = { lignes: hauteur, colonnes: largeur, places: places.map(p => ({ ...p, l: p.l - l0, c: p.c - c0 })) };
      }
    }
    // Numérotation : de gauche à droite, puis de haut en bas.
    const departs = [...new Set(meilleure.places.map(p => cle(p.l, p.c)))]
      .map(k => k.split(',').map(Number))
      .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    meilleure.places.forEach(p => {
      p.numero = departs.findIndex(([l, c]) => l === p.l && c === p.c) + 1;
    });
    return meilleure;
  }

  // =====================================================================
  //  État de la partie et affichage
  // =====================================================================
  const grilleEl = $('.grille-croisee');
  let mots = [];          // mots placés : { mot, texte, definition, l, c, dl, dc, numero, valide, elDef }
  let cases = new Map();  // "l,c" -> { solution, lettre, el, mots: [indices] }
  let selection = null;   // { mot: indice, pos: position dans le mot }

  const casesDuMot = m => Array.from({ length: m.texte.length }, (_, i) => cases.get(cle(m.l + m.dl * i, m.c + m.dc * i)));
  const verrouillee = caseG => caseG.mots.some(i => mots[i].valide);

  function nouvellePartie() {
    const liste = config.mots.map(m => ({ ...m, texte: normaliser(m.mot) }));
    const grille = construireGrille(liste);
    mots = grille.places.map(p => ({ ...p, valide: false }));
    cases = new Map();
    selection = null;

    grilleEl.style.setProperty('--colonnes', grille.colonnes);
    grilleEl.style.setProperty('--lignes', grille.lignes);
    grilleEl.innerHTML = '';
    mots.forEach((m, indice) => {
      for (let i = 0; i < m.texte.length; i++) {
        const l = m.l + m.dl * i, c = m.c + m.dc * i, k = cle(l, c);
        if (!cases.has(k)) {
          const el = document.createElement('div');
          el.className = 'case-croisee';
          el.style.gridRow = l + 1;
          el.style.gridColumn = c + 1;
          el.innerHTML = '<span class="lettre"></span>';
          el.addEventListener('click', () => toucherCase(k));
          grilleEl.appendChild(el);
          cases.set(k, { solution: m.texte[i], lettre: '', el, mots: [] });
        }
        cases.get(k).mots.push(indice);
      }
      const depart = cases.get(cle(m.l, m.c)).el;
      if (!depart.querySelector('.numero'))
        depart.insertAdjacentHTML('afterbegin', `<span class="numero">${m.numero}</span>`);
    });

    // Définitions, rangées par numéro.
    $('.defs-h').innerHTML = '';
    $('.defs-v').innerHTML = '';
    mots.map((m, i) => i).sort((a, b) => mots[a].numero - mots[b].numero).forEach(i => {
      const m = mots[i];
      const li = document.createElement('li');
      li.innerHTML = `<span class="num">${m.numero}</span><span class="texte">${m.definition}</span>
                      <span class="lettres-def">(${m.texte.length} lettres)</span>`;
      li.addEventListener('click', () => {
        const premiereVide = casesDuMot(m).findIndex(cg => !cg.lettre);
        selectionner(i, premiereVide >= 0 ? premiereVide : 0, true);
      });
      m.elDef = li;
      (m.dl ? $('.defs-v') : $('.defs-h')).appendChild(li);
    });

    majCompteur();
    $('#ecran-fin').classList.add('cache');
    // On commence par la première définition horizontale.
    const premier = mots.map((m, i) => i).filter(i => !mots[i].dl).sort((a, b) => mots[a].numero - mots[b].numero)[0];
    selectionner(premier, 0, true);
  }

  function majCompteur() {
    $('.compteur').textContent = `${mots.filter(m => m.valide).length} / ${mots.length} mots`;
  }

  function selectionner(indice, pos, lireDefinition) {
    const changement = !selection || selection.mot !== indice;
    selection = { mot: indice, pos };
    afficherSelection();
    if (lireDefinition || changement) Ecole.dire(mots[indice].definition);
  }

  function afficherSelection() {
    document.querySelectorAll('.case-croisee').forEach(el => el.classList.remove('mot-actif', 'case-active'));
    mots.forEach(m => m.elDef.classList.remove('actif'));
    if (!selection) return;
    const m = mots[selection.mot];
    casesDuMot(m).forEach((cg, i) => {
      cg.el.classList.add('mot-actif');
      if (i === selection.pos) cg.el.classList.add('case-active');
    });
    m.elDef.classList.add('actif');
    // On fait défiler la liste des définitions (et pas toute la page) pour montrer la définition active.
    const liste = $('.definitions');
    const haut = m.elDef.offsetTop; // position relative à la liste (.definitions est en position: relative)
    if (haut < liste.scrollTop) liste.scrollTop = haut - 8;
    else if (haut + m.elDef.offsetHeight > liste.scrollTop + liste.clientHeight)
      liste.scrollTop = haut + m.elDef.offsetHeight - liste.clientHeight + 8;
  }

  function toucherCase(k) {
    const caseG = cases.get(k);
    let indice;
    if (selection && caseG.mots.includes(selection.mot)) {
      const m = mots[selection.mot];
      const pos = casesDuMot(m).indexOf(caseG);
      // Deuxième appui sur la case active d'un croisement : on change de sens.
      if (pos === selection.pos && caseG.mots.length > 1) indice = caseG.mots.find(i => i !== selection.mot);
      else return selectionner(selection.mot, pos, false);
    } else {
      indice = caseG.mots.find(i => !mots[i].valide) ?? caseG.mots[0];
    }
    selectionner(indice, casesDuMot(mots[indice]).indexOf(caseG), false);
  }

  // =====================================================================
  //  Écrire une lettre
  // =====================================================================
  let derniereCase = null; // case remplie par la dernière lettre écrite (pour la corriger)

  function ecrireLettre(lettre) {
    if (!selection) return;
    const m = mots[selection.mot];
    const liste = casesDuMot(m);
    let pos = selection.pos;
    // Case déjà validée (croisement) : si l'enfant y réécrit la même lettre, on passe simplement à la suivante.
    if (pos < liste.length && verrouillee(liste[pos]) && liste[pos].lettre === lettre) {
      let suivante = pos + 1;
      while (suivante < liste.length && verrouillee(liste[suivante])) suivante++;
      selection.pos = Math.min(suivante, liste.length - 1);
      return afficherSelection();
    }
    // Sinon, les cases déjà validées sont sautées.
    while (pos < liste.length && verrouillee(liste[pos])) pos++;
    if (pos >= liste.length) return;
    derniereCase = liste[pos];
    poserLettre(derniereCase, lettre);
    // Case suivante : la prochaine case libre du mot.
    let suivante = pos + 1;
    while (suivante < liste.length && verrouillee(liste[suivante])) suivante++;
    selection.pos = Math.min(suivante, liste.length - 1);
    afficherSelection();
  }

  function poserLettre(caseG, lettre) {
    caseG.lettre = lettre;
    caseG.el.querySelector('.lettre').textContent = lettre;
    caseG.mots.forEach(verifierMot);
  }

  function effacer() {
    if (!selection) return;
    const liste = casesDuMot(mots[selection.mot]);
    let pos = selection.pos;
    // Case active vide : on recule d'une case, comme sur un clavier.
    if (!liste[pos].lettre || verrouillee(liste[pos])) {
      pos--;
      while (pos >= 0 && verrouillee(liste[pos])) pos--;
      if (pos < 0) return;
    }
    liste[pos].lettre = '';
    liste[pos].el.querySelector('.lettre').textContent = '';
    selection.pos = pos;
    afficherSelection();
  }

  function verifierMot(indice) {
    const m = mots[indice];
    if (m.valide) return;
    const liste = casesDuMot(m);
    if (liste.some(cg => !cg.lettre)) return;
    const propose = liste.map(cg => cg.lettre).join('');

    if (propose !== m.texte) {
      Ecole.bruitage('oups');
      liste.forEach(cg => {
        cg.el.classList.remove('faux');
        void cg.el.offsetWidth;
        cg.el.classList.add('faux');
      });
      return;
    }

    m.valide = true;
    liste.forEach(cg => cg.el.classList.add('valide'));
    m.elDef.classList.add('trouve');
    Ecole.bruitage('bravo');
    setTimeout(() => Ecole.dire(m.mot), 300);
    majCompteur();

    if (mots.every(x => x.valide)) {
      setTimeout(() => {
        Ecole.bruitage('fin');
        $('.resultat').textContent = `Tu as rempli toute la grille !`;
        $('#ecran-fin').classList.remove('cache');
        Ecole.dire('Bravo !');
      }, 1500);
    } else {
      // On passe au mot suivant qui n'est pas encore trouvé.
      const ordre = mots.map((x, i) => i).sort((a, b) => mots[a].dl - mots[b].dl || mots[a].numero - mots[b].numero);
      const suivant = ordre.find(i => !mots[i].valide && ordre.indexOf(i) > ordre.indexOf(indice))
        ?? ordre.find(i => !mots[i].valide);
      setTimeout(() => {
        const vide = casesDuMot(mots[suivant]).findIndex(cg => !cg.lettre);
        selectionner(suivant, vide >= 0 ? vide : 0, true);
      }, 1300);
    }
  }

  // =====================================================================
  //  Ardoise : écriture au stylet ou au doigt
  // =====================================================================
  const canvas = $('.ardoise canvas');
  const ctx = canvas.getContext('2d');
  let traits = [], traitEnCours = null, minuteur = null, stylet = false, dernierDessin = null;

  function dimensionnerArdoise() {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(6, r.width / 30);
    ctx.strokeStyle = '#2b2d42';
    redessiner();
  }
  window.addEventListener('resize', dimensionnerArdoise);

  function redessiner() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const t of traits) {
      ctx.beginPath();
      t.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      if (t.length === 1) ctx.lineTo(t[0].x + 0.1, t[0].y);
      ctx.stroke();
    }
  }

  const positionArdoise = e => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  canvas.addEventListener('pointerdown', e => {
    if (e.pointerType === 'pen') stylet = true;
    else if (e.pointerType === 'touch' && stylet) return; // la main posée sur l'écran est ignorée
    e.preventDefault();
    clearTimeout(minuteur);
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* pointeur déjà relâché */ }
    traitEnCours = { id: e.pointerId, points: [positionArdoise(e)] };
    traits.push(traitEnCours.points);
    redessiner();
  });

  canvas.addEventListener('pointermove', e => {
    if (!traitEnCours || e.pointerId !== traitEnCours.id) return;
    const evenements = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    (evenements.length ? evenements : [e]).forEach(ev => traitEnCours.points.push(positionArdoise(ev)));
    redessiner();
  });

  function finTrait(e) {
    if (!traitEnCours || e.pointerId !== traitEnCours.id) return;
    traitEnCours = null;
    // On attend un peu : l'enfant a peut-être encore des traits à faire (E, H, A…).
    minuteur = setTimeout(reconnaitre, 900);
  }
  canvas.addEventListener('pointerup', finTrait);
  canvas.addEventListener('pointercancel', finTrait);

  function reconnaitre() {
    const resultats = ReconnaissanceLettres.reconnaitre(traits);
    dernierDessin = traits;
    traits = [];
    redessiner();
    if (!resultats) return;
    ecrireLettre(resultats[0].lettre);
    afficherAlternatives(resultats.slice(1, 4).map(r => r.lettre));
  }

  /** « Ce n'est pas ça ? » : l'enfant peut choisir une autre lettre proposée. */
  function afficherAlternatives(lettres) {
    const zone = $('.alternatives');
    zone.innerHTML = '<span>Pas la bonne lettre ?</span>' + lettres.map(l => `<button>${l}</button>`).join('');
    zone.querySelectorAll('button').forEach(b => b.addEventListener('click', () => corriger(b.textContent)));
  }

  function corriger(lettre) {
    $('.alternatives').innerHTML = '';
    if (!derniereCase || verrouillee(derniereCase)) return;
    poserLettre(derniereCase, lettre);
    if (dernierDessin) ReconnaissanceLettres.apprendre(lettre, dernierDessin);
  }

  // =====================================================================
  //  Clavier, gomme, boutons
  // =====================================================================
  $('.clavier').addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
    $('.alternatives').innerHTML = '';
    ecrireLettre(e.target.textContent);
  });
  $('#bouton-clavier').addEventListener('click', () => $('.clavier').classList.toggle('cache'));
  $('#gomme').addEventListener('click', () => { $('.alternatives').innerHTML = ''; effacer(); });

  document.addEventListener('keydown', e => {
    if (!selection || $('#ecran-debut:not(.cache)')) return;
    if (/^[a-zA-Z]$/.test(e.key)) ecrireLettre(e.key.toUpperCase());
    else if (e.key === 'Backspace') { e.preventDefault(); effacer(); }
  });

  $('#commencer').addEventListener('click', () => {
    $('#ecran-debut').classList.add('cache');
    nouvellePartie();
    dimensionnerArdoise();
  });
  $('#rejouer').addEventListener('click', () => {
    nouvellePartie();
    dimensionnerArdoise();
  });
}
