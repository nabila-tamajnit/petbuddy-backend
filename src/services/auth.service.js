const argon2 = require('argon2');
const User = require('../models/User.model');

const authService = {

    // Vérifier si un email existe déjà en base
    emailAlreadyExists: async (email) => {
        const user = await User.findOne({ email });
        return !!user; // transforme en boolean : null → false, user → true
    },

    // Créer un nouvel utilisateur
    create: async (userData) => {
        // On hash le password AVANT de toucher à la base
        const hashedPassword = await argon2.hash(userData.password);

        const user = new User({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: hashedPassword
            // pas d'avatar? → null par défaut
        });

        await user.save();
        return user;
    },

    // Vérifie les credentials au login
    findByCredentials: async (email, password) => {
        // On cherche le user par email
        const user = await User.findOne({ email });

        // Pas de user avec cet email → échec silencieux
        if (!user) return null;

        // On compare le password reçu avec le hash en base
        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) return null;

        return user;
    }
};

module.exports = authService;