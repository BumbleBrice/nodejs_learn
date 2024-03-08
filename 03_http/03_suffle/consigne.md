# Exercice - Shuffle
Configurez un nouveau projet dans le dossier Exercices. Et utilisez les données suivantes :

const users = [
    'Alan',
    'Sophie',
    'Bernard',
    'Elie'
];

Créez un module utils dans un dossier src, dans ce fichier créez un algorithme qui mélange les users. Puis définissez un serveur Node.js natif, comme on a vu dans ce cours, et utilisez deux routes : la route racine qui affichera une page HTML avec la liste des users (voir les données ci-dessous) et la route shuffle qui mélangera les utilisateurs.

Remarque : dans le fichier package.json et dans la partie scripts, vous pouvez définir une commande start exécutable pour lancer le serveur :

{
  "name": "shuffle",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}