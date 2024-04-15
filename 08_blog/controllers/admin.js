import pool from "../config/database.js";
import formidable from 'formidable';
import fs from 'fs';


export const Admin =  (req, res) => {
    let sql = 'SELECT articles.id, title, description, articles.date, category.name AS Category_Name, path, alt FROM articles INNER JOIN category ON articles.category_id = category.Id LEFT JOIN images ON images.article_id = articles.id ORDER BY articles.date DESC';

	pool.query(sql, function (error, posts, fields) {
        
	        res.render('layout', {template: 'admin', posts: posts});
	});

}

export const AddPost = (req, res) => {
    
        // récupération des catégories depuis la bdd
        pool.query('SELECT * FROM category', function (error, categories, fields) {

	        // appel du template layout avec add_post où on fait passer les infos auteurs et catégories
	        res.render('layout', { template: 'add_post',categories: categories });
	    });
}


export const AddPostSubmit = (req, res) => {
	
    const form = formidable();

	form.parse(req, (err, fields, files) => {

		let oldPath = files.image.filepath;
		let newPath = 'public/img/' + files.image.originalFilename;
		let pathBdd = 'img/' + files.image.originalFilename;

		fs.copyFile(oldPath, newPath, (err)=> {
			if(err) throw err;

			pool.query('INSERT INTO articles (title, description, category_id, date) VALUES (?, ?, ?, NOW())', [fields.title, fields.content, fields.category ], function (error, result, fields2) {
				let id = result.insertId;
				
				pool.query('INSERT INTO images (path, alt, article_id) VALUES (?,?,?)',[pathBdd,fields.title,id], (error, result, fields3) => {
					// une fois le post créé en BDD on redirige vers la page / (home)
					res.redirect('/admin');
				})
				
			});
		})

		
	})
}


export const DeletePost = (req, res) => {
    
	//on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.params.id;

	// requete de suppresion en BDD
	let sql = 'DELETE FROM articles WHERE id = ?';

	pool.query(sql, [id], function (error, result, fields) {
        
	        // redirection vers admin une fois effectué
	        res.redirect('/admin');
	});
}

export const EditPost = (req, res) => {
    
	let id = req.params.id;

	// on récupère déjà l'ancien article 
	let sql = 'SELECT * FROM articles WHERE id = ?';

	pool.query(sql, [id], function (error, post, fields) {

	        // appel du template pour édition de post
	        res.render('layout', {template: 'edit_post', post: post[0]});
	 });
}

export const EditPostSubmit = (req, res) => {
    
	let id = req.params.id;

	// requete de modification d'un post
	let sql = 'UPDATE articles SET title = ?, description = ? WHERE id = ?';

	pool.query(sql, [req.body.title, req.body.content, id], function (error, result, fields) {

	        res.redirect('/admin');
	 });
}