/*
 * Jeu « Mots croisés » de la semaine 10 : les 8 mots de la dictée (a, au et eau).
 * La grille est construite automatiquement à partir des mots (et change à chaque partie).
 * Les définitions sont lues à voix haute quand l'enfant les touche.
 */
lancerMotsCroises({
  titre: 'Mots croisés',
  accueil: '../../semaine-10.html',
  consigne: 'Touche une définition ou une case, puis écris la lettre avec le stylet dans le cadre blanc.',

  mots: [
    { mot: 'jaune',  definition: 'La couleur du soleil et des citrons.' },
    { mot: 'chaud',  definition: "Le contraire de froid. En été, il fait …" },
    { mot: 'aussi',  definition: "Le chat dort, et le chien dort … ." },
    { mot: 'saute',  definition: 'Le kangourou ne marche pas : il …' },
    { mot: 'oiseau', definition: 'Il a des plumes, un bec et des ailes. Il vole.' },
    { mot: 'eau',    definition: "Quand j'ai soif, je bois de l' …" },
    { mot: 'bateau', definition: 'Il flotte et il navigue sur la mer.' },
    { mot: 'beau',   definition: 'Le paon fait la roue : il est très …' },
  ],
});
