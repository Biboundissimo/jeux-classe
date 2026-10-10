/*
 * Jeu « Mots croisés ».
 * La grille est construite automatiquement à partir des mots (et change à chaque partie).
 * Les définitions sont lues à voix haute quand l'enfant les touche.
 */
lancerMotsCroises({
  titre: 'Mots croisés',
  consigne: 'Touche une définition ou une case, puis écris la lettre avec le stylet dans le cadre blanc.',

  mots: [
    { mot: 'museau',  definition: "Le nez et la bouche d'un animal." },
    { mot: 'terrier', definition: 'Le trou où vit le lapin.' },
    { mot: 'grimpe',  definition: "Elle monte dans l'arbre : elle …" },
    { mot: 'chasse',  definition: 'Le chat court après la souris : il …' },
    { mot: 'tige',    definition: 'La partie de la fleur qui la tient debout.' },
    { mot: 'poisson', definition: "Il vit dans l'eau et nage avec ses nageoires." },
    { mot: 'plume',   definition: "Les oiseaux en ont partout sur le corps." },
    { mot: 'insecte', definition: 'Petit animal à six pattes, comme la fourmi.' },
  ],
});
