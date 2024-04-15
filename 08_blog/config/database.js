import mysql from "mysql";

let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "localhost",// on rentre l'hôte l'adresse url où se trouve la bdd
    user: "root", // identifiant BDD
    password: "", // le password
    database: "blog_1", // nom de la base de donnée
});

export default pool;