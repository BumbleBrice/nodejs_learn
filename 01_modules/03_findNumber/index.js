let count = 0;

console.log(
  "Vous devez commencer le jeu choisissez un nombre compris entre 1 à 100"
);
const searchNumber = Math.floor(Math.random()*100)+1;
//Permet de lire des données depuis le console
// .on permet d'écouter l'evement data
process.stdin.on("data", (chunk) => { 
  //incrémentation du compteur de tours
  count++;

  //convertit le nombre récupéré en console en nombre
  const number = parseInt(chunk);

  //si ce n'est pas un nombre 
  if (isNaN(number) === true) {
    console.log("ce n'est pas un nombre");
  }

  //si les 10 tentatives sont dépassées
  if (count > 10) {
    console.log(`Vous avez dépasser les 10 tentatives`);
    process.exit(0);
  }

  if (number > searchNumber) {
    console.log(`Le nombre est plus petit que ${number}`);
  } else if (number < searchNumber) {
    console.log(`Le nombre est plus grand que ${number}`);
  } else {
    console.log(
      `Vous avez gagnez en ${count} tentatives, c'était bien le nombre ${searchNumber}`
    );
    process.exit(0);
  }
});
