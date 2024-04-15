import express from "express";

import router from "./routes/router.js";


const app = express();
const port = 8000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;

// on indique à express où sont les fichiers statiques js, image et css
app.use(express.static("public"));



// utilisation des template EJS grâce au modules npm "ejs"
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('view options', { pretty: true });


//pour l'utilisation du json à la réception des données formulaire
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 




//appel du routeur
app.use('/', router);

// lancement du serveur sur un port choisi 
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})