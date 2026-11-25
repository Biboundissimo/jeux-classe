/*
 * Jeu de LECTURE « ai, ain ou au : quel son ? » (semaine 11, lecture « La lettre a : ai, ain et aim »).
 * Seul le mot écrit est montré (pas de photo, pas de voix) : l'enfant doit vraiment le lire,
 * puis le range selon ce qu'il entend :
 *   ai  → [è]  (la chaise)
 *   ain → [in] (le pain)
 *   au  → [o]  (jaune)
 * Une fois rangé dans la bonne case, la photo apparaît ; l'enfant peut la toucher pour entendre le mot.
 * Chaque mot ne contient qu'une seule de ces trois écritures.
 * Attention aux petits mots : « un » se dit presque [in], « elle » fait entendre [è] → on écrit le, la, les, l', du.
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 */
lancerJeuTri({
  titre: 'ai, ain ou au : quel son ?',
  accueil: '../../semaine-11.html',
  consigne: 'Lis le mot. Attention : ai se dit [è], ain se dit [in] et au se dit [o] ! Fais glisser le mot dans la bonne case : sa photo apparaîtra !',
  dossierImages: '../../images/cartes/',
  lecture: true,

  cases: [
    // On montre l'écriture, puis ce que l'oreille entend.
    { id: 'ai',  lettre: 'ai',  prononce: '[è]',  couleur: '#e76f51' },
    { id: 'ain', lettre: 'ain', prononce: '[in]', couleur: '#2a9d8f' },
    { id: 'au',  lettre: 'au',  prononce: '[o]',  couleur: '#3a86ff' },
  ],

  mots: [
    // ai : son [è]
    { mot: 'la fraise',      image: 'fraise.jpg',     case: 'ai' },
    { mot: 'la chaise',      image: 'chaise.jpg',     case: 'ai' },
    { mot: 'la maison',      image: 'maison.jpg',     case: 'ai' },
    { mot: "l'aigle",        image: 'aigle.jpg',      case: 'ai' },
    { mot: 'une aile',       image: 'aile.jpg',       case: 'ai' },
    { mot: 'du lait',        image: 'lait.jpg',       case: 'ai' },
    // ain : son [in]
    { mot: 'le pain',        image: 'pain.jpg',       case: 'ain' },
    { mot: 'les mains',      image: 'mains.jpg',      case: 'ain' },
    { mot: 'le bain',        image: 'bain.jpg',       case: 'ain' },
    { mot: 'le train',       image: 'train.jpg',      case: 'ain' },
    { mot: 'le nain',        image: 'nain.jpg',       case: 'ain' },
    { mot: 'le grain',       image: 'grain.jpg',      case: 'ain' },
    // au : son [o]
    { mot: "l'autruche",     image: '../animaux/autruche.jpg', case: 'au' },
    { mot: 'jaune',          image: 'jaune.jpg',      case: 'au' },
    { mot: 'chaud',          image: 'chaud.jpg',      case: 'au' },
    { mot: 'le taureau',     image: 'taureau.jpg',    case: 'au' },
    { mot: 'les chaussures', image: 'chaussures.jpg', case: 'au' },
    { mot: 'la saucisse',    image: 'saucisse.jpg',   case: 'au' },
  ],
});
