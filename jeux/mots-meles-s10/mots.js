/*
 * Jeu « Mots mêlés » de la semaine 10 : les 8 mots de la dictée (a, au et eau).
 * Pour changer les mots, modifier simplement la liste ci-dessous (les accents sont retirés dans la grille).
 * Une nouvelle grille est créée au hasard à chaque partie.
 */
lancerMotsMeles({
  titre: 'Mots mêlés',
  accueil: '../../semaine-10.html',
  consigne: 'Retrouve les mots cachés dans la grille. Fais glisser ton doigt de la première à la dernière lettre du mot.',
  // Nombre de lettres par côté de la grille, selon le niveau.
  tailles: { facile: 12, moyen: 12, difficile: 15 },
  mots: [
    'jaune', 'chaud', 'aussi', 'saute', 'oiseau', 'eau', 'bateau', 'beau',
  ],
});
