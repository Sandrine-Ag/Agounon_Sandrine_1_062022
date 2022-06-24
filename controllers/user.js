//Importation du package de cryptage pour les mots de passe
const bcrypt = require('bcrypt');

//Importation du package jsonwebtoken
const jwt = require('jsonwebtoken');

// On a besoin de notre modèle User pour enrégistrer et lire des users dans ces middlewares
const User = require('../models/User');

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
           .then(() => res.status(201).json({message: 'Utilisateur créé '}))
           .catch(error => res.status(400).json({error}));
   })
   .catch(error => res.status(500).json({error}));
};

// La fonction login pour connecter des users existants
exports.login = (req, res, next) => {
    // adresse mail correspond à l'adresse mail envoyée dans la requête
    User.findOne({email: req.body.email})
        .then(user => {
            // si on ne trouve pas de User
            if (!user) {
                return res.status(401).json({error: "Utilisateur non trouvé !"});   
            }
            //la fonction compare pour comparer le mot de passe envoyé 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // si le mot de passe ne correspond pas
                    if (!valid) {
                        return res.status(401).json({error: "Mot de passe incorrect !"})
                    }
                    // si oui
                    //identifiant de user dans la base renvoie son user id et son token d'identification
                    res.status(200).json({
                        userId: user._id,
                        // on utilise la fonction sign de jwt pour encoder un nouveau token
                        token: jwt.sign(
                            // ce nouveau token contient ID useren données encodées
                            {userId: user._id},
                            //on utilise ensuite une chaîne secrète pour encoder notre token
                            "RANDOM_TOKEN_SECRET",
                            // on accorde un delai (le User peut se reconnecter au bout de 24h)
                            {expiresIn: "24h"}
                        )
                    });
                })
                // problème de connexion lié à MongoDB
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};