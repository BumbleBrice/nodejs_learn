// Importer bcrypt, jwt et le modèle User
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from "../config/database.js";

// Fonction pour afficher le formulaire d'inscription
export const getSignupPage = (req, res) => {
    res.render('signup');
     // Assurez-vous que vous avez un fichier signup.ejs dans votre dossier de vues
};

// Fonction pour gérer l'inscription
export const signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const email = req.body.email;
            const passwordHash = hash;
            
            // Insérer l'utilisateur dans la base de données SQL
            const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
            pool.query(query, [email, passwordHash], (error, results, fields) => {
                if (error) {
                    return res.render('signup', { error: 'Erreur lors de l\'inscription de l\'utilisateur dans la base de données !' });
                }
                // Rediriger vers la page de connexion après l'inscription
                res.redirect('/login');
            });
        })
        .catch(error => res.render('signup', { error: error.message }));
};

// Fonction pour afficher le formulaire de connexion
export const getLoginPage = (req, res) => {
    res.render('login'); 
};

// Assurez-vous que vous avez un fichier login.ejs dans votre dossier de vues
// Fonction pour gérer la connexion
export const login = (req, res, next) => {
   const { email, password } = req.body;

  // Vérifiez les champs email et mot de passe
  if (!email || !password) {
    return res.status(400).send('Veuillez saisir un email et un mot de passe.');
  }

  // Requête MySQL pour récupérer l'utilisateur avec l'email spécifié
  pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche de l\'utilisateur dans la base de données :', err);
      return res.status(500).send('Erreur interne du serveur');
    }

    // Vérifiez si l'utilisateur existe
    if (results.length === 0) {
      return res.status(401).send('Email ou mot de passe incorrect.');
    }

    // Vérifiez le mot de passe en utilisant bcrypt
    bcrypt.compare(password, results[0].password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error('Erreur lors de la comparaison des mots de passe :', bcryptErr);
        return res.status(500).send('Erreur interne du serveur');
      }

      if (!bcryptResult) {
        return res.status(401).send('Email ou mot de passe incorrect.');
      }

      // Générez un token JWT pour l'authentification
      const token = jwt.sign({ userId: results[0].id }, 'votre_secret_jwt', { expiresIn: '1h' });
      res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

      // Vous pouvez rediriger vers une page de tableau de bord ou simplement envoyer le token ici
/*      res.send({ token });*/
      res.redirect('/admin');
    });
  });
}