/*
 * Jeu « Les lettres en désordre 1 » de la semaine 8 (mots de la dictée : la lettre o).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/mouton.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 1',
  accueil: '../../semaine-8.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'mouton',  image: 'mouton.jpg',  avant: 'un' },
    { mot: 'monde',   image: 'monde.jpg',   avant: 'le' },
    { mot: 'bison',   image: 'bison.jpg',   avant: 'le' },
    { mot: 'carotte', image: 'carotte.jpg', avant: 'une' },
  ],
});
