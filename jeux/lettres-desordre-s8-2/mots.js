/*
 * Jeu « Les lettres en désordre 2 » de la semaine 8 (mots de la dictée : la lettre o).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/onze.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 2',
  accueil: '../../semaine-8.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'onze',   image: 'onze.jpg' },
    { mot: 'tombe',  image: 'tombe.jpg',  avant: 'il' },
    { mot: 'trouve', image: 'trouve.jpg', avant: 'il' },
    { mot: 'trop',   image: 'trop.jpg' },
  ],
});
