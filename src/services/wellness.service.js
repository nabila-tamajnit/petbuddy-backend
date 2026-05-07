const WellnessLog = require('../models/WellnessLog.model');

const wellnessService = {

    // Tous les logs d'un animal, du plus récent au plus ancien
    findByAnimal: async (animalId) => {
        return await WellnessLog.find({ animalId })
            .sort({ date: -1 });
    },

    // Un log par son ID
    findById: async (logId) => {
        return await WellnessLog.findById(logId);
    },

    // Vérifier si un log existe déjà pour cet animal ce jour-là (un seul log par animal par jour)
    findByAnimalAndDate: async (animalId, date) => {
        // plage de 24h 
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return await WellnessLog.findOne({
            animalId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });
    },

    // Création d'un nouveau log
    create: async (logData, animalId, userId) => {
        const log = new WellnessLog({
            ...logData,
            animalId,
            userId
        });
        await log.save();
        return log;
    },

    // Mise à jour d'un log existant
    update: async (logId, updateData) => {
        return await WellnessLog.findByIdAndUpdate(
            logId,
            updateData,
            { new: true }
        );
    },

    // Suppression définitive
    delete: async (logId) => {
        await WellnessLog.findByIdAndDelete(logId);
    }
};

module.exports = wellnessService;