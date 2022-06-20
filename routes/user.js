// On a besoin d'express pour créer un router
const express = require('express');

//On crée router avec la fonction router d'express
const router = express.Router();

// On associe les fonctions aux différentes routes 
const userController = require('../controllers/user');

// On crée des routes post avec la fonction signup et login
// frontend va envoyer des informations vers l'adresse mail et le password
// On utilise donc la methode post
router.post('/signup',  userController.signup);
router.post('/login',  userController.login);

// On exporte le router
module.exports = router;