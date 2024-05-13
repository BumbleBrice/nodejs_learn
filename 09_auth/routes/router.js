import express from "express";
import pool from "../config/database.js";

const router = express.Router();

//appel des controllers
import HomeController from "../controllers/home.js";
import { Details, AddComment } from "../controllers/details.js";
import { AddPost, AddPostSubmit, Admin, DeletePost, EditPost, EditPostSubmit } from "../controllers/admin.js";
import { getSignupPage, signup, getLoginPage, login } from '../controllers/user.js';

//middleware
import AuthJWT from "../middleware/auth.js";


//liste des routes

//HOME PAGE
router.get('/', HomeController);

//ADMIN PAGE
router.get('/admin', AuthJWT, Admin);

//ADD POST PAGE
router.get('/add_post', AddPost);

//ADD POST PAGE POST
router.post('/add_post', AddPostSubmit);

//DETAIL PAGE
router.get('/article/:id', Details);

//ADD COMMENTS
router.post('/add_comment/:id', AddComment);

//DELETE POST
router.get('/delete_post/:id', DeletePost);

//EDIT POST
router.get('/edit_post/:id', EditPost);

//EDIT POST SUBMIT
router.post('/edit_post/:id', EditPostSubmit);

// Route pour afficher le formulaire d'inscription
router.get('/signup', getSignupPage);

// Route pour gérer l'inscription
router.post('/signup', signup);

// Route pour afficher le formulaire de connexion
router.get('/login', getLoginPage);

// Route pour gérer la connexion
router.post('/login', login);


export default router;