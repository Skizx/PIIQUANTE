// Importation de Mongoose
const mongoose = require('mongoose');

// Création d'un Schéma de données contenant les champs souhaités selon "Data ModelsSauce"
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true, min: 1, max: 10 },
    likes: { type: Number, défault: 0, required: true },
    dislikes: { type: Number, défault: 0, required: true },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

// Exportation du schéma
module.exports = mongoose.model('Sauce', sauceSchema)