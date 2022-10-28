//Importation d'Express, Mongoose, Routeurs, path, rateLimit
const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const rateLimit = require('express-rate-limit');

//
require('dotenv').config();

//J'appel la méthode express ce qui va permettre de crée mon application express
const app = express();

//Je connecte mon API à ma base de données
mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

//+++++++++++++ MIDDLEWARE +++++++++++++++++++

// Création du middleware de limitant les tentatives de connexion par utilisateur
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limite de 100 tentatives
  standardHeaders: true, // Retourne les informations dans le RateLimit Header
  legacyHeaders: false, // Desactive X-Ratelimit headers
});
// Appication du middleware limitant les tentatives de connexion
app.use('/api', limiter);
// Intercèpte tout les requêtes json et les mets à disposition dans req.body
app.use(express.json());

//+++++++++++++ CORS +++++++++++++++++++
app.use((req, res, next) => {
  // L'origine pouvant acceder à l'API sera "*" Tout le monde
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Je donne l'autorisation d'utiliser certain en-tête
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Ainsi que sur certaine méthode "Verbe de requête"
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// J'importe le routeur exporté par sauce.js
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//J'exporte cette application pour pouvoir y acceder depuis mon serveur node
module.exports = app;