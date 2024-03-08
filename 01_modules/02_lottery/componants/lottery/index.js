let loto = function(nbTirages, min, max) {
    let i = 0
    let tirage = new Array()
    let numerosTires = new Set()

    do {
        i++
        let numero;
        do {
            numero = Math.floor(Math.random() * (max - min + 1)) + min
        } while (numerosTires.has(numero))
        numerosTires.add(numero)
        tirage.push(numero)
    } while (i < nbTirages)

    tirage.sort((a, b) => a - b)

    return tirage

}

let gagnant = function(...joueurs) {
	let indexRandom = Math.floor(Math.random() * joueurs.length)
	return joueurs[indexRandom]
}

module.exports.loto = loto
module.exports.gagnant = gagnant

