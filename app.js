// Importation de l'application express
const express = require ('express');

//Importation de package mongoose 
const mongoose = require('mongoose');

// Importation de router 
const userRoutes = require('./routes/user');

// la fonction de connexion à MongoDB
mongoose.connect('mongodb+srv://sandrine:9095Tcha@myfirstdatabase.lm0bw.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


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

// On enrégistre les routes en ajoutant un app.use et la route attendu par le frontend
app.use("/api/auth", userRoutes);

module.exports = app;