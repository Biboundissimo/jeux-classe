/*
 * Jeu « Mots mêlés » de la semaine 11 : les 8 mots de la dictée (ai, ain et aim).
 * Pour changer les mots, modifier simplement la liste ci-dessous (les accents sont retirés dans la grille).
 * Une nouvelle grille est créée au hasard à chaque partie.
 */
lancerMotsMeles({
  titre: 'Mots mêlés',
  accueil: '../../semaine-11.html',
  consigne: 'Retrouve les mots cachés dans la grille. Fais glisser ton doigt de la première à la dernière lettre du mot.',
  // Nombre de lettres par côté de la grille, selon le niveau.
  tailles: { facile: 12, moyen: 12, difficile: 15 },
  mots: [
    'chaise', 'maîtresse', 'maison', 'semaine', 'aime', 'aigle', 'jamais', 'demain',
  ],
});
