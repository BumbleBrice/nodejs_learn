const http = require('http');
const colors = require('colors');
const lottery = require('./componants/lottery');
const server = http.createServer()


let tirage = lottery.loto(6, 1, 49)
console.log("Tirage de la lotterie : ".green)

let displayNumber = ""
for (let i = 0; i < tirage.length; i++) {
    displayNumber += tirage[i]
    if (i != tirage.length[i]) {
        displayNumber += " - "
    }
}

console.log(displayNumber.rainbow)

let nom = lottery.gagnant("Antoine", "Marie", "Laury", "Fabien", "Fateh", "Axel", "Brice");
console.log("Le winnner de la super lotterie est : ", nom.red)

const currentDate = new Date()
const todaysDate = currentDate.toDateString()

server.on("request", function(req, res) {
    res.write('<html><head><meta charset="utf-8"></head>');
    res.write('<body>');
    res.write(`<h2>Tirage de notre loterie du ${todaysDate}</h2><p> ${displayNumbers} </p>`);
    res.write('<h2>Le grand gagnant du Super Loto est</h2><p>' + nom.toUpperCase() + "</p>");
    res.write('</body></html>');
    res.end();
})

server.listen(3000)