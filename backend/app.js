//Importation d'Express
const express = require('express');

//J'appel la méthode express ce qui va permettre de crée mon application express
const app = express();


//+++++++++++++ MIDDLEWARE +++++++++++++++++++

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