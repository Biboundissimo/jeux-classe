/*
 * Jeu de LECTURE « J'entends [è], [in] ou [o] ? » (semaine 11, lecture « La lettre a : ai, ain et aim »).
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
  titre: "J'entends [è], [in] ou [o] ?",
  accueil: '../../semaine-11.html',
  consigne: "Lis le mot. Qu'est-ce que tu entends : [è], [in] ou [o] ? Fais glisser le mot dans la bonne case : sa photo apparaîtra !",
  dossierImages: '../../images/cartes/',
  lecture: true,

  cases: [
    // Seulement le son entendu (pas l'écriture), sinon il suffirait de comparer les lettres sans lire.
    { id: 'ai',  entendu: '[è]',  couleur: '#e76f51' },
    { id: 'ain', entendu: '[in]', couleur: '#2a9d8f' },
    { id: 'au',  entendu: '[o]',  couleur: '#3a86ff' },
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
