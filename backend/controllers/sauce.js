// Importation de SauceSchema, FS
const Sauce = require('../models/Sauce');
const fs = require('fs');

// Créer une sauce
exports.createSauce = (req, res, next) => {
    // Je stock les données envoyées par le frontend dans une variable en les transformant en objets format json
    const sauceObject = JSON.parse(req.body.sauce)
    // Je supprime l'id envoyé par le frontend, l'id est crée par la base MongoDB lors de la création sa création 
    delete sauceObject._id
    // Création de l'instance modèle Sauce
    const sauce = new Sauce ({
        ...sauceObject,
        // Je modifie l'URL complète de l'image 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    // Utilisation de la méthode save pour sauvegarder la sauce dans la base de données 
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    Sauce.findOne({ _id: req.params.id}).then((sauce) => {
        // Je supprime l'ancienne image du serveur
        const filename = sauce.imageUrl.split('/images')[1]
        fs.unlinkSync(`images/${filename}`)
    })
    
    // J'applique les paramètres sauceObject
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce Modifié !'}))
    .catch(error => res.status(401).json({ error }));
}

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    // Je cherche l'objet afin d'obtenir l'URL de l'image afin de la supprimer également
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]
            // J'appelle unlink pour supprimer le fichier
            fs.unlink(`images/${filename}`, () => {
                // Je supprimer l'objet de la base de données
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error: error }))
            })
        })
        .catch(error => res.status(500).json({ error }));
};

// Afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
    // Utilisation de la méthode find pour récupérer la liste compléte des objets présent dans la base de données 
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Afficher une seule sauce
exports.getOneSauce = (req, res, next) => {
    // Utilisation de la méthode findOne pour recupérer l'id de l'objet en la comparant à l'id du parametre de requête
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error: error }));
};

// Like & Dislike
exports.likeDislike = (req, res, next) => {
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, {$inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
        .then(() => res.status(200).json({ message: 'Like ajoutée !'}))
        .catch(error => res.status(400).json({ error }))
    } else if (req.body.like === -1) {
        Sauce.updateOne({ _id: req.params.id}, { $inc: { likes: req.body.like-- }, $push: { usersDisliked: req.body.userId } })
        .then(() => res.status(200).json({ message: 'Like enlevé !' }))
        .catch(error => res.status(400).json({ error }))
    } else { 
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.usersLiked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes : -1 } })
                .then(() => res.status(200).json({ message: 'Like supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            } else if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                .then(() => res.status(200).json({ message: 'Dislike supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
    }
}