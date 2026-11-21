/*
 * Jeu de LECTURE « La lettre a : quel son ? » (semaine 10, lecture « La lettre a : a, au et eau »).
 * Seul le mot écrit est montré (pas de photo, pas de voix) : l'enfant doit vraiment le lire,
 * puis le range selon le son que fait la lettre a.
 *   [a]        : la lettre a se dit [a] (le chat)
 *   [o]        : au et eau se disent [o] (un seau)
 *   autre son  : an, am, ai… (une lampe, une fraise)
 * Attention aussi aux petits mots : « la chambre » ferait entendre [a] → on écrit « une chambre ».
 * Chaque mot n'appartient qu'à une seule case : pas de mot qui contient à la fois [a] et [o]
 * (ex. « un bateau » ou « un oiseau » sont exclus).
 * Une fois rangé dans la bonne case, la photo apparaît ; l'enfant peut la toucher pour entendre le mot.
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 */
lancerJeuTri({
  titre: 'La lettre a : quel son ?',
  accueil: '../../semaine-10.html',
  consigne: "Lis le mot. Qu'est-ce que tu entends : [a] comme dans « chat », [o] comme dans « seau », ou un autre son ? Fais glisser le mot dans la bonne case : sa photo apparaîtra !",
  dossierImages: '../../images/cartes/',
  lecture: true,

  cases: [
    { id: 'a',     entendu: '[a]',       couleur: '#e76f51' },
    { id: 'o',     entendu: '[o]',       couleur: '#3a86ff' },
    { id: 'autre', entendu: 'autre son', couleur: '#2a9d8f' },
  ],

  mots: [
    // a : son [a]
    { mot: 'le chat',      image: 'chat.jpg',            case: 'a' },
    { mot: 'un phare',     image: 'phare.jpg',           case: 'a' },
    { mot: 'une tache',    image: 'tache.jpg',           case: 'a' },
    { mot: 'un lapin',     image: '../animaux/lapin.jpg', case: 'a' },
    // au, eau : son [o]
    { mot: 'un seau',      image: 'seau.jpg',            case: 'o' },
    { mot: 'un museau',    image: 'museau.jpg',          case: 'o' },
    { mot: 'un taureau',   image: 'taureau.jpg',         case: 'o' },
    { mot: 'une autruche', image: '../animaux/autruche.jpg', case: 'o' },
    // an, am, ai : un autre son
    { mot: 'un éléphant',  image: 'elephant.jpg',        case: 'autre' },
    { mot: 'une chambre',  image: 'chambre.jpg',         case: 'autre' },
    { mot: 'une lampe',    image: 'lampe.jpg',           case: 'autre' },
    { mot: 'une fraise',   image: 'fraise.jpg',          case: 'autre' },
  ],
});
