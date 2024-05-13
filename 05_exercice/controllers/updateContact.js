import fs from "fs";
import csv from "csv";

/***AFFICHER LE FORMULAIRE DE MODIFICATION */
export function updateContact(req, res) {
    let id = req.params.id;
    fs.readFile('public/csv/liste.csv', (err, data) => {
        if (err) throw err;
        csv.parse(data, { columns: false, trim: true }, function(err, rows) {
            //on appelle le template modifContact en lui passant les informations concernant le contact
            res.render('modifContact', { id: id, contact: rows[id] });
        })


    });

};


export function updateContactSubmit(req, res) {
    fs.readFile('public/csv/liste.csv', (err, data) => {

        //si il y a une erreur on l'affiche
        if (err) throw err;

        //sinon, on parse le fichier pour le transformer en tableau
        csv.parse(data, { columns: false, trim: true }, function(err, rows) {

            //on récupère les données transmises par le formulaire
            let datas = [req.body.civilite, req.body.nom, req.body.prenom, req.body.tel, req.body.email, req.body.birthdate];

            //on modifie le contact 
            rows[req.params.id] = datas;


            //on transforme à nouveau le tableau en csv
            csv.stringify(rows, function(err, rows) {

                //on écrit le fichier pour modifier son contenu
                fs.writeFile('public/csv/liste.csv', rows, function(err) {
                    if (err) throw err;

                    //on redirige vers la page d'accueil
                    res.redirect('/');
                });

            });
        });
    });

};