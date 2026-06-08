const Animal = require('../models/Animal.model');

const animalService = {

    // Récupèrer tous les animaux actifs d'un user
    findByUser: async (userId) => {
        return await Animal.find({ userId, isActive: true })
            .sort({ createdAt: -1 }); // plus récent en premier
    },

    // Récupérer un animal par son ID
    findById: async (animalId) => {
        return await Animal.findById(animalId);
    },

    // Créer un nouvel animal
    create: async (animalData, userId) => {
        const animal = new Animal({ ...animalData, userId });
        await animal.save();
        return animal;
    },

    // Mettre à jour un animal
    update: async (animalId, updateData) => {
        return await Animal.findByIdAndUpdate(
            animalId,
            updateData,
            { new: true } // renvoie le document APRÈS modification
        );
    },

    // passe isActive à false
    softDelete: async (animalId) => {
        return await Animal.findByIdAndUpdate(
            animalId,
            { isActive: false },
            { new: true }
        );
    },

    // Récupère les animaux archivés d'un user
    findArchivedByUser: async (userId) => {
        return await Animal.find({ userId, isActive: false })
            .sort({ updatedAt: -1 });
    },

    // Restaure un animal archivé
    restore: async (animalId) => {
        return await Animal.findByIdAndUpdate(
            animalId,
            { isActive: true },
            { new: true }
        );
    }
};

module.exports = animalService;