// Importation de package de chiffrement 
const { hash } = require('bcrypt');

// Importation de package mongoose
const mongoose = require ('mongoose');

// Ce package évite d'avoir plusieurs utilisateurs avec la même adresse email
const uniqueValidator = require ('mongoose-unique-validator')

//Modèle d'utilisateurs
const userSchema = mongoose.Schema ({
    //on utilise la fonction schéma de mongoose
    email: { type: String, required:true, unique:true},
    password: { type : String, required:true }
})

userSchema.plugin(uniqueValidator);
// Exportation du schéma avec la methode model de mongoose
module.exports = mongoose.model('User', userSchema);
