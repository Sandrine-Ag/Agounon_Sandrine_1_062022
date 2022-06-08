const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // on récupère le token du header
        // la fonction split pour récupérer tout après l'espace dans le header.
        const token = req.headers.authorization.split(" ")[1];      
        // la fonction verify pour décodage du token
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");       
        // on récupère ID user du token
        const userId = decodedToken.userId;
        // comparaison entre Id user et ID user extrait du token
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée !" });
    }
};