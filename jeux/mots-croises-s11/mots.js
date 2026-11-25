/*
 * Jeu « Mots croisés » de la semaine 11 : les 8 mots de la dictée (ai, ain et aim).
 * La grille est construite automatiquement à partir des mots (et change à chaque partie).
 * Les accents sont retirés dans la grille (maîtresse → MAITRESSE).
 * Les définitions sont lues à voix haute quand l'enfant les touche.
 */
lancerMotsCroises({
  titre: 'Mots croisés',
  accueil: '../../semaine-11.html',
  consigne: 'Touche une définition ou une case, puis écris la lettre avec le stylet dans le cadre blanc.',

  mots: [
    { mot: 'chaise',    definition: "On s'assoit dessus pour manger à table." },
    { mot: 'maîtresse', definition: "À l'école, elle fait la classe aux élèves." },
    { mot: 'maison',    definition: 'On y habite. Elle a des murs, un toit et des fenêtres.' },
    { mot: 'semaine',   definition: 'Lundi, mardi, mercredi… : il y a sept jours dans une …' },
    { mot: 'aime',      definition: 'Elle … beaucoup le chocolat.' },
    { mot: 'aigle',     definition: 'Grand oiseau qui vole très haut et attrape des poissons.' },
    { mot: 'jamais',    definition: 'Le contraire de toujours.' },
    { mot: 'demain',    definition: "Aujourd'hui, c'est lundi. … , ce sera mardi." },
  ],
});
