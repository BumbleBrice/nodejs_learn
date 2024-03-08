const fs = require('fs');

fs.readFile('titanic.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});


/*const { writeFile } = fs // assignation par décomposition

const data = "Hello Node.js, c'est trop cool, on test"
writeFile('myFile.txt', data, (err) => {
	if(err) throw err
		console.log("c'est ok ! ")
})*/

const { appendFile } = fs // assignation
const data = "Hello Node.js"

appendFile('myFile.txt', data, (err) => {
	if(err) throw err
		console.log("fichier modifier avec succèss !")
})


/*
try {
  const data = fs.readFileSync('titanic.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
};*/