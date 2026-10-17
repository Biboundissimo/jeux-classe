/*
 * Moteur de jeu « remettre les lettres dans l'ordre ».
 * Une carte montre une photo ; en dessous, les lettres du mot sont mélangées.
 * L'enfant les fait glisser : les autres lettres se décalent pour faire de la place.
 *
 * configuration = {
 *   titre: "Les lettres en désordre",
 *   consigne: "...",
 *   dossierImages: "../../images/cartes/",
 *   mouvementsMin: 2,   // au moins 2 lettres à déplacer pour remettre le mot en ordre (facultatif)
 *   mots: [ { mot: 'grimpe', avant: 'elle', image: 'grimpe.jpg', son: 'facultatif.mp3' }, ... ]
 *           // « avant » : mot affiché devant, déjà en ordre et non déplaçable (facultatif)
 * }
 */
function lancerJeuLettres(config) {
  const $ = sel => document.querySelector(sel);
  const ICONE_SON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>' +
    '<path d="M16.5 12A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor"/>' +
    '<path d="M14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" fill="currentColor"/></svg>';

  document.title = config.titre;
  // Page de la semaine où revenir avec le bouton ⌂ (sinon la page d'accueil).
  const accueil = config.accueil || '../../index.html';
  document.body.innerHTML = `
    <div class="jeu jeu-lettres">
      <header class="bandeau">
        <a class="retour" href="${accueil}" aria-label="Retour à la liste des jeux">⌂</a>
        <h1>${config.titre}</h1>
        <div class="compteur"></div>
      </header>

      <main class="table">
        <div class="carte-mot">
          <div class="photo"><img alt=""></div>
          <div class="ligne-lettres">
            <div class="avant"></div>
            <div class="pieces"></div>
          </div>
        </div>
        <button class="bouton-son" aria-label="Réécouter le mot">${ICONE_SON}</button>
      </main>

      <section class="collection"></section>

      <div class="ecran" id="ecran-debut">
        <div class="boite">
          <h2>${config.titre}</h2>
          <p>${config.consigne}</p>
          <p class="petit">Appuie sur ${ICONE_SON.replace('<svg', '<svg class="inline"')} pour réécouter le mot.</p>
          <button class="gros-bouton" id="commencer">Commencer</button>
        </div>
      </div>

      <div class="ecran cache" id="ecran-fin">
        <div class="boite">
          <div class="etoiles"><span class="pleine">★</span><span class="pleine">★</span><span class="pleine">★</span></div>
          <h2>Bravo !</h2>
          <p class="resultat"></p>
          <div class="boutons">
            <button class="gros-bouton" id="rejouer">Rejouer</button>
            <a class="gros-bouton secondaire" href="${accueil}">Accueil</a>
          </div>
        </div>
      </div>
    </div>`;

  const carte = $('.carte-mot');
  const zoneTuiles = $('.pieces');
  const collection = $('.collection');

  let liste = [], rang = 0, termine = false;

  const motActuel = () => liste[rang];
  const phrase = m => (m.avant ? m.avant + ' ' : '') + m.mot;
  const direMot = () => Ecole.dire(phrase(motActuel()), motActuel().son);

  /**
   * Nombre minimum de lettres à déplacer pour retrouver le mot.
   * Les lettres qu'on ne bouge pas forment une suite commune aux deux mots :
   * il faut donc déplacer toutes les autres (longueur - plus longue sous-suite commune).
   */
  function mouvementsNecessaires(a, b) {
    const t = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        t[i][j] = a[i - 1] === b[j - 1] ? t[i - 1][j - 1] + 1 : Math.max(t[i - 1][j], t[i][j - 1]);
    return a.length - t[a.length][b.length];
  }

  /** Mélange les lettres en exigeant au moins `mouvementsMin` déplacements pour les remettre en ordre. */
  function melangerLettres(mot) {
    const lettres = mot.toUpperCase().split('');
    const minimum = config.mouvementsMin || 2;
    let meilleur = lettres, score = 0;
    for (let essai = 0; essai < 500 && score < minimum; essai++) {
      const melange = Ecole.melanger(lettres);
      const s = mouvementsNecessaires(melange, lettres);
      if (s > score) { meilleur = melange; score = s; }
    }
    return meilleur;
  }

  // ================= Partie =================
  function nouvellePartie() {
    liste = Ecole.melanger(config.mots);
    rang = 0;
    collection.innerHTML = '';
    $('#ecran-fin').classList.add('cache');
    montrerCarte();
  }

  function montrerCarte() {
    const m = motActuel();
    termine = false;
    $('.photo img').src = config.dossierImages + m.image;
    $('.photo img').alt = phrase(m);
    $('.avant').innerHTML = m.avant
      ? m.avant.toUpperCase().split('').map(l => `<span class="piece fixe">${l}</span>`).join('')
      : '';
    zoneTuiles.innerHTML = melangerLettres(m.mot).map(l => `<span class="piece">${l}</span>`).join('');
    // Taille des lettres adaptée à la longueur du mot.
    carte.style.setProperty('--nb', m.mot.length + (m.avant ? m.avant.length + 1 : 0));
    carte.classList.remove('reussi');
    carte.style.transition = 'none';
    carte.style.transform = '';
    carte.style.opacity = '';
    carte.classList.remove('apparait');
    void carte.offsetWidth;
    carte.classList.add('apparait');
    $('.compteur').textContent = `${rang + 1} / ${liste.length}`;
    setTimeout(direMot, 400);
  }

  carte.addEventListener('animationend', () => carte.classList.remove('apparait'));
  $('.bouton-son').addEventListener('click', direMot);
  $('.photo').addEventListener('click', direMot);

  // ================= Glisser une lettre =================
  let prise = null;

  zoneTuiles.addEventListener('pointerdown', e => {
    const tuile = e.target.closest('.piece');
    if (!tuile || termine || prise) return;
    e.preventDefault();
    const tuiles = [...zoneTuiles.children];
    const rects = tuiles.map(t => t.getBoundingClientRect());
    prise = {
      id: e.pointerId,
      tuile,
      tuiles,
      depart: tuiles.indexOf(tuile),
      arrivee: tuiles.indexOf(tuile),
      x: e.clientX,
      y: e.clientY,
      pas: tuiles.length > 1 ? rects[1].left - rects[0].left : 1,
    };
    zoneTuiles.setPointerCapture(e.pointerId);
    tuiles.forEach(t => { t.style.transition = 'transform 0.2s'; });
    tuile.style.transition = 'none';
    tuile.classList.add('en-main');
  });

  zoneTuiles.addEventListener('pointermove', e => {
    if (!prise || e.pointerId !== prise.id) return;
    const { tuile, tuiles, depart, pas } = prise;
    const dx = e.clientX - prise.x;
    const dy = e.clientY - prise.y;
    tuile.style.transform = `translate(${dx}px, ${dy * 0.3}px) scale(1.12)`;
    const arrivee = Math.max(0, Math.min(tuiles.length - 1, depart + Math.round(dx / pas)));
    prise.arrivee = arrivee;
    // Les autres lettres se décalent pour laisser la place.
    tuiles.forEach((t, i) => {
      if (t === tuile) return;
      let decalage = 0;
      if (i > depart && i <= arrivee) decalage = -pas;
      if (i < depart && i >= arrivee) decalage = pas;
      t.style.transform = decalage ? `translateX(${decalage}px)` : '';
    });
  });

  function lacher(e) {
    if (!prise || e.pointerId !== prise.id) return;
    const { tuile, tuiles, depart, arrivee, pas } = prise;
    prise = null;
    tuile.classList.remove('en-main');
    // La lettre glisse jusqu'à sa nouvelle place, puis on réordonne vraiment les lettres.
    tuile.style.transition = 'transform 0.15s';
    tuile.style.transform = `translateX(${(arrivee - depart) * pas}px)`;
    setTimeout(() => {
      tuiles.forEach(t => { t.style.transition = 'none'; t.style.transform = ''; });
      const reste = tuiles.filter(t => t !== tuile);
      reste.splice(arrivee, 0, tuile);
      reste.forEach(t => zoneTuiles.appendChild(t));
      if (arrivee !== depart) verifier();
    }, 160);
  }
  zoneTuiles.addEventListener('pointerup', lacher);
  zoneTuiles.addEventListener('pointercancel', lacher);

  // ================= Mot réussi =================
  function verifier() {
    const propose = [...zoneTuiles.children].map(t => t.textContent).join('');
    if (propose !== motActuel().mot.toUpperCase()) return;

    termine = true;
    carte.classList.add('reussi');
    Ecole.bruitage('bravo');
    setTimeout(direMot, 300);
    setTimeout(rangerCarte, 1600);
  }

  /** La carte rapetisse et va se ranger dans la collection, en bas de l'écran. */
  function rangerCarte() {
    const m = motActuel();
    const mini = document.createElement('button');
    mini.className = 'mini-carte';
    mini.innerHTML = `<img src="${config.dossierImages + m.image}" alt=""><span>${phrase(m).toUpperCase()}</span>`;
    mini.addEventListener('click', () => Ecole.dire(phrase(m), m.son));
    mini.style.visibility = 'hidden';
    collection.appendChild(mini);

    const de = carte.getBoundingClientRect();
    const vers = mini.getBoundingClientRect();
    const echelle = vers.width / de.width;
    carte.style.transition = 'transform 0.6s ease-in, opacity 0.6s ease-in';
    carte.style.transformOrigin = 'top left';
    carte.style.transform = `translate(${vers.left - de.left}px, ${vers.top - de.top}px) scale(${echelle})`;
    carte.style.opacity = '0.3';

    setTimeout(() => {
      mini.style.visibility = '';
      carte.style.transformOrigin = '';
      rang++;
      if (rang < liste.length) montrerCarte();
      else finDePartie();
    }, 650);
  }

  function finDePartie() {
    carte.style.opacity = '0';
    Ecole.bruitage('fin');
    $('.resultat').textContent = `Tu as remis les ${liste.length} mots dans l'ordre !`;
    $('#ecran-fin').classList.remove('cache');
    Ecole.dire('Bravo !');
  }

  $('#commencer').addEventListener('click', () => {
    $('#ecran-debut').classList.add('cache');
    nouvellePartie();
  });
  $('#rejouer').addEventListener('click', nouvellePartie);

  config.mots.forEach(m => { new Image().src = config.dossierImages + m.image; });
}
