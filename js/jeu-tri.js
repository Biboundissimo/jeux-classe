/*
 * Moteur de jeu « trier des images dans des cases ».
 * Réutilisable : chaque jeu fournit sa propre configuration (voir jeux/sons-t-b-p-d/mots.js).
 *
 * configuration = {
 *   titre: "J'entends t, b, p ou d ?",
 *   consigne: "Écoute le mot et glisse l'image dans la bonne case.",
 *   dossierImages: "../../images/animaux/",
 *   cases: [ { id: 't', etiquette: "J'entends", lettre: 't', couleur: '#e76f51' }, ... ],
 *   mots:  [ { mot: 'tortue', image: 'tortue.jpg', case: 't', son: 'facultatif.mp3' }, ... ]
 * }
 */
function lancerJeuTri(config) {
  const $ = sel => document.querySelector(sel);
  const ICONE_SON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>' +
    '<path d="M16.5 12A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" fill="currentColor"/>' +
    '<path d="M14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" fill="currentColor"/></svg>';

  document.title = config.titre;
  document.body.innerHTML = `
    <div class="jeu">
      <header class="bandeau">
        <a class="retour" href="../../index.html" aria-label="Retour à l'accueil">⌂</a>
        <h1>${config.titre}</h1>
        <div class="progression" aria-label="Progression"></div>
      </header>

      <main class="scene">
        <div class="emplacement-carte">
          <div class="carte" aria-live="polite"><img alt=""></div>
          <button class="bouton-son" aria-label="Réécouter le mot">${ICONE_SON}</button>
        </div>
      </main>

      <section class="cases"></section>

      <div class="ecran" id="ecran-debut">
        <div class="boite">
          <h2>${config.titre}</h2>
          <p>${config.consigne}</p>
          <p class="petit">Appuie sur ${ICONE_SON.replace('<svg', '<svg class="inline"')} pour réécouter le mot.</p>
          ${Ecole.syntheseDispo ? '' : '<p class="alerte">Ce navigateur ne sait pas lire les mots à voix haute. Essaie avec Chrome ou Edge.</p>'}
          <button class="gros-bouton" id="commencer">Commencer</button>
        </div>
      </div>

      <div class="ecran cache" id="ecran-fin">
        <div class="boite">
          <div class="etoiles"></div>
          <h2>Bravo !</h2>
          <p class="resultat"></p>
          <div class="a-revoir"></div>
          <div class="boutons">
            <button class="gros-bouton" id="rejouer">Rejouer</button>
            <a class="gros-bouton secondaire" href="../../index.html">Accueil</a>
          </div>
        </div>
      </div>
    </div>`;

  const carte = $('.carte');
  const imageCarte = $('.carte img');
  const progression = $('.progression');

  // ----- Construction des cases -----
  const cases = config.cases.map(c => {
    const el = document.createElement('div');
    el.className = 'case';
    el.style.setProperty('--couleur', c.couleur);
    el.innerHTML = `
      <div class="titre-case"><span>${c.etiquette}</span><strong>${c.lettre}</strong></div>
      <div class="contenu"></div>`;
    $('.cases').appendChild(el);
    return { ...c, el, contenu: el.querySelector('.contenu') };
  });

  function caseSous(x, y) {
    return cases.find(c => {
      const r = c.el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    });
  }

  // ----- État de la partie -----
  let liste = [];
  let rang = 0;
  let erreursMot = 0;
  let resultats = []; // nombre d'erreurs pour chaque mot

  const motActuel = () => liste[rang];
  const direMot = () => Ecole.dire(motActuel().mot, motActuel().son);

  function dessinerProgression() {
    progression.innerHTML = liste.map((_, i) => {
      let classe = 'point';
      if (i < resultats.length) classe += resultats[i] === 0 ? ' reussi' : ' aide';
      if (i === rang && i >= resultats.length) classe += ' actuel';
      return `<span class="${classe}"></span>`;
    }).join('');
  }

  function nouvellePartie() {
    liste = Ecole.melanger(config.mots);
    rang = 0;
    resultats = [];
    cases.forEach(c => { c.contenu.innerHTML = ''; });
    $('#ecran-fin').classList.add('cache');
    montrerMot();
  }

  function montrerMot() {
    erreursMot = 0;
    cases.forEach(c => c.el.classList.remove('indice'));
    const m = motActuel();
    imageCarte.src = config.dossierImages + m.image;
    imageCarte.alt = m.mot;
    carte.classList.remove('bloque', 'partie');
    carte.style.transition = 'none';
    carte.style.transform = '';
    // relance l'animation d'apparition
    carte.classList.remove('apparait');
    void carte.offsetWidth;
    carte.classList.add('apparait');
    dessinerProgression();
    setTimeout(direMot, 350);
  }

  // ----- Glisser-déposer -----
  Ecole.rendreDeplacable(carte, {
    surToucher: direMot,
    surDeplacer(x, y) {
      const survol = caseSous(x, y);
      cases.forEach(c => c.el.classList.toggle('survol', c === survol));
    },
    surLacher(x, y) {
      cases.forEach(c => c.el.classList.remove('survol'));
      const cible = caseSous(x, y);
      if (!cible) return Ecole.remettreEnPlace(carte);
      if (cible.id === motActuel().case) bonneReponse(cible);
      else mauvaiseReponse(cible);
    },
  });

  // L'animation d'apparition bloquerait le déplacement : on la retire dès qu'elle est finie.
  carte.addEventListener('animationend', () => carte.classList.remove('apparait'));
  $('.bouton-son').addEventListener('click', direMot);

  function bonneReponse(cible) {
    Ecole.bruitage('bravo');
    carte.classList.add('bloque', 'partie');
    resultats.push(erreursMot);

    const m = motActuel();
    const vignette = document.createElement('button');
    vignette.className = 'vignette' + (erreursMot ? ' aide' : '');
    vignette.innerHTML = `<img src="${config.dossierImages + m.image}" alt=""><span>${m.mot}</span>`;
    vignette.addEventListener('click', () => Ecole.dire(m.mot, m.son));
    cible.contenu.appendChild(vignette);
    cible.el.classList.remove('indice');

    setTimeout(() => {
      rang++;
      if (rang < liste.length) montrerMot();
      else finDePartie();
    }, 900);
  }

  function mauvaiseReponse(cible) {
    Ecole.bruitage('oups');
    erreursMot++;
    Ecole.remettreEnPlace(carte);
    cible.el.classList.remove('secoue');
    void cible.el.offsetWidth;
    cible.el.classList.add('secoue');
    setTimeout(direMot, 600);
    // Après 2 erreurs, la bonne case clignote pour aider l'enfant.
    if (erreursMot >= 2) {
      cases.find(c => c.id === motActuel().case).el.classList.add('indice');
    }
  }

  function finDePartie() {
    dessinerProgression();
    Ecole.bruitage('fin');
    const duPremierCoup = resultats.filter(e => e === 0).length;
    const total = liste.length;
    const nbEtoiles = duPremierCoup === total ? 3 : duPremierCoup >= total * 0.75 ? 2 : 1;
    $('.etoiles').innerHTML = [1, 2, 3]
      .map(i => `<span class="${i <= nbEtoiles ? 'pleine' : ''}">★</span>`).join('');
    $('.resultat').textContent =
      `Tu as trouvé ${duPremierCoup} mot${duPremierCoup > 1 ? 's' : ''} sur ${total} du premier coup.`;

    const aRevoir = liste.filter((_, i) => resultats[i] > 0);
    $('.a-revoir').innerHTML = aRevoir.length
      ? '<p>Mots à réécouter :</p><div class="liste-revoir"></div>'
      : '';
    aRevoir.forEach(m => {
      const b = document.createElement('button');
      b.className = 'vignette';
      b.innerHTML = `<img src="${config.dossierImages + m.image}" alt=""><span>${m.mot}</span>`;
      b.addEventListener('click', () => Ecole.dire(m.mot, m.son));
      $('.liste-revoir').appendChild(b);
    });

    setTimeout(() => {
      $('#ecran-fin').classList.remove('cache');
      Ecole.dire('Bravo !');
    }, 700);
  }

  $('#commencer').addEventListener('click', () => {
    $('#ecran-debut').classList.add('cache');
    nouvellePartie();
  });
  $('#rejouer').addEventListener('click', nouvellePartie);

  // Précharge les images pour un affichage instantané.
  config.mots.forEach(m => { new Image().src = config.dossierImages + m.image; });
}
