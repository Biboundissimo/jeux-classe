/*
 * Moteur de jeu « mots mêlés ».
 * Chaque partie génère une nouvelle grille au hasard.
 *
 * configuration = {
 *   titre: "Mots mêlés",
 *   consigne: "...",
 *   tailles: { facile: 12, moyen: 12, difficile: 15 }, // facultatif, agrandie automatiquement si besoin
 *   mots: ['terrier', 'museau', ...]
 * }
 */
function lancerMotsMeles(config) {
  const $ = sel => document.querySelector(sel);

  const COULEURS = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff924c', '#00bbf9',
    '#f15bb5', '#52a675', '#c5ca30', '#9b5de5', '#e76f51', '#4267ac', '#00c49a', '#b5838d'];

  // Sens dans lesquels les mots peuvent être cachés, selon le niveau choisi.
  // Aucun mot n'est écrit à l'envers : on lit toujours de gauche à droite ou de haut en bas.
  const DROITE = [0, 1], BAS = [1, 0], DIAG_BAS = [1, 1], DIAG_HAUT = [-1, 1];
  const tailles = { facile: 12, moyen: 12, difficile: 15, ...config.tailles };
  const NIVEAUX = {
    facile:    { nom: 'Facile',    sens: [DROITE, BAS] },
    moyen:     { nom: 'Moyen',     sens: [DROITE, BAS, DIAG_BAS] },
    difficile: { nom: 'Difficile', sens: [DROITE, BAS, DIAG_BAS, DIAG_HAUT] },
  };
  const FLECHES = new Map([[DROITE, '→'], [BAS, '↓'], [DIAG_BAS, '↘'], [DIAG_HAUT, '↗']]);
  for (const [id, n] of Object.entries(NIVEAUX)) {
    n.taille = tailles[id];
    n.aide = `${n.sens.map(s => FLECHES.get(s)).join(' ')} · ${n.taille}×${n.taille}`;
  }
  // Lettres de remplissage, tirées selon leur fréquence en français.
  const REMPLISSAGE = 'AAAAAEEEEEEEIIIIINNNNOOOORRRRSSSSTTTTUUUULLLCCDDMMPPBFGHVJQXYZK';

  const normaliser = mot => mot.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();

  document.title = config.titre;
  document.body.innerHTML = `
    <div class="jeu mots-meles">
      <header class="bandeau">
        <a class="retour" href="../../index.html" aria-label="Retour à l'accueil">⌂</a>
        <h1>${config.titre}</h1>
        <div class="compteur"></div>
      </header>

      <main class="plateau">
        <div class="cadre-grille">
          <div class="grille">
            <svg class="surlignage" preserveAspectRatio="none"></svg>
            <div class="lettres"></div>
          </div>
        </div>
        <aside class="liste-mots">
          <h2>Mots à trouver</h2>
          <ul></ul>
        </aside>
      </main>

      <div class="ecran" id="ecran-debut">
        <div class="boite">
          <h2>${config.titre}</h2>
          <p>${config.consigne}</p>
          <p class="petit">Choisis ton niveau :</p>
          <div class="boutons niveaux">
            ${Object.entries(NIVEAUX).map(([id, n]) =>
              `<button class="gros-bouton niveau" data-niveau="${id}">${n.nom}<small>${n.aide}</small></button>`).join('')}
          </div>
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

  const grille = $('.grille');
  const svg = $('.surlignage');
  const zoneLettres = $('.lettres');
  const listeMots = $('.liste-mots ul');

  // ----- État de la partie -----
  let taille, lettres, mots, niveau, couleurSuivante;
  let selection = null;   // { debut: [l, c], fin: [l, c] } pendant que l'enfant sélectionne
  let premierToucher = null; // première lettre touchée, pour sélectionner en deux appuis
  let ligneSelection = null;

  // ================= Génération de la grille =================
  function placementsPossibles(g, mot, sensPermis) {
    const n = g.length, possibles = [];
    for (const [dl, dc] of sensPermis) {
      for (let l = 0; l < n; l++) {
        for (let c = 0; c < n; c++) {
          const lFin = l + dl * (mot.length - 1), cFin = c + dc * (mot.length - 1);
          if (lFin < 0 || lFin >= n || cFin < 0 || cFin >= n) continue;
          let ok = true, croisements = 0;
          for (let i = 0; i < mot.length && ok; i++) {
            const deja = g[l + dl * i][c + dc * i];
            if (deja && deja !== mot[i]) ok = false;
            if (deja === mot[i]) croisements++;
          }
          // croisements === longueur : le mot serait entièrement caché dans un autre
          if (ok && croisements < mot.length) possibles.push({ l, c, dl, dc, croisements });
        }
      }
    }
    return possibles;
  }

  function genererGrille(listeMots, n, sensPermis) {
    // Les mots les plus longs d'abord : ce sont les plus difficiles à caser.
    const ordre = listeMots.slice().sort((a, b) => b.texte.length - a.texte.length);
    for (let essai = 0; essai < 100; essai++) {
      const g = Array.from({ length: n }, () => Array(n).fill(null));
      let reussi = true;
      for (const m of ordre) {
        const possibles = placementsPossibles(g, m.texte, sensPermis);
        if (!possibles.length) { reussi = false; break; }
        // On favorise les mots qui se croisent (3 fois sur 4 quand c'est possible).
        const croises = possibles.filter(p => p.croisements > 0);
        const choix = croises.length && Math.random() < 0.75 ? croises : possibles;
        const p = choix[Math.floor(Math.random() * choix.length)];
        for (let i = 0; i < m.texte.length; i++) g[p.l + p.dl * i][p.c + p.dc * i] = m.texte[i];
      }
      if (reussi) {
        for (const ligne of g)
          for (let c = 0; c < n; c++)
            if (!ligne[c]) ligne[c] = REMPLISSAGE[Math.floor(Math.random() * REMPLISSAGE.length)];
        return { g, n };
      }
    }
    return genererGrille(listeMots, n + 1, sensPermis); // grille trop petite : on l'agrandit
  }

  // ================= Affichage =================
  function nouvellePartie() {
    mots = Ecole.melanger(config.mots).map(m => ({ mot: m, texte: normaliser(m), trouve: false }));
    const resultat = genererGrille(mots, NIVEAUX[niveau].taille, NIVEAUX[niveau].sens);
    lettres = resultat.g;
    taille = resultat.n;
    couleurSuivante = 0;
    selection = premierToucher = null;

    grille.style.setProperty('--n', taille);
    zoneLettres.innerHTML = lettres.flat().map(x => `<span>${x}</span>`).join('');
    svg.setAttribute('viewBox', `0 0 ${taille} ${taille}`);
    svg.innerHTML = '';
    ligneSelection = creerTrait('selection');
    ligneSelection.style.display = 'none';

    // Liste des mots dans l'ordre alphabétique, plus simple à parcourir pour l'enfant.
    listeMots.innerHTML = '';
    mots.slice().sort((a, b) => a.texte.localeCompare(b.texte)).forEach(m => {
      const li = document.createElement('li');
      li.textContent = m.texte;
      li.addEventListener('click', () => Ecole.dire(m.mot));
      m.element = li;
      listeMots.appendChild(li);
    });
    majCompteur();
    $('#ecran-fin').classList.add('cache');
  }

  function creerTrait(classe, couleur) {
    const trait = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    trait.setAttribute('class', classe);
    if (couleur) trait.style.stroke = couleur;
    svg.appendChild(trait);
    return trait;
  }

  function placerTrait(trait, debut, fin) {
    trait.setAttribute('x1', debut[1] + 0.5);
    trait.setAttribute('y1', debut[0] + 0.5);
    trait.setAttribute('x2', fin[1] + 0.5);
    trait.setAttribute('y2', fin[0] + 0.5);
  }

  function majCompteur() {
    const trouves = mots.filter(m => m.trouve).length;
    $('.compteur').textContent = `${trouves} / ${mots.length} mots`;
  }

  // ================= Sélection à la souris ou au doigt =================
  /** Position du pointeur dans la grille, en nombre de cases (nombres à virgule). */
  function positionDans(e) {
    const r = grille.getBoundingClientRect();
    return [(e.clientY - r.top) / r.height * taille, (e.clientX - r.left) / r.width * taille];
  }
  const caseDe = ([y, x]) => [
    Math.min(taille - 1, Math.max(0, Math.floor(y))),
    Math.min(taille - 1, Math.max(0, Math.floor(x))),
  ];

  /** Fin de sélection alignée sur l'une des 8 directions (horizontale, verticale, diagonale). */
  function finAlignee(debut, [y, x]) {
    const dy = y - (debut[0] + 0.5), dx = x - (debut[1] + 0.5);
    if (Math.hypot(dx, dy) < 0.5) return debut;
    const angle = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * (Math.PI / 4);
    const sl = Math.round(Math.sin(angle)), sc = Math.round(Math.cos(angle));
    let pas = Math.round((dy * sl + dx * sc) / (sl * sl + sc * sc));
    // on reste dans la grille
    while (pas > 0) {
      const l = debut[0] + sl * pas, c = debut[1] + sc * pas;
      if (l >= 0 && l < taille && c >= 0 && c < taille) break;
      pas--;
    }
    return [debut[0] + sl * pas, debut[1] + sc * pas];
  }

  function lettresEntre(debut, fin) {
    const n = Math.max(Math.abs(fin[0] - debut[0]), Math.abs(fin[1] - debut[1]));
    const sl = Math.sign(fin[0] - debut[0]), sc = Math.sign(fin[1] - debut[1]);
    let texte = '';
    for (let i = 0; i <= n; i++) texte += lettres[debut[0] + sl * i][debut[1] + sc * i];
    return texte;
  }

  const memeCase = (a, b) => a[0] === b[0] && a[1] === b[1];

  function montrerSelection() {
    if (!selection) { ligneSelection.style.display = 'none'; return; }
    ligneSelection.style.display = '';
    placerTrait(ligneSelection, selection.debut, selection.fin);
  }

  grille.addEventListener('pointerdown', e => {
    e.preventDefault();
    const pos = positionDans(e);
    const ici = caseDe(pos);
    // Deuxième appui (sélection en deux touchers) : on relie la première lettre à celle-ci.
    if (premierToucher && !memeCase(premierToucher, ici)) {
      selection = { debut: premierToucher, fin: finAlignee(premierToucher, pos) };
      premierToucher = null;
      return valider();
    }
    grille.setPointerCapture(e.pointerId);
    selection = { debut: ici, fin: ici, glisse: true };
    montrerSelection();
  });

  grille.addEventListener('pointermove', e => {
    if (!selection || !selection.glisse) return;
    selection.fin = finAlignee(selection.debut, positionDans(e));
    montrerSelection();
  });

  grille.addEventListener('pointerup', () => {
    if (!selection || !selection.glisse) return;
    if (memeCase(selection.debut, selection.fin)) {
      // Simple appui : on retient la lettre, l'enfant peut toucher la dernière lettre du mot.
      premierToucher = premierToucher && memeCase(premierToucher, selection.debut) ? null : selection.debut;
      selection = premierToucher ? { debut: premierToucher, fin: premierToucher } : null;
      return montrerSelection();
    }
    valider();
  });

  grille.addEventListener('pointercancel', () => { selection = premierToucher = null; montrerSelection(); });

  function valider() {
    const { debut, fin } = selection;
    const texte = lettresEntre(debut, fin);
    const envers = texte.split('').reverse().join('');
    const m = mots.find(m => !m.trouve && (m.texte === texte || m.texte === envers));
    selection = null;
    montrerSelection();

    if (!m) {
      // Mauvaise sélection : le trait clignote en rouge puis disparaît.
      const rate = creerTrait('rate');
      placerTrait(rate, debut, fin);
      setTimeout(() => rate.remove(), 450);
      return;
    }

    m.trouve = true;
    const couleur = COULEURS[couleurSuivante++ % COULEURS.length];
    placerTrait(creerTrait('trouve', couleur), debut, fin);
    svg.appendChild(ligneSelection); // la sélection reste dessinée au-dessus
    m.element.classList.add('trouve');
    m.element.style.setProperty('--couleur', couleur);
    Ecole.bruitage('bravo');
    Ecole.dire(m.mot);
    majCompteur();

    if (mots.every(m => m.trouve)) {
      setTimeout(() => {
        Ecole.bruitage('fin');
        $('.resultat').textContent = `Tu as trouvé les ${mots.length} mots !`;
        $('#ecran-fin').classList.remove('cache');
        Ecole.dire('Bravo !');
      }, 1200);
    }
  }

  // ================= Boutons =================
  document.querySelectorAll('.niveau').forEach(b => b.addEventListener('click', () => {
    niveau = b.dataset.niveau;
    $('#ecran-debut').classList.add('cache');
    nouvellePartie();
  }));
  $('#rejouer').addEventListener('click', () => {
    $('#ecran-fin').classList.add('cache');
    $('#ecran-debut').classList.remove('cache');
  });
}
