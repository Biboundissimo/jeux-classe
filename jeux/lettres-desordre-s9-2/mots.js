/*
 * Jeu « Les lettres en désordre 2 » de la semaine 9 (mots de la dictée : oi et oin).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/foin.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 2',
  accueil: '../../semaine-9.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'boite', image: 'boite.jpg', avant: 'il' },
    { mot: 'soif',  image: 'soif.jpg',  avant: 'la' },
    { mot: 'foin',  image: 'foin.jpg',  avant: 'le' },
    { mot: 'coin',  image: 'coin.jpg',  avant: 'un' },
  ],
});
