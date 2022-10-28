// Importation d'Express, SauceSchema, middleware auth, middleware multer
const express = require('express');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création du routeur Express
const router = express.Router();

// Importation du middleware auth permettant de proteger, verifier les routes
// Importation du middleware multer-config
router.post("/", auth, multer, sauceCtrl.createSauce)
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getAllSauces)
router.post('/:id/like', auth, multer, sauceCtrl.likeDislike)

// Exportation du router
module.exports = router;