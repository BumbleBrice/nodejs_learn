import fs from "fs";

const hostname = "localhost";
const port = 8000;
const BASE_URL = `http://${hostname}:${port}`;


export default (req, res) => {
	 const { id } = req.params;
    try {
        const kitten = JSON.parse(fs.readFileSync(`./Data/${id}.json`, "utf-8"));
        const { name, image, age, description } = kitten;

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
        // gestion de la page 404
        res.status(404).send('Sorry cant find that!');
    }
}