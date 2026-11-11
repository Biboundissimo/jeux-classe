/*
 * Jeu « Mots mêlés » de la semaine 9 : les 8 mots de la dictée (oi et oin).
 * Pour changer les mots, modifier simplement la liste ci-dessous (les accents sont retirés dans la grille).
 * Une nouvelle grille est créée au hasard à chaque partie.
 */
lancerMotsMeles({
  titre: 'Mots mêlés',
  accueil: '../../semaine-9.html',
  consigne: 'Retrouve les mots cachés dans la grille. Fais glisser ton doigt de la première à la dernière lettre du mot.',
  // Nombre de lettres par côté de la grille, selon le niveau.
  tailles: { facile: 12, moyen: 12, difficile: 15 },
  mots: [
    'soir', 'voiture', 'histoire', 'poire', 'boite', 'soif', 'foin', 'coin',
  ],
});
