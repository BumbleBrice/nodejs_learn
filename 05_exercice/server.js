//appel des dépendances
import express from "express";
import router from "./routes/carnet.js";

const app = express();


//pour récupérer les informations du formulaire
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 


//fichiers statiques
app.use(express.static('public'));

//spécifie le dossier qui contient les vues
app.set('views', './views'); 

//définit le moteur de template (permet de ne plus mettre l'extension .ejs dans les render)
app.set('view engine', 'ejs'); 

//importation des routes
app.use('/', router);





//port d'écoute
app.listen(3000,function(){
    console.log('serveur démarré sur port 3000');
});