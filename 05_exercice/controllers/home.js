import fs from "fs";
import csv from "csv";

export default (req,res) => {
    fs.readFile('public/csv/liste.csv', (err, data) => {
        if (err) throw err;
        csv.parse(data, {columns: false, trim: true}, function(err, rows) {
            // Your CSV data is in an array of arrys passed to this callback as rows.
            console.log(rows);
            res.render('index',{contacts:rows});
        })
    });
    
};