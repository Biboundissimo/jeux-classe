/*
 * Jeu « J'entends t, b, p ou d ? » : 22 animaux.
 * Chaque mot ne contient QU'UN SEUL des quatre sons (à l'oral), pour éviter toute ambiguïté.
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse à la place de la voix de synthèse :
 * enregistrer un fichier (ex. « sons/tortue.mp3 ») et ajouter  son: 'sons/tortue.mp3'  au mot.
 */
lancerJeuTri({
  titre: "J'entends t, b, p ou d ?",
  accueil: '../../semaine-revision.html',
  consigne: "Écoute bien le nom de l'animal, puis fais glisser la photo dans la bonne case.",
  dossierImages: '../../images/animaux/',

  cases: [
    { id: 't', etiquette: "J'entends", lettre: 't', couleur: '#e76f51' },
    { id: 'b', etiquette: "J'entends", lettre: 'b', couleur: '#2a9d8f' },
    { id: 'p', etiquette: "J'entends", lettre: 'p', couleur: '#9b5de5' },
    { id: 'd', etiquette: "J'entends", lettre: 'd', couleur: '#3a86ff' },
  ],

  mots: [
    // [t]
    { mot: 'tortue',     image: 'tortue.jpg',     case: 't' },
    { mot: 'tigre',      image: 'tigre.jpg',      case: 't' },
    { mot: 'toucan',     image: 'toucan.jpg',     case: 't' },
    { mot: 'autruche',   image: 'autruche.jpg',   case: 't' },
    { mot: 'loutre',     image: 'loutre.jpg',     case: 't' },
    { mot: 'marmotte',   image: 'marmotte.jpg',   case: 't' },
    // [b]
    { mot: 'baleine',    image: 'baleine.jpg',    case: 'b' },
    { mot: 'abeille',    image: 'abeille.jpg',    case: 'b' },
    { mot: 'zèbre',      image: 'zebre.jpg',      case: 'b' },
    { mot: 'hibou',      image: 'hibou.jpg',      case: 'b' },
    { mot: 'bison',      image: 'bison.jpg',      case: 'b' },
    { mot: 'colibri',    image: 'colibri.jpg',    case: 'b' },
    // [p]
    { mot: 'perroquet',  image: 'perroquet.jpg',  case: 'p' },
    { mot: 'pieuvre',    image: 'pieuvre.jpg',    case: 'p' },
    { mot: 'pingouin',   image: 'pingouin.jpg',   case: 'p' },
    { mot: 'lapin',      image: 'lapin.jpg',      case: 'p' },
    { mot: 'serpent',    image: 'serpent.jpg',    case: 'p' },
    // [d]
    { mot: 'dauphin',    image: 'dauphin.jpg',    case: 'd' },
    { mot: 'dromadaire', image: 'dromadaire.jpg', case: 'd' },
    { mot: 'crocodile',  image: 'crocodile.jpg',  case: 'd' },
    { mot: 'dindon',     image: 'dindon.jpg',     case: 'd' },
    { mot: 'dinosaure',  image: 'dinosaure.jpg',  case: 'd' },
  ],
});
