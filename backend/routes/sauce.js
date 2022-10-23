// Importation d'Express, SauceSchema, middleware auth
const express = require('express');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

// Création du routeur Express
const router = express.Router();

// Importation du middleware auth permettant de proteger, verifier les routes
router.post("/", auth, sauceCtrl.createSauce)
router.put('/:id', auth, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getAllSauces)

// Exportation du router
module.exports = router;