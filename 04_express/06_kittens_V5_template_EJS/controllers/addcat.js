import fs from "fs";

const hostname = "localhost";
const port = 8000;
const BASE_URL = `http://${hostname}:${port}`;


export function addCat(req, res) {
    res.render('addCat.ejs', {base_url:BASE_URL});;
}

export function addCatSubmit (req, res) {
	 const kittens = JSON.parse(fs.readFileSync(`./Data/kittens.json`, "utf-8"));

    let id = kittens[kittens.length - 1].id + 1;

    let newCat = {
        name: req.body.name,
        image: req.body.image,
        age: req.body.age,
        description: req.body.desc,
        id: id
    }

    kittens.push(newCat);

    console.log(JSON.stringify(kittens));

    fs.writeFile(`./Data/kittens.json`, JSON.stringify(kittens), (err) => {

        if (err) throw err;

        //si il n'y a pas d'erreur alors on passe au fichier suivant
        fs.writeFile(`./Data/${id}.json`, JSON.stringify(newCat), (err) => {

            if (err) throw err;

            //si il n'y a pas d'erreur alors on redirige
            res.redirect('/');

        });

    });
}