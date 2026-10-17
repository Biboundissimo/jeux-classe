/*
 * Jeu « Mots mêlés » de la semaine 7 : les 8 mots de la dictée (la lettre h).
 * Pour changer les mots, modifier simplement la liste ci-dessous (les accents sont retirés dans la grille).
 * Une nouvelle grille est créée au hasard à chaque partie.
 */
lancerMotsMeles({
  titre: 'Mots mêlés',
  consigne: 'Retrouve les mots cachés dans la grille. Fais glisser ton doigt de la première à la dernière lettre du mot.',
  // Nombre de lettres par côté de la grille, selon le niveau.
  tailles: { facile: 12, moyen: 12, difficile: 15 },
  mots: [
    'tache', 'moustache', 'chat', 'cherche', 'chez', 'habite', 'photo', 'phoque',
  ],
});
