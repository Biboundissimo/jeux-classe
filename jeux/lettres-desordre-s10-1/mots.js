/*
 * Jeu « Les lettres en désordre 1 » de la semaine 10 (mots de la dictée : a, au et eau).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/jaune.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 1',
  accueil: '../../semaine-10.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'jaune',  image: 'jaune.jpg' },
    { mot: 'chaud',  image: 'chaud.jpg',  avant: "c'est" },
    { mot: 'saute',  image: 'saute.jpg',  avant: 'elle' },
    { mot: 'oiseau', image: 'oiseau.jpg', avant: 'un' },
  ],
});
