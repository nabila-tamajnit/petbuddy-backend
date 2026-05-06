const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

const jwtUtils = {

    // Génèrer un token à partir des données du user
    generate: (user) => {
        return new Promise((resolve, reject) => {

            // Ce qu'on met dans le token :
            // - id : pour identifier le user sur toutes les requêtes
            // - firstName : pour personnaliser l'UI sans requête DB
            // ⚠️  Jamais le password et données sensibles
            const payload = {
                id: user._id,
                firstName: user.firstName
            };

            const options = {
                algorithm: 'HS512',   // algorithme de signature
                expiresIn: '7d',      // token valide 7 jours
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER
            };

            jwt.sign(payload, JWT_SECRET, options, (err, token) => {
                if (err) return reject(err);
                resolve(token);
            });
        });
    },

    // Vérifier et décoder un token
    // Renvoie le payload si valide sinon rejette la promesse
    decode: (token) => {
        return new Promise((resolve, reject) => {
            if (!token) return reject(new Error('No token provided'));

            const options = {
                audience: JWT_AUDIENCE,
                issuer: JWT_ISSUER
            };

            jwt.verify(token, JWT_SECRET, options, (err, payload) => {
                if (err) return reject(err);
                resolve(payload);
            });
        });
    }
};

module.exports = jwtUtils;