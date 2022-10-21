//Importation d'Express, Mongoose
const express = require('express');
const mongoose = require('mongoose')

//J'appel la méthode express ce qui va permettre de crée mon application express
const app = express();

//Je connecte mon API à ma base de données
mongoose.connect('mongodb+srv://Skizx:sarcelles95@cluster0.s6td80d.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

//+++++++++++++ MIDDLEWARE +++++++++++++++++++

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

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  app.use((req, res, next) => {
    res.status(201);
    next();
  });
  
  app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });


//J'exporte cette application pour pouvoir y acceder depuis mon serveur node
module.exports = app;