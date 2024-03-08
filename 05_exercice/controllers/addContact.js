import fs from "fs";
import csv from "csv";

//AFFICHAGE DU FORMULAIRE
export function addContact(req,res){
    res.render('addContact');
    
};


/*******AJOUT D UN CONTACT ET ACTUALISATION DE L AFFICHAGE */
export function addContactSubmit(req,res){
     //lecture du fichier CSV
     fs.readFile('public/csv/liste.csv', (err, data) => {

        //si il y a une erreur on l'affiche
        if (err) throw err;

        //sinon, on parse le fichier pour le transformer en tableai
        csv.parse(data, {columns: false, trim: true}, function(err, rows) {
            
            //on récupère les données transmises par le formulaire
            let datas=[req.body.civilite,req.body.nom,req.body.prenom,req.body.tel,req.body.email,req.body.birthdate];
            console.log(datas)

            //on les ajoute à la variable rows (qui contient les données existantes)
            rows.push(datas);

           //on transforme à nouveau le tableau en csv
            csv.stringify(rows, function(err, rows) {

                //on écrit le fichier pour modifier son contenu
                fs.writeFile('public/csv/liste.csv',rows,function(err){
                    if (err) throw err;   

                    //on redirige vers la page d'accueil
                    res.redirect('/');
                });

            });
          });
        });  
    
};