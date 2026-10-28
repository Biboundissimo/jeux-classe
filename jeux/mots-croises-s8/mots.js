/*
 * Jeu « Mots croisés » de la semaine 8 : les 8 mots de la dictée (la lettre o).
 * La grille est construite automatiquement à partir des mots (et change à chaque partie).
 * Les définitions sont lues à voix haute quand l'enfant les touche.
 */
lancerMotsCroises({
  titre: 'Mots croisés',
  accueil: '../../semaine-8.html',
  consigne: 'Touche une définition ou une case, puis écris la lettre avec le stylet dans le cadre blanc.',

  mots: [
    { mot: 'mouton',  definition: 'Animal couvert de laine qui fait « bêê ».' },
    { mot: 'monde',   definition: 'Le bateau a fait le tour du …' },
    { mot: 'onze',    definition: 'Dix plus un, ça fait …' },
    { mot: 'bison',   definition: "Gros animal avec une bosse, qui vit dans les prairies d'Amérique." },
    { mot: 'tombe',   definition: 'Il glisse sur la glace et il …' },
    { mot: 'trouve',  definition: 'Il cherchait ses clés : enfin, il les …' },
    { mot: 'carotte', definition: 'Légume orange que le lapin adore.' },
    { mot: 'trop',    definition: "Je ne peux pas tout manger, il y en a … !" },
  ],
});
