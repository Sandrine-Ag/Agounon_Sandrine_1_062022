// Importations
const express = require('express');
const router = express.Router();

const sauceControllers = require ('../controllers/sauce');

//Permet de protéger mes routes
const auth = require('../middleware/auth');
const multer = require('../middleware/auth');

// Les differentes méthodes avec router
router.get("/", auth, sauceControllers.getAllSauces);
router.post("/", auth, multer, sauceControllers.createSauce);
router.get("/:id", auth, sauceControllers.getOneSauce);
router.put("/:id", auth, multer, sauceControllers.modifySauce);
router.delete("/:id", auth, sauceControllers.deleteSauce);
// router.post("/:id/like", auth, sauceControllers.likeSauce);
  

module.exports = router;