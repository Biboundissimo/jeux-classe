/*
 * Jeu « Les lettres en désordre 2 » de la semaine 7 (mots de la dictée : la lettre h).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/phoque.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 2',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'chez',   image: 'chez.jpg' },
    { mot: 'habite', image: 'habite.jpg', avant: 'il' },
    { mot: 'photo',  image: 'photo.jpg',  avant: 'une' },
    { mot: 'phoque', image: 'phoque.jpg', avant: 'le' },
  ],
});
