const jwtUtils = require('../utils/jwt.utils');

const authenticationMiddleware = () => {
    return async (req, res, next) => {

        // Le token arrive dans le header Authorization
        // Format attendu : "Bearer eyJhbGc..."
        const authorization = req.headers.authorization;

        // Pas de header Authorization → non connecté
        if (!authorization) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Vous devez être connecté'
            });
        }

        // On découpe "Bearer eyJhbGc..." pour isoler le token
        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Token manquant'
            });
        }

        // On tente de décoder le token
        try {
            const payload = await jwtUtils.decode(token);

            // On attache le payload à la requête
            // Toutes les routes protégées pourront faire req.user.id
            req.user = payload;

            next(); // tout est bon, on continue
        } catch (err) {
            // Token expiré, modifié ou invalide
            return res.status(401).json({
                statusCode: 401,
                message: 'Session invalide ou expirée, veuillez vous reconnecter'
            });
        }
    };
};

module.exports = authenticationMiddleware;