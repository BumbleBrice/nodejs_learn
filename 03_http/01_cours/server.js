const http = require('http');
const fs = require('fs');
const server = http.createServer();

/*server.on("request", function(req, res) {
    res.write("<html><head><meta charset='utf-8'></head>");
	  res.write("<body>Bienvenue sur notre nouvelle page, avec nodemon </body>");
	  res.write("</html>");

    res.end()
})*/

server.on("request", function(req, res) {
    const url = req.url.replace('/', '');
    if (url == "contact") {
        page = fs.createReadStream("views/contact.html")
    } else {
        let page = fs.createReadStream('views/index.html')

    }
    page.pipe(res)
})

server.listen(3000, 'localhost', () => {
    console.log(`Server running at http//localhost:3000/`)
})