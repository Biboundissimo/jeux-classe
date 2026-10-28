/*
 * Jeu « o, ou, on ou om : qu'est-ce que j'entends ? » (semaine 8, lecture « La lettre o »).
 * o : son [o] ; ou : son [ou] ; on et om : son [on] (devant m, p, b, le n se transforme en m).
 * on et om se disent pareil : le mot est donc écrit sous la photo (afficherMot).
 * Chaque mot n'appartient qu'à une seule case (pas de « mouton » ni de « cochon » ici).
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse à la place de la voix de synthèse :
 * enregistrer un fichier (ex. « sons/loup.mp3 ») et ajouter  son: 'sons/loup.mp3'  au mot.
 */
lancerJeuTri({
  titre: "o, ou, on ou om : qu'est-ce que j'entends ?",
  accueil: '../../semaine-8.html',
  consigne: "Écoute et lis le mot, puis fais glisser la photo dans la bonne case. Attention : on et om se disent pareil, regarde bien comment le mot s'écrit !",
  dossierImages: '../../images/cartes/',
  afficherMot: true,

  cases: [
    // On montre la lettre écrite, puis ce que l'oreille entend.
    { id: 'o',  lettre: 'o',  prononce: '[o]',  couleur: '#3a86ff' },
    { id: 'ou', lettre: 'ou', prononce: '[ou]', couleur: '#e76f51' },
    { id: 'on', lettre: 'on', prononce: '[on]', couleur: '#2a9d8f' },
    { id: 'om', lettre: 'om', prononce: '[on]', couleur: '#9b5de5' },
  ],

  mots: [
    // o : son [o]
    { mot: 'la moto',       image: 'moto.jpg',      case: 'o' },
    { mot: 'une carotte',   image: 'carotte.jpg',   case: 'o' },
    { mot: 'une pomme',     image: 'pomme.jpg',     case: 'o' },
    { mot: 'un vélo',       image: 'velo.jpg',      case: 'o' },
    // ou : son [ou]
    { mot: 'un loup',       image: 'loup.jpg',      case: 'ou' },
    { mot: 'un hibou',      image: 'hibou.jpg',     case: 'ou' },
    { mot: 'une poule',     image: 'poule.jpg',     case: 'ou' },
    { mot: 'une souris',    image: 'souris.jpg',    case: 'ou' },
    // on : son [on]
    { mot: 'le bison',      image: 'bison.jpg',     case: 'on' },
    { mot: 'une montre',    image: 'montre.jpg',    case: 'on' },
    { mot: 'une ronde',     image: 'ronde.jpg',     case: 'on' },
    { mot: 'un garçon',     image: 'garcon.jpg',    case: 'on' },
    // om : son [on], devant m, p, b
    { mot: 'un pompier',    image: 'pompier.jpg',   case: 'om' },
    { mot: 'une trompette', image: 'trompette.jpg', case: 'om' },
    { mot: 'une ombre',     image: 'ombre.jpg',     case: 'om' },
    { mot: 'il tombe',      image: 'tombe.jpg',     case: 'om' },
  ],
});
