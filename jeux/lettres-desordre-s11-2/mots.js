/*
 * Jeu « Les lettres en désordre 2 » de la semaine 11 (mots de la dictée : ai et ain).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * dire  : phrase lue à voix haute à la place du mot, pour les mots difficiles à montrer en photo.
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/aigle.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 2',
  accueil: '../../semaine-11.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'aime',   image: 'aime.jpg',    avant: 'elle', dire: 'Elle aime son chien.' },
    { mot: 'aigle',  image: 'aigle.jpg',   avant: 'un' },
    { mot: 'jamais', image: 'poisson.jpg', dire: 'Un poisson ne marche jamais.' },
    { mot: 'demain', image: 'demain.jpg',  dire: "Demain, c'est mon anniversaire !" },
  ],
});
