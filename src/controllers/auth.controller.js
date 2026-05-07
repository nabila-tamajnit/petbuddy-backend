const authService = require('../services/auth.service');
const jwtUtils = require('../utils/jwt.utils');

const authController = {

    // POST /api/auth/register
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            // Validation des champs obligatoires
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Tous les champs sont obligatoires'
                });
            }

            // Validation basique du format email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Format d\'email invalide'
                });
            }

            // Validation longueur password
            if (password.length < 8) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Le mot de passe doit contenir au moins 8 caractères'
                });
            }

            // Vérification unicité email
            const emailExists = await authService.emailAlreadyExists(email);
            if (emailExists) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Cet email est déjà utilisé'
                });
            }

            // Création du user
            const newUser = await authService.create({ firstName, lastName, email, password });

            // On génère directement un token → l'utilisateur est connecté après inscription
            const token = await jwtUtils.generate(newUser);

            // On renvoie uniquement ce dont le frontend a besoin
            // ⚠️ JAMAIS le password, même hashé
            res.status(201).json({
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                token
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // POST /api/auth/login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Email et mot de passe obligatoires'
                });
            }

            // Vérification des credentials
            const user = await authService.findByCredentials(email, password);

            if (!user) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Email ou mot de passe incorrect'
                });
            }

            const token = await jwtUtils.generate(user);

            res.status(200).json({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    }
};

module.exports = authController;