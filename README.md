# Les jeux de la classe

Petits jeux pédagogiques pour des élèves de CE2 (8 ans), utilisables dans un navigateur, à la souris ou sur écran tactile.
Aucun serveur ni installation : il suffit d'ouvrir `index.html` (ou de déposer le dossier sur n'importe quel hébergement de pages statiques).

## Organisation

```
index.html                  page d'accueil (liste des semaines)
semaine-revision.html       jeux de la semaine Révision
semaine-7.html              jeux de la semaine 7
css/commun.css              styles communs
js/commun.js                voix, bruitages, glisser-déposer
js/jeu-tri.js               moteur réutilisable « ranger des images dans des cases »
js/jeu-mots-meles.js        moteur du jeu de mots mêlés
css/mots-meles.css          styles du jeu de mots mêlés
js/jeu-lettres.js           moteur du jeu « lettres en désordre »
css/jeu-lettres.css         styles du jeu « lettres en désordre »
js/jeu-mots-croises.js      moteur du jeu de mots croisés
js/reconnaissance-lettres.js  reconnaissance des lettres CAPITALES écrites au stylet (sans Internet)
css/mots-croises.css        styles du jeu de mots croisés
images/animaux/             photos des animaux (Wikimedia Commons, voir credits.html)
images/cartes/              photos des jeux « lettres en désordre » et « ch, ph, h »
jeux/sons-t-b-p-d/          jeu « J'entends t, b, p ou d ? »
  index.html
  mots.js                   la liste des 22 mots : c'est le seul fichier à modifier
jeux/mots-meles/            jeu « Mots mêlés »
  index.html
  mots.js                   la liste des mots cachés et la taille de la grille par niveau
jeux/lettres-desordre/      jeu « Les lettres en désordre 1 » (terrier, museau, plume, poisson)
  index.html
  mots.js                   les mots, leur photo et le petit mot devant (« elle », « il »)
jeux/lettres-desordre-2/    jeu « Les lettres en désordre 2 » (insecte, tige, il chasse, elle grimpe)
  index.html
  mots.js
jeux/mots-croises/          jeu « Mots croisés »
  index.html
  mots.js                   les mots et leurs définitions (la grille est construite automatiquement)
jeux/sons-ch-ph-h/          semaine 7 : jeu « J'entends ch, ph… ou pas de h ? » (3 cases)
jeux/lettres-desordre-s7-1/ semaine 7 : une tache, une moustache, le chat, il cherche
jeux/lettres-desordre-s7-2/ semaine 7 : chez, il habite, une photo, le phoque
jeux/mots-meles-s7/         semaine 7 : mots mêlés avec les 8 mots de la dictée
jeux/mots-croises-s7/       semaine 7 : mots croisés avec les 8 mots de la dictée
credits.html                auteurs et licences des photos
```

## Modifier les mots

Dans `jeux/sons-t-b-p-d/mots.js`, chaque mot est une ligne :

```js
{ mot: 'tortue', image: 'tortue.jpg', case: 't' },
```

Choisir des mots qui ne contiennent qu'**un seul** des sons à l'oral (ex. « bateau » contient à la fois [b] et [t]).

## Utiliser sa propre voix

Par défaut, les mots sont lus par la voix française du navigateur (meilleure sur Edge ou Chrome).
Pour utiliser un enregistrement : placer le fichier dans `jeux/sons-t-b-p-d/sons/` et ajouter `son: 'sons/tortue.mp3'` au mot.

## Ajouter un nouveau jeu de tri (ex. « J'entends f ou v »)

1. Copier le dossier `jeux/sons-t-b-p-d/` en `jeux/sons-f-v/`.
2. Modifier `mots.js` (titre, cases, mots) et ajouter les images dans `images/` (et leurs auteurs dans `credits.html`).
3. Ajouter une tuile dans la page de la semaine (`semaine-7.html`…).

## Écriture au stylet (mots croisés)

Les lettres doivent être écrites en CAPITALES. La reconnaissance compare le dessin à des modèles de lettres,
sans connexion Internet. Si une lettre est mal reconnue, l'enfant touche la bonne lettre parmi les propositions
« Pas la bonne lettre ? » : le dessin est alors mémorisé sur cet appareil pour mieux reconnaître cette écriture.
Un clavier à l'écran est aussi disponible (bouton « Clavier »).

## Ajouter une nouvelle semaine

1. Copier `semaine-7.html` en `semaine-8.html` et y mettre les tuiles des nouveaux jeux.
2. Ajouter une tuile « Semaine 8 » dans `index.html`.
3. Créer les jeux en copiant un dossier existant (ex. `jeux/mots-meles-s7/` → `jeux/mots-meles-s8/`) et changer `mots.js`,
   sans oublier `accueil: '../../semaine-8.html'` pour que le bouton ⌂ ramène à la bonne semaine.
