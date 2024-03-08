const http = require("http");
const fs = require("fs");
const shuffleUsers = require("./src/utils");



// Constantes et variables
const hostname = "127.0.0.1";
const port = 3000;
const users = ["Marie", "Laury", "Fabien", "Alex", "Fateh", "Antoine", "Brice", "Penelope"];


const server = http.createServer((req, res) => {
    const url = req.url.replace("/", "")


    if (url === "") {
        fs.readFile("views/index.html", "utf8", (err, data) => {
            if (err) {
                // Methode qui defini les en-têtes de réponses HTTP, utiliser avant d'envoyer le corps de la réponse
                res.writeHead(500, { "Content-type": "text/plain" })
                res.end("Internal server Error")
                return
            }
            // Remplace l'interpolation ${users} dans le template par les données du tableau
            const templatewithData = data.replace("${users}", users.join(', '))

            res.setHeader("Content-Type", "text/html; charset=utf8")
            res.end(templatewithData)

        })
    }
      if (url === "shuffle") {
    const shuffles = shuffleUsers(users);
    fs.readFile("./views/shuffle.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      res.setHeader("Content-Type", "text/html;charset=utf8");
      res.end(data.replace("${shuffles}", shuffles));
    });
  }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})