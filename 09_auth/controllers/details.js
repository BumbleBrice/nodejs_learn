import pool from "../config/database.js";

export const Details =  (req, res) => {
   // il y a plusieurs article on récupère un paramètre id dans l'url pour pouvoir executer la bonne requête sql en fonction du bon article
	let id = req.params.id;

	let sql = 'SELECT articles.id, title, description, date, name, path, alt FROM articles INNER JOIN category ON articles.category_id = category.id LEFT JOIN images ON images.article_id = articles.id WHERE  articles.id = ?';

	let sql2 = 'SELECT * FROM comments WHERE article_id = ?';
	// !!!! attention on ne met jamais de variable dans la requête sql, risque d'injection sql
	// on fait passer les variable dans un tableau la methode query du module mysql 
	// va analyser les data à l'interieur de la varaible pour s'assurer qu'il n'y a pas de requete malveillante
	pool.query(sql, [id], function (error, post, fields) {
         console.log(error);
	     console.log(post)
	    pool.query(sql2, [id], function (error, comments, fields) {
        
	        console.log(comments)
	        res.render('layout', {template: 'article', post: post[0], comments: comments});
	 	});
	 });
}

export const AddComment =  (req, res) => {
    let id = req.params.id;
	let sql = 'INSERT INTO comments (pseudo, comment, article_id) VALUES (?, ?, ?)';
	pool.query(sql, [req.body.pseudo, req.body.content, id], function (error, result, fields) {
        console.log(error);
	        console.log(result)
	        res.redirect('/article/'+id);
	 });
}

