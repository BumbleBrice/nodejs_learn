import fs from "fs";
import csv from "csv";

/****SUPPRESSION DE CONTACT */
export default (req,res) => {
    fs.readFile('public/csv/liste.csv', (err, data) => {

        //si il y a une erreur on l'affiche
        if (err) throw err;

        //sinon, on parse le fichier pour le transformer en tableau
        csv.parse(data, {columns: false, trim: true}, function(err, rows) {
           
            
            //on récupère les données transmises par le formulaire
            let aSupprimer=req.body.sup;

            //on supprime les noms qui sont dans cette liste
            for(let i=aSupprimer.length-1;i>=0;i--){
                rows.splice(aSupprimer[i],1);
            }

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