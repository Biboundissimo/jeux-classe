/*
 * Jeu « Mots mêlés ».
 * Pour changer les mots, modifier simplement la liste ci-dessous (les accents sont retirés dans la grille).
 * Une nouvelle grille est créée au hasard à chaque partie.
 */
lancerMotsMeles({
  titre: 'Mots mêlés',
  consigne: 'Retrouve les mots cachés dans la grille. Fais glisser ton doigt de la première à la dernière lettre du mot.',
  // Nombre de lettres par côté de la grille, selon le niveau.
  tailles: { facile: 12, moyen: 12, difficile: 15 },
  mots: [
    'terrier', 'museau', 'tige', 'rainette', 'grimper', 'chasser', 'plume',
    'poisson', 'insecte', 'europe', 'hibou', 'dauphin', 'herbe',
  ],
});
