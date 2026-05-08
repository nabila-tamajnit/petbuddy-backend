const tipService = require('../services/tip.service');

const tipController = {

    // GET /api/tips?species=cat
    // Renvoie des tips aléatoires pour une espèce
    getForSpecies: async (req, res) => {
        try {
            const { species } = req.query;

            const validSpecies = ['cat', 'dog', 'rabbit', 'bird', 'hamster', 'other', 'all'];

            if (!species || !validSpecies.includes(species)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Espèce invalide ou manquante'
                });
            }

            const tips = await tipService.findForSpecies(species);
            res.status(200).json({ count: tips.length, tips });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // GET /api/tips
    getAll: async (req, res) => {
        try {
            const tips = await tipService.findAll();
            res.status(200).json({ count: tips.length, tips });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    }
};

module.exports = tipController;