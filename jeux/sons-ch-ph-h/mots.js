/*
 * Jeu « ch, ph ou h : qu'est-ce que j'entends ? » (semaine 7, lecture « La lettre h »).
 * ch : son [ch] ; ph : son [f] ; h tout seul : on ne l'entend pas.
 * Les mots viennent de la fiche de lecture 7. Chaque mot n'appartient qu'à une seule case.
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse à la place de la voix de synthèse :
 * enregistrer un fichier (ex. « sons/chat.mp3 ») et ajouter  son: 'sons/chat.mp3'  au mot.
 */
lancerJeuTri({
  titre: "ch, ph ou h : qu'est-ce que j'entends ?",
  accueil: '../../semaine-7.html',
  consigne: "Écoute bien le mot, puis fais glisser la photo dans la bonne case. Attention : ph se dit [f], et h tout seul ne s'entend pas !",
  dossierImages: '../../images/cartes/',

  cases: [
    // On montre la lettre écrite, puis ce que l'oreille entend.
    { id: 'ch', lettre: 'ch', prononce: '[ch]', couleur: '#e76f51' },
    { id: 'ph', lettre: 'ph', prononce: '[f]',  couleur: '#2a9d8f' },
    { id: 'h',  lettre: 'h',  prononce: null,   couleur: '#9b5de5' },
  ],

  mots: [
    // ch : son [ch]
    { mot: 'le chat',        image: 'chat.jpg',      case: 'ch' },
    { mot: 'une moustache',  image: 'moustache.jpg', case: 'ch' },
    { mot: 'une tache',      image: 'tache.jpg',     case: 'ch' },
    { mot: 'une chambre',    image: 'chambre.jpg',   case: 'ch' },
    { mot: 'un chemin',      image: 'chemin.jpg',    case: 'ch' },
    { mot: 'il marche',      image: 'marche.jpg',    case: 'ch' },
    // ph : son [f]
    { mot: 'une photo',      image: 'photo.jpg',     case: 'ph' },
    { mot: 'le phoque',      image: 'phoque.jpg',    case: 'ph' },
    { mot: 'le téléphone',   image: 'telephone.jpg', case: 'ph' },
    { mot: 'un phare',       image: 'phare.jpg',     case: 'ph' },
    { mot: 'un éléphant',    image: 'elephant.jpg',  case: 'ph' },
    { mot: 'la pharmacie',   image: 'pharmacie.jpg', case: 'ph' },
    // h muet
    { mot: 'il habite',      image: 'habite.jpg',    case: 'h' },
    { mot: 'un homme',       image: 'homme.jpg',     case: 'h' },
    { mot: 'une heure',      image: 'heure.jpg',     case: 'h' },
    { mot: 'une histoire',   image: 'histoire.jpg',  case: 'h' },
    { mot: "l'hiver",        image: 'hiver.jpg',     case: 'h' },
    { mot: "l'herbe",        image: 'herbe.jpg',     case: 'h' },
  ],
});
