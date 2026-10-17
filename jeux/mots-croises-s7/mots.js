/*
 * Jeu « Mots croisés » de la semaine 7 : les 8 mots de la dictée (la lettre h).
 * La grille est construite automatiquement à partir des mots (et change à chaque partie).
 * Les définitions sont lues à voix haute quand l'enfant les touche.
 */
lancerMotsCroises({
  titre: 'Mots croisés',
  accueil: '../../semaine-7.html',
  consigne: 'Touche une définition ou une case, puis écris la lettre avec le stylet dans le cadre blanc.',

  mots: [
    { mot: 'tache',     definition: 'Une marque sale sur un vêtement.' },
    { mot: 'moustache', definition: 'Les poils au-dessus de la bouche.' },
    { mot: 'chat',      definition: 'Animal qui miaule et qui attrape les souris.' },
    { mot: 'cherche',   definition: 'Il a perdu ses clés : il les …' },
    { mot: 'chez',      definition: 'Ce soir, je dors … ma mamie.' },
    { mot: 'habite',    definition: 'Il … dans une grande maison.' },
    { mot: 'photo',     definition: 'Une image prise avec un appareil.' },
    { mot: 'phoque',    definition: 'Animal marin au pelage gris qui mange des poissons.' },
  ],
});
