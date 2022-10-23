// Importation du model User, Bcrypt, jsonwebtoken
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Création middleware Signup pour l'enregistrement de l'utilisateur
exports.signup = (req, res, next) => {
    // Cryptage du mot de passe
    // Utilisateur de la méthode hash de bcrypt qui crée un hash crypté des mots de passe
    bcrypt.hash(req.body.password, 10)
    // Récupération du mot de passe crypter pour crée un nouvel User avec ce mot de passe crypter
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // Enregistrement de l'utilisateur dans la base de données
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Création middleware login pour connecter un utilisateur existant
exports.login = (req, res, next) => {
    // Vérification si l'utilisateur est enregistrer dans les bases de données
    User.findOne({email: req.body.email})
    .then(user => {
        // Si NON renvoie une erreur 401
        if (user === null) {
            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte !'})
        // Si OUI nous continuons
        } else {
            // Verification du mot de passe transmis par l'utilisateur
            // Utilisation de la méthode compare() de bcrypt pour comparer le mot de passe entrer par l'utilisateur 
            // avec le hash enregistré dans la base de données
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                // Si le mot de passe ne correspond pas alors retourne une erreur
                if (!valid) {
                    res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte !'})
                } else {
                // Si il correspond renvoie une réponse contenant l'ID de l'utilisateur ainsi que le token
                    res.status(200).json({ 
                        userId: user._id,
                        // Appel la fonction sign de jswebtoken permettant de chiffrer un nouveau token 
                        token: jwt.sign(
                            // Encodage du userId pour la création d'objet ne devant pas être modifiable par d'autres utilisateurs
                            { userId: user._id },
                            // Clé secrete pour l'encodage
                            'RANDOM_TOKEN_SECRET',
                            // Durée de validité du token avant expiration
                            { expiresIn: '24h' }
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
};