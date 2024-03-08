const lottery = require('./componants/lottery')
const colors = require('colors')


let tirage = lottery.loto(3, 20, 40)
console.log('Tirage de la lotterie'.yellow)
let displayNumbers = tirage.join(' - ')
console.log(displayNumbers.rainbow)

let gagnant = lottery.gagnant("Laury", "Marie", "Antoine", "Fateh", "Axel", "Fabien", "Brice")
console.log(`Le ou la gagante est : ${gagnant.blue}`)