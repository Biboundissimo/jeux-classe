/*
 * Outils communs à tous les jeux du site :
 *  - Ecole.dire(texte, fichierAudio)  : prononce un mot (voix de synthèse ou enregistrement)
 *  - Ecole.bruitage('bravo' | 'oups' | 'fin') : petits sons de récompense
 *  - Ecole.melanger(tableau)          : mélange aléatoire
 *  - Ecole.rendreDeplacable(element, options) : glisser-déposer souris + écran tactile
 */
const Ecole = (() => {
  // ---------- Voix ----------
  const syntheseDispo = 'speechSynthesis' in window;
  let voixFr = null;

  function choisirVoix() {
    if (!syntheseDispo) return;
    const fr = speechSynthesis.getVoices().filter(v => /^fr/i.test(v.lang));
    const deFrance = fr.filter(v => /fr[-_]FR/i.test(v.lang));
    // On préfère les voix « naturelles » (Edge) ou Google, plus agréables à écouter.
    voixFr =
      deFrance.find(v => /natural|online|google/i.test(v.name)) ||
      deFrance[0] || fr[0] || null;
  }
  if (syntheseDispo) {
    choisirVoix();
    speechSynthesis.addEventListener('voiceschanged', choisirVoix);
  }

  let audioEnCours = null;

  function direAvecSynthese(texte) {
    if (!syntheseDispo) return;
    speechSynthesis.cancel();
    // Petit délai : certains navigateurs ignorent un speak() juste après cancel().
    setTimeout(() => {
      const phrase = new SpeechSynthesisUtterance(texte);
      phrase.lang = 'fr-FR';
      if (voixFr) phrase.voice = voixFr;
      phrase.rate = 0.8; // un peu plus lent pour les enfants
      speechSynthesis.speak(phrase);
    }, 60);
  }

  /** Prononce le texte. Si un fichier audio est fourni (voix de la maîtresse), il est utilisé en priorité. */
  function dire(texte, fichierAudio) {
    if (audioEnCours) { audioEnCours.pause(); audioEnCours = null; }
    if (fichierAudio) {
      const audio = new Audio(fichierAudio);
      audioEnCours = audio;
      audio.play().catch(() => direAvecSynthese(texte));
      return;
    }
    direAvecSynthese(texte);
  }

  // ---------- Bruitages (générés, aucun fichier nécessaire) ----------
  let contexteAudio = null;

  function note(frequence, debut, duree, type = 'sine', volume = 0.25) {
    const ctx = contexteAudio;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequence;
    const t = ctx.currentTime + debut;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duree);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duree + 0.05);
  }

  function bruitage(nom) {
    try {
      contexteAudio = contexteAudio || new (window.AudioContext || window.webkitAudioContext)();
      if (contexteAudio.state === 'suspended') contexteAudio.resume();
    } catch (e) { return; }
    if (nom === 'bravo') {
      note(523, 0, 0.15); note(659, 0.1, 0.15); note(784, 0.2, 0.3);
    } else if (nom === 'oups') {
      note(220, 0, 0.18, 'triangle', 0.3); note(165, 0.15, 0.3, 'triangle', 0.3);
    } else if (nom === 'fin') {
      [523, 659, 784, 1047, 784, 1047].forEach((f, i) => note(f, i * 0.13, 0.25));
    }
  }

  // ---------- Divers ----------
  function melanger(tableau) {
    const t = tableau.slice();
    for (let i = t.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [t[i], t[j]] = [t[j], t[i]];
    }
    return t;
  }

  // ---------- Glisser-déposer (souris, doigt, stylet) ----------
  /**
   * options :
   *   surToucher()            : appelé si l'enfant touche l'élément sans le déplacer
   *   surDeplacer(x, y)       : appelé pendant le déplacement (pour éclairer la case survolée)
   *   surLacher(x, y)         : appelé quand l'élément est lâché
   */
  function rendreDeplacable(el, options = {}) {
    let prise = null;

    el.addEventListener('pointerdown', e => {
      if (el.classList.contains('bloque') || prise) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      prise = { id: e.pointerId, x: e.clientX, y: e.clientY, bouge: false };
      el.style.transition = 'none';
      el.classList.add('en-main');
    });

    el.addEventListener('pointermove', e => {
      if (!prise || e.pointerId !== prise.id) return;
      const dx = e.clientX - prise.x;
      const dy = e.clientY - prise.y;
      if (!prise.bouge && Math.hypot(dx, dy) > 10) prise.bouge = true;
      if (prise.bouge) {
        el.style.transform = `translate(${dx}px, ${dy}px) scale(1.08) rotate(${dx / 40}deg)`;
        if (options.surDeplacer) options.surDeplacer(e.clientX, e.clientY);
      }
    });

    function terminer(e, annule) {
      if (!prise || e.pointerId !== prise.id) return;
      const aBouge = prise.bouge;
      prise = null;
      el.classList.remove('en-main');
      if (annule) return remettreEnPlace(el);
      if (!aBouge) {
        remettreEnPlace(el);
        if (options.surToucher) options.surToucher();
        return;
      }
      if (options.surLacher) options.surLacher(e.clientX, e.clientY);
    }
    el.addEventListener('pointerup', e => terminer(e, false));
    el.addEventListener('pointercancel', e => terminer(e, true));
  }

  function remettreEnPlace(el) {
    el.style.transition = 'transform 0.4s cubic-bezier(.3, 1.5, .6, 1)';
    el.style.transform = '';
  }

  return { dire, bruitage, melanger, rendreDeplacable, remettreEnPlace, syntheseDispo };
})();
