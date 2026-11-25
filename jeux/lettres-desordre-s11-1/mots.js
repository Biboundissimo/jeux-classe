/*
 * Jeu « Les lettres en désordre 1 » de la semaine 11 (mots de la dictée : ai).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/chaise.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 1',
  accueil: '../../semaine-11.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'chaise',    image: 'chaise.jpg',    avant: 'la' },
    { mot: 'maîtresse', image: 'maitresse.jpg', avant: 'une' },
    { mot: 'maison',    image: 'maison.jpg',    avant: 'une' },
    { mot: 'semaine',   image: 'semaine.jpg',   avant: 'la' },
  ],
});
