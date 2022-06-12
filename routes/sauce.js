// Importations
const express = require('express');
const router = express.Router();

const sauceControllers = require ('../controllers/sauce');

//Permet de protéger mes routes
const auth = require('../middleware/auth');
const multer = require('../middleware/auth');

const app = express();
app.use(express.json());

// Les differentes méthodes avec router
router.get("/", app, auth, sauceControllers.getAllSauces);
router.post("/", app, auth, multer, sauceControllers.createSauce);
router.get("/:id", app, auth, sauceControllers.getOneSauce);
router.put("/:id", app, auth, multer, sauceControllers.modifySauce);
router.delete("/:id", app, auth, sauceControllers.deleteSauce);
router.post("/:id/like", app, auth, sauceControllers.likeSauce);
  

module.exports = router;