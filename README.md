# Les jeux de la classe

Petits jeux pédagogiques pour des élèves de CE2 (8 ans), utilisables dans un navigateur, à la souris ou sur écran tactile.
Aucun serveur ni installation : il suffit d'ouvrir `index.html` (ou de déposer le dossier sur n'importe quel hébergement de pages statiques).

## Organisation

```
index.html                  page d'accueil (liste des jeux)
css/commun.css              styles communs
js/commun.js                voix, bruitages, glisser-déposer
js/jeu-tri.js               moteur réutilisable « ranger des images dans des cases »
js/jeu-mots-meles.js        moteur du jeu de mots mêlés
css/mots-meles.css          styles du jeu de mots mêlés
js/jeu-lettres.js           moteur du jeu « lettres en désordre »
css/jeu-lettres.css         styles du jeu « lettres en désordre »
images/animaux/             photos des animaux (Wikimedia Commons, voir credits.html)
images/cartes/              photos du jeu « lettres en désordre »
jeux/sons-t-b-p-d/          jeu « J'entends t, b, p ou d ? »
  index.html
  mots.js                   la liste des 22 mots : c'est le seul fichier à modifier
jeux/mots-meles/            jeu « Mots mêlés »
  index.html
  mots.js                   la liste des mots cachés et la taille de la grille par niveau
jeux/lettres-desordre/      jeu « Les lettres en désordre »
  index.html
  mots.js                   les mots, leur photo et le petit mot devant (« elle », « il »)
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
3. Ajouter une tuile dans `index.html`.
