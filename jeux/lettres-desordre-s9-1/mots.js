/*
 * Jeu « Les lettres en désordre 1 » de la semaine 9 (mots de la dictée : oi et oin).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/soir.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 1',
  accueil: '../../semaine-9.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'soir',     image: 'soir.jpg',     avant: 'le' },
    { mot: 'voiture',  image: 'voiture.jpg',  avant: 'la' },
    { mot: 'histoire', image: 'histoire.jpg', avant: 'une' },
    { mot: 'poire',    image: 'poire.jpg',    avant: 'une' },
  ],
});
