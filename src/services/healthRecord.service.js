const HealthRecord = require('../models/HealthRecord.model');

const healthRecordService = {

    // Tous les records d'un animal, triés par date décroissante
    findByAnimal: async (animalId) => {
        return await HealthRecord.find({ animalId })
            .sort({ date: -1 });
    },

    // Un record par son ID
    findById: async (recordId) => {
        return await HealthRecord.findById(recordId);
    },

    // Création d'un nouveau record
    create: async (recordData, animalId, userId) => {
        const record = new HealthRecord({
            ...recordData,
            animalId,
            userId
        });
        await record.save();
        return record;
    },

    // Mise à jour
    update: async (recordId, updateData) => {
        return await HealthRecord.findByIdAndUpdate(
            recordId,
            updateData,
            { new: true }
        );
    },

    // Suppression définitive
    delete: async (recordId) => {
        await HealthRecord.findByIdAndDelete(recordId);
    }
};

module.exports = healthRecordService;