import pool from "../config/database.js";

export default (req, res) => {
    // requete SQL qui va nous récupérer les informations 
    let sql = 'SELECT articles.id, title, description, date, path, alt FROM articles LEFT JOIN images ON images.article_id = articles.id ORDER BY date DESC';
    console.log(sql);

    pool.query(sql, function (error, posts, fields) {
            // appelle du template layout.ejs 
            // on fait passer la variable template pour dire à layout.ejs quel template charger, dans notre cas home.ejs
            //on fait passer en paramètre les informations récupérées en BDD sous la variable posts
            res.render('layout', {template: 'home', posts: posts});
    });
}