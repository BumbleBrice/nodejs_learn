import fs from "fs";
import csv from "csv";


export default (req, res) => {
    fs.readFile('public/csv/liste.csv', (err, data) => {
        if (err) throw err;

        csv.parse(data, { columns: false, trim: true }, function (err, rows) {
            if (err) throw err;

            // Récupération de l'index du contact à afficher
            let id = req.params.id;

            // Extraction des informations du contact
            let contact = rows[id];

            // Récupération de la date de naissance du contact
            let birthdate = contact[5]; // Assurez-vous que l'index 5 est correct selon votre structure CSV

            // Conversion de la date de naissance en objet Date
            let birthdateDate = new Date(birthdate);

            // Récupération de la date actuelle
            let today = new Date();

            // Vérification si c'est l'anniversaire
            let isBirthday = today.getMonth() === birthdateDate.getMonth() && today.getDate() === birthdateDate.getDate();

            // On appelle le template details en lui passant les informations concernant le contact et l'indicateur d'anniversaire
            res.render('details', { id: id, contact: contact, isBirthday: isBirthday });
        });
    });
};
