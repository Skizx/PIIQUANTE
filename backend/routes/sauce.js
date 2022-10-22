// Importation d'Express, SauceSchema
const express = require('express');
const sauceCtrl = require('../controllers/sauce');
// Création du routeur Express
const router = express.Router();

router.post("/", sauceCtrl.createSauce)
router.put('/:id', sauceCtrl.modifySauce)
router.delete('/:id', sauceCtrl.deleteSauce)
router.get('/:id', sauceCtrl.getOneSauce)
router.get('/', sauceCtrl.getAllSauces)

// Exportation du router
module.exports = router;