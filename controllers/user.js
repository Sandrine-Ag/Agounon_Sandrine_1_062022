// On a besoin de notre modèle User pour enrégistrer et lire des users dans ces middlewares
const User = require('../models/User');

// on a besoin du package de cryptage 
//Importation du package de cryptage pour les mots de passe
const bcrypt = require('bcrypt');

// La fonction signup pour création de nouveaux users dans la base de données
exports.signup = (req, res, next) => {
    // on crypte en lui passant le mot de passe du corps de la requête aui sera passé par le frontend
    // combien de fois on exécute l'algorithme de hachage(10 tours)
     bcrypt.hash(req.body.password, 10)
    //  on récupère le hash de notre mot de passe
     .then(hash => { 
       //on enrégistre dans un nouveau user dans la base de données avec notre modèle mongoose
        const user = new User({
            //on passe l'adresse dans le corps de la requête
            email: req.body.email,
            // on enrégistre le mot de passe haché
            password: hash
       });
       //Enregistrement du user dans la base de données
       user.save()
           .then(() => res.status(201).json({message: "Utilisateur créé !"}))
           .catch(error => res.status(400).json({error}));
   })
   .catch(error => res.status(500).json({error}));
};

// La fonction login pour connecter des users existants
exports.login = (req, res, next) => {
    
};