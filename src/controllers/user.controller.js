const userService = require('../services/user.service');

const userController = {

    // GET /api/users/me
    getMe: async (req, res) => {
        try {
            // On prend TOUJOURS l'id depuis le token, jamais depuis l'URL
            // C'est ce qui empêche un user d'accéder au profil d'un autre
            const user = await userService.findById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Utilisateur introuvable'
                });
            }

            res.status(200).json(user);

        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // DELETE /api/users/me
    deleteAccount: async (req, res) => {
        try {
            await userService.deleteAccount(req.user.id);

            res.status(200).json({
                message: 'Compte supprimé avec succès'
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    }
};

module.exports = userController;