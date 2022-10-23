// ++++++++++++++ MIDDLEWARE DE PROTECTION, VERIFICATION, D'AUTH +++++++++++++++++

// Importation de jsonwebtoken
const jwt = require('jsonwebtoken');


// Exportation du middleware de vérification d'authentification
module.exports = (req, res, next) => {
    // Utilisation de try/catch lié au nombreux problèmes pouvant survenir
    try {
        // Récupération du token du header Authozisation
        // Utilisation de la méthode split pour tout récupérer après l'espace dans le header
        const token = req.headers.authorization.split(' ')[1];
        // Utilisation de la méthode verify pour vérifier la validité du token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Récupération de l'ID utilisateur du token
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    } catch(error) {
        res.status(401).json({ error });
    }
}