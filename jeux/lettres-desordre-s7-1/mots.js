/*
 * Jeu « Les lettres en désordre 1 » de la semaine 7 (mots de la dictée : la lettre h).
 * avant : petit mot affiché devant, déjà dans l'ordre et qu'on ne peut pas déplacer (facultatif).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse : ajouter  son: 'sons/chat.mp3'  au mot.
 */
lancerJeuLettres({
  titre: 'Les lettres en désordre 1',
  accueil: '../../semaine-7.html',
  consigne: "Écoute le mot, puis fais glisser les lettres pour les remettre dans l'ordre.",
  dossierImages: '../../images/cartes/',
  // Nombre minimum de lettres que l'enfant devra déplacer pour remettre le mot en ordre.
  mouvementsMin: 2,

  mots: [
    { mot: 'tache',     image: 'tache.jpg',     avant: 'une' },
    { mot: 'moustache', image: 'moustache.jpg', avant: 'une' },
    { mot: 'chat',      image: 'chat.jpg',      avant: 'le' },
    { mot: 'cherche',   image: 'cherche.jpg',   avant: 'il' },
  ],
});
