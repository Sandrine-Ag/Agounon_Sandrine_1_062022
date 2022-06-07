// Importation de l'application express
const express = require ('express');

// La fonction de CORS pour gérer la double origine
app.use((req, res, next) => {
    // Cette réponse nous permet d'accéder à API par n'importe l'origine
    res.setHeader('Access-Control-Allow-Origin', '*');
      // Cette réponse nous permet d'ajouter des headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      // Cette réponse nous permet d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
      next();
  }); 
  
const app = express ();




app.use(express.json());

module.exports = app;