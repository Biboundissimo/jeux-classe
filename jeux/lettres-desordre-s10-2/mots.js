/*
 * Jeu « Les lettres en désordre 2 » de la semaine 10 (mots de la dictée : a, au et eau).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 *         « l' » est collé au mot (l'eau).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/bateau.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 2',
  accueil: '../../semaine-10.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'eau',    image: 'eau.jpg',    avant: "l'" },
    { mot: 'bateau', image: 'bateau.jpg', avant: 'un' },
    { mot: 'beau',   image: 'beau.jpg',   avant: 'il est' },
    { mot: 'aussi',  image: 'aussi.jpg' },
  ],
});
