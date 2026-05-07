const animalService = require('../services/animal.service');
const HealthRecord = require('../models/HealthRecord.model');
const WellnessLog = require('../models/WellnessLog.model');
// const Reminder = require('../models/Reminder.model');

// Vérifie que l'animal existe ET appartient au user connecté
const findAnimalAndCheckOwnership = async (animalId, userId, res) => {
    const animal = await animalService.findById(animalId);

    if (!animal) {
        res.status(404).json({ statusCode: 404, message: 'Animal introuvable' });
        return null;
    }

    if (animal.userId.toString() !== userId) {
        res.status(403).json({ statusCode: 403, message: 'Accès refusé' });
        return null;
    }

    return animal;
};

const animalController = {

    // GET /api/animals
    getAll: async (req, res) => {
        try {
            const animals = await animalService.findByUser(req.user.id);
            res.status(200).json({ count: animals.length, animals });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // GET /api/animals/:id
    getById: async (req, res) => {
        try {
            const animal = await findAnimalAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!animal) return;

            res.status(200).json(animal);
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // POST /api/animals
    create: async (req, res) => {
        try {
            const { name, species } = req.body;

            // Seuls name et species sont obligatoires
            if (!name || !species) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Le nom et l\'espèce sont obligatoires'
                });
            }

            const animal = await animalService.create(req.body, req.user.id);
            res.status(201).json(animal);
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    statusCode: 400,
                    message: err.message
                });
            }
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // PUT /api/animals/:id
    update: async (req, res) => {
        try {
            const animal = await findAnimalAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!animal) return;

            const updated = await animalService.update(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    statusCode: 400,
                    message: err.message
                });
            }
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // DELETE /api/animals/:id
    delete: async (req, res) => {
        try {
            const animal = await findAnimalAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!animal) return;

            await animalService.softDelete(req.params.id);
            res.status(200).json({ message: 'Animal archivé avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // PATCH /api/animals/:id/restore
    restore: async (req, res) => {
        try {
            // On cherche l'animal même s'il est inactif
            const animal = await animalService.findById(req.params.id);

            if (!animal) {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Animal introuvable'
                });
            }

            if (animal.userId.toString() !== req.user.id) {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'Accès refusé'
                });
            }

            if (animal.isActive) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Cet animal n\'est pas archivé'
                });
            }

            const restored = await animalService.restore(req.params.id);
            res.status(200).json({
                message: 'Animal restauré avec succès',
                animal: restored
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // DELETE définitif /api/animals/:id/permanent
    permanentDelete: async (req, res) => {
        try {
            const animal = await findAnimalAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!animal) return;

            // Supprimer aussi toutes les données liées à cet animal
            const HealthRecord = require('../models/HealthRecord.model');
            const WellnessLog = require('../models/WellnessLog.model');
            // const Reminder = require('../models/Reminder.model');

            await HealthRecord.deleteMany({ animalId: req.params.id });
            await WellnessLog.deleteMany({ animalId: req.params.id });
            // await Reminder.deleteMany({ animalId: req.params.id });
            await animal.deleteOne();

            res.status(200).json({
                message: 'Animal et toutes ses données supprimés définitivement'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    }
};

module.exports = animalController;