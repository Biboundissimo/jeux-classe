/*
 * Jeu « Les lettres en désordre 2 ».
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/museau.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 2',
  accueil: '../../semaine-revision.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'insecte', image: 'insecte.jpg' },
    { mot: 'tige',    image: 'tige.jpg' },
    { mot: 'chasse',  image: 'chasse.jpg',  avant: 'il' },
    { mot: 'grimpe',  image: 'grimpe.jpg',  avant: 'elle' },
  ],
});
