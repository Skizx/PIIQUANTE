// Importation d'Express, controller user
const express = require('express');
const userCtrl = require('../controllers/user');

// Création du routeur
const router = express.Router();

// Création des routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


// Exportation du routeur
module.exports = router;