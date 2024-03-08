import fs from "fs";

const hostname = "localhost";
const port = 8000;
const BASE_URL = `http://${hostname}:${port}`;

export default (req, res) => {
    const kittens = JSON.parse(fs.readFileSync(`./Data/kittens.json`, "utf-8"));
    let k = "";
    for (const { id, name, image } of kittens) {
      k += `
      <div class="kitten">
        <a href="/kitten/${id}">${name}</a>
        <img src="${BASE_URL}/images/${image}" />
      </div>
      `;
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
              <li><a href="/">Home</a></li>
              <li><a href="/add/cat">Ajouter un chat</a></li>
          </ul>
          </nav>
        </div>
        <div class="container">${k}</div>
      </body>
    </html>`
    );
}