// Importation de Mongoose, Unique-validator
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création d'un schéma d'un modèle de base de données pour les informations utilisateurs
const userSchema = mongoose.Schema({
    // Unique rend impossible la possibilité de s'inscrire plusieurs fois avec la même adresse
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Application du validateur au schéma
userSchema.plugin(uniqueValidator);

// Exportation du schéma User
module.exports = mongoose.model('User', userSchema);