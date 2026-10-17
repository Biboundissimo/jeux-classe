/*
 * Jeu « Les lettres en désordre 1 ».
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/museau.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 1',
  accueil: '../../semaine-revision.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'terrier', image: 'terrier.jpg' },
    { mot: 'museau',  image: 'museau.jpg' },
    { mot: 'plume',   image: 'plume.jpg' },
    { mot: 'poisson', image: 'poisson.jpg' },
  ],
});
