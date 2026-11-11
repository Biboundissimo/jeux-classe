/*
 * Jeu « Mots croisés » de la semaine 9 : les 8 mots de la dictée (oi et oin).
 * La grille est construite automatiquement à partir des mots (et change à chaque partie).
 * Les définitions sont lues à voix haute quand l'enfant les touche.
 */
lancerMotsCroises({
  titre: 'Mots croisés',
  accueil: '../../semaine-9.html',
  consigne: 'Touche une définition ou une case, puis écris la lettre avec le stylet dans le cadre blanc.',

  mots: [
    { mot: 'soir',     definition: "Le moment de la journée où le soleil se couche." },
    { mot: 'voiture',  definition: 'Elle a quatre roues et un volant. Papa la conduit.' },
    { mot: 'histoire', definition: 'Le soir, maman me lit une belle …' },
    { mot: 'poire',    definition: 'Fruit vert ou jaune, qui ressemble un peu à une pomme.' },
    { mot: 'boite',    definition: "Il s'est fait mal au pied : il marche mal, il …" },
    { mot: 'soif',     definition: "Quand j'ai couru, j'ai envie de boire : j'ai …" },
    { mot: 'foin',     definition: "Herbe séchée que mangent les vaches et les chevaux." },
    { mot: 'coin',     definition: 'Le chat dort dans un … de la pièce.' },
  ],
});
