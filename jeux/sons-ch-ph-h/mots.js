/*
 * Jeu « J'entends ch, ph… ou pas de h ? » (semaine 7, lecture « La lettre h »).
 * ch : son [ch] ; ph : son [f] ; h tout seul : on ne l'entend pas.
 * Les mots viennent de la fiche de lecture 7. Chaque mot n'appartient qu'à une seule case.
 * Photos : Wikimedia Commons (auteurs et licences dans credits.html à la racine du site).
 *
 * Pour utiliser la voix de la maîtresse à la place de la voix de synthèse :
 * enregistrer un fichier (ex. « sons/chat.mp3 ») et ajouter  son: 'sons/chat.mp3'  au mot.
 */
lancerJeuTri({
  titre: "J'entends ch, ph… ou pas de h ?",
  accueil: '../../semaine-7.html',
  consigne: "Écoute bien le mot, puis fais glisser la photo dans la bonne case. Attention : avec h tout seul, on n'entend rien !",
  dossierImages: '../../images/cartes/',

  cases: [
    { id: 'ch', etiquette: "J'entends",        lettre: 'ch', couleur: '#e76f51' },
    { id: 'ph', etiquette: "J'entends",        lettre: 'ph', couleur: '#2a9d8f' },
    { id: 'h',  etiquette: "Je n'entends pas", lettre: 'h',  couleur: '#9b5de5' },
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
