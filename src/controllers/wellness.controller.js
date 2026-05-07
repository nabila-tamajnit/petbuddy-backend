const wellnessService = require('../services/wellness.service');
const animalService = require('../services/animal.service');

// Vérifier ownership du log
const findLogAndCheckOwnership = async (logId, userId, res) => {
    const log = await wellnessService.findById(logId);

    if (!log) {
        res.status(404).json({ statusCode: 404, message: 'Log introuvable' });
        return null;
    }

    if (log.userId.toString() !== userId) {
        res.status(403).json({ statusCode: 403, message: 'Accès refusé' });
        return null;
    }

    return log;
};

// Vérifier ownership de l'animal parent
const checkAnimalOwnership = async (animalId, userId, res) => {
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

const wellnessController = {

    // GET /api/animals/:animalId/wellness
    getAll: async (req, res) => {
        try {
            const animal = await checkAnimalOwnership(
                req.params.animalId,
                req.user.id,
                res
            );
            if (!animal) return;

            const logs = await wellnessService.findByAnimal(req.params.animalId);
            res.status(200).json({ count: logs.length, logs });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // GET /api/animals/:animalId/wellness/:id
    getById: async (req, res) => {
        try {
            const log = await findLogAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!log) return;

            res.status(200).json(log);
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // POST /api/animals/:animalId/wellness
    create: async (req, res) => {
        try {
            const { date } = req.body;

            if (!date) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'La date est obligatoire'
                });
            }

            const animal = await checkAnimalOwnership(
                req.params.animalId,
                req.user.id,
                res
            );
            if (!animal) return;

            // un seul log par jour par animal
            const existingLog = await wellnessService.findByAnimalAndDate(
                req.params.animalId,
                date
            );

            if (existingLog) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Un log existe déjà pour cet animal aujourd\'hui',
                    existingLogId: existingLog._id
                });
            }

            const log = await wellnessService.create(
                req.body,
                req.params.animalId,
                req.user.id
            );

            res.status(201).json(log);
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

    // PUT /api/animals/:animalId/wellness/:id
    update: async (req, res) => {
        try {
            const log = await findLogAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!log) return;

            const updated = await wellnessService.update(req.params.id, req.body);
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

    // DELETE /api/animals/:animalId/wellness/:id
    delete: async (req, res) => {
        try {
            const log = await findLogAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!log) return;

            await wellnessService.delete(req.params.id);
            res.status(200).json({ message: 'Log supprimé avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    }
};

module.exports = wellnessController;