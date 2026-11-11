/*
 * Jeu « oi et oin : qu'est-ce que j'entends ? » (semaine 9, lecture « La lettre o : oi et oin »).
 * oi : son [oua] (le roi) ; oin : son [ouin] (le coin).
 * Chaque mot n'appartient qu'à une seule case (pas de mot qui contient à la fois oi et oin).
 * « coin » et « coing » se disent pareil : c'est voulu, on range à l'oreille.
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse à la place de la voix de synthèse :
 * enregistrer un fichier (ex. « sons/roi.mp3 ») et ajouter  son: 'sons/roi.mp3'  au mot.
 */
lancerJeuTri({
  titre: "oi et oin : qu'est-ce que j'entends ?",
  accueil: '../../semaine-9.html',
  consigne: "Écoute bien le mot, puis fais glisser la photo dans la bonne case. Attention : oi se dit [oua] comme dans « roi », oin se dit [ouin] comme dans « coin » !",
  dossierImages: '../../images/cartes/',

  cases: [
    // On montre la lettre écrite, puis ce que l'oreille entend.
    { id: 'oi',  lettre: 'oi',  prononce: '[oua]',  couleur: '#3a86ff' },
    { id: 'oin', lettre: 'oin', prononce: '[ouin]', couleur: '#e76f51' },
  ],

  mots: [
    // oi : son [oua]
    { mot: 'un roi',       image: 'roi.jpg',       case: 'oi' },
    { mot: 'une poire',    image: 'poire.jpg',     case: 'oi' },
    { mot: 'une étoile',   image: 'etoile.jpg',    case: 'oi' },
    { mot: 'un oiseau',    image: 'oiseau.jpg',    case: 'oi' },
    { mot: 'la voiture',   image: 'voiture.jpg',   case: 'oi' },
    { mot: 'un poisson',   image: 'poisson.jpg',   case: 'oi' },
    // oin : son [ouin]
    { mot: 'le foin',      image: 'foin.jpg',      case: 'oin' },
    { mot: 'un coin',      image: 'coin.jpg',      case: 'oin' },
    { mot: 'un poing',     image: 'poing.jpg',     case: 'oin' },
    { mot: 'un coing',     image: 'coing.jpg',     case: 'oin' },
    { mot: 'un rond-point', image: 'rond-point.jpg', case: 'oin' },
  ],
});
