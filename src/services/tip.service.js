const Tip = require('../models/Tip.model');

const tipService = {

    // Récupérer des tips aléatoires pour une espèce donnée
    findForSpecies: async (species, limit = 3) => {
        return await Tip.aggregate([
            // Filtre : tips actifs pour cette espèce OU universels
            {
                $match: {
                    isActive: true,
                    species: { $in: [species, 'all'] }
                }
            },
            // Mélange aléatoire et limite le nombre de résultats
            { $sample: { size: limit } }
        ]);
    },

    // Tous les tips
    findAll: async () => {
        return await Tip.find({ isActive: true }).sort({ species: 1 });
    }
};

module.exports = tipService;