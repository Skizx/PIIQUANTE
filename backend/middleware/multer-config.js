// Importation de multer
const multer = require('multer');

// Dictionnaire des MIMETYPES
// Traduction des images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/pgn': 'pgn'
};

// Création de l'objet de configuration de multer
// Utilisation de la méthode diskStorage de multer pour l'enregistrer sur le disk
const storage = multer.diskStorage({
    // Indication de la déstination des fichiers pour multer
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Indication du nom de fichier à utiliser pour multer
    // Utilisation de la méthode split & join enlever les éspaces et les remplacer par des underscore
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        // Utilisation de MIME_TYPES
        const extension = MIME_TYPES[file.mimetype];
        // Utilisation de Date.now() pour ajouter un timestamp pour le rendre le plus unique possible
        callback(null, name + Date.now() + '.' + extension)
    }
});

// Exportation du middleware multer configurer
// Utilisation de la méthode single() capturant les fichiers d'un certain type(image)
// et les enregistre au système de fichiers du serveur
module.exports = multer({ storage }).single('image');