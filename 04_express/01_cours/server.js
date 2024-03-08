import express from "express";
import fs from "fs";
import { hello } from "./utils/hello"

const app = express()

app.use(express.static('public'))
const port = 8000


app.get("/", (req, res) => {
	res.send(hello('Hello world!'))
})
app.post("/", (req, res) => {
	res.send("...")
})
app.get("ab*dc", ..)

app.get('/users/:id', (req, res))

app.get('', (req, res) =>{
	req.header('User-Agent')

	res.set('Content-Type', 'text/plain')

	res.status(200).send('Message de votre choix')
	res.status(404).send('Page non trouvee')

})


app.listen(port, () => {
	console.log("Serveur sur le port : ", port)
})