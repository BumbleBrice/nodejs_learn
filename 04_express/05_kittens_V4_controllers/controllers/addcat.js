import fs from "fs";

const hostname = "localhost";
const port = 8000;
const BASE_URL = `http://${hostname}:${port}`;


export function addCat(req, res) {
    res.send(
        `<html>
      <head>
        <meta charset="utf-8" />
        <title>Le chat</title>
        <link
          rel="stylesheet"
          href="${BASE_URL}/css/styles.css"
          type="text/css"
        />
      </head>
      <body>
        <div class="container">
          <nav>
            <ul>
              <li>Kittens</li>
              <li><a href="/">Home</a></li>
              <li><a href="/add/cat">Ajouter un chat</a></li>
            </ul>
          </nav>
        </div>
        <div class="container">
          <form method="post">
            <div>
              <label for="name">Nom</label>
              <input type="text" id="name" name="name" >
            </div>
            <div>
              <label for="age">Age</label>
              <input type="text" id="age" name="age" >
            </div>
            <div>
              <label for="desc">Description</label>
              <input type="text" id="desc" name="desc" >
            </div>
            <div>
              <label for="image">Image</label>
              <input type="text" id="image" name="image" >
            </div>
            <button>Ajouter</button>

          </form>
        </div>
      </body>
    </html>`
    );
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