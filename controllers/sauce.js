const Sauce = require('../models/sauce');
const fs = require ('fs')

// La fonction des routes
exports.createSauce = (req, res, next) => { 
    // on créé une sauce, on récupère son image, son id
    console.log(req.body);
    
    const sauceObject = JSON.parse(req.body.sauce);
    //on supprime le champ id du corps de la requête parce que mongoose génère déjà un id
    delete sauceObject._id;
    const sauce = new Sauce({
        //On copie les informations qui sont dans le corps de la requête
        ...sauceObject,
        //Génération de l'URL de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    });
    sauce.likes = 0;
    sauce.dislikes = 0;
    //Cette méthode save enregistre mon objet Sauce dans la base de données
    sauce.save()
        .then(() => res.status(201).json({message: "Sauce enregistrée !"}))
        .catch(error => res.status(400).json({error}));
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if (req.body.like == 1) {
                // si utilisateur n'existe pas 
                if (sauce.usersLiked.indexOf(req.body.userId) < 0) {
                    sauce.likes = sauce.likes + 1;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({message: "Like enregistré !"}))
                        .catch(error => res.status(400).json({error}));
                } 
            } else if (req.body.like == -1) {
                if (sauce.usersDisliked.indexOf(req.body.userId) < 0) {
                    sauce.dislikes = sauce.dislikes + 1;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({message: "Dislike enregistré !"}))
                        .catch(error => res.status(400).json({error}))
                }
            } else {
                //Si utilisateur existe :
                if (sauce.usersLiked.indexOf(req.body.userId) >= 0) {
                    sauce.likes = sauce.likes - 1;
                    sauce.usersLiked.splice(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({message: "Like supprimé !"}))
                        .catch(error => res.status(400).json({error}));
                } else if (sauce.usersDisliked.indexOf(req.body.userId) >= 0) {
                    sauce.dislikes = sauce.dislikes - 1;
                    sauce.usersDisliked.splice(req.body.userId);
                    sauce.save()
                        .then(() => res.status(201).json({message: "Dislike supprimé !"}))
                        .catch(error => res.status(400).json({error}))
                } 
            }
        })
        .catch(error => res.status(404).json({error}));   
};

exports.modifySauce = (req, res, next) => {
    // une sauce déjà créée par l'utilisateur
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : { ...req.body };
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    // on affiche un message si la modification a réussie
    .then(() => res.status(200).json({message: "Sauce modifiée !"}))
    .catch(error => res.status(404).json(error));
};

exports.deleteSauce = (req, res, next) => {
    // on utilise de id que nous recevons comme paramètre pour accéder sauce correspondant dans la base de données
    Sauce.findOne ({_id: req.params.id })
    .then(
        (sauce) => {
            const filename =sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: "Sauce supprimée !"}))
                .catch(error => res.status(400).json(error));
            });
        }
    )
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};