import express from "express";
import fs from "fs";
const app = express();

const port = 8000;
const hostname = "localhost";
const BASE_URL = `http://${hostname}:${port}`;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// querystring

/*const bodyParser = require('body-parser')
app.use(bodyParser.json())

obsolète et redondent si vous utiliser express 4.16 ou ultérieur
*/

app.use(express.static("public"));

app.get("/", (req, res) => {
    const kittens = JSON.parse(fs.readFileSync(`./Data/kittens.json`, "utf8"));
    let k = ""
    for (const { id, name, image } of kittens) {
        k += ` 
    <div class="kitten">
      <a href="/kitten/${id}">${name}</a>
      <img src="${BASE_URL}/images/${image}" />
    </div>
    `
    }
    res.send(
        `<html>
    <head>
      <meta charset="utf-8" />
      <title>Ajoutez un utilisateur</title>
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
            <li><a class="active">Home</a></li>
          </ul>
        </nav>
      </div>
      <div class="container">${k}</div>
    </body>
  </html>`
    )
})

app.get("/kitten/:id", (req, res) => {
    const { id } = req.params
    try {
        const kitten = JSON.parse(fs.readFileSync(`./Data/${id}.json`, "utf-8"));
        const { name, image, age, description } = kitten
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
              </ul>
            </nav>
          </div>
          <div class="container">
            <div>
              <h2>${name}</h2>
              <p>Age :${age}</p>
              <p>${description}</p>
              <img src="${BASE_URL}/images/${image}" />
            </div>
          </div>
        </body>
      </html>`
        );

    } catch (err) {
        res.status(404).end('Problème, petit chat non trouver')
    }
})

// ajouter le formulaire 
app.get('/add/cat', (req, res) => {
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
    )
})

app.post('/add/cat',  (req, res) => {
  
  
  const kittens = JSON.parse(fs.readFileSync(`./Data/kittens.json`, "utf-8"));
  
  let id = kittens[kittens.length-1].id+1;

  let newCat = {
    name:req.body.name,
    image:req.body.image,
    age:req.body.age,
    description:req.body.desc,
    id:id
  }
  
  kittens.push(newCat);
  
  console.log(JSON.stringify(kittens));

  fs.writeFile(`./Data/kittens.json`,JSON.stringify(kittens), (err) => {

    if(err) throw err;

    //si il n'y a pas d'erreur alors on passe au fichier suivant
    fs.writeFile(`./Data/${id}.json`,JSON.stringify(newCat), (err) => {
      
      if(err) throw err;
      
      //si il n'y a pas d'erreur alors on redirige
      res.redirect('/');

    });

  });
  
})



app.listen(port, () => {
    console.log(`Example app listening at ${BASE_URL}`);
});