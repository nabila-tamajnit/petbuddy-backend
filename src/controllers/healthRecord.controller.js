const healthRecordService = require('../services/healthRecord.service');
const animalService = require('../services/animal.service');

// Vérifie que le record existe et appartient au user connecté
const findRecordAndCheckOwnership = async (recordId, userId, res) => {
    const record = await healthRecordService.findById(recordId);

    if (!record) {
        res.status(404).json({ statusCode: 404, message: 'Record introuvable' });
        return null;
    }

    if (record.userId.toString() !== userId) {
        res.status(403).json({ statusCode: 403, message: 'Accès refusé' });
        return null;
    }

    return record;
};

const healthRecordController = {

    // GET /api/animals/:animalId/health-records
    getAll: async (req, res) => {
        try {
            // On vérifie que l'animal appartient au user avant de lui montrer ses données de santé
            const animal = await animalService.findById(req.params.animalId);

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

            const records = await healthRecordService.findByAnimal(
                req.params.animalId
            );

            res.status(200).json({ count: records.length, records });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // GET /api/animals/:animalId/health-records/:id
    getById: async (req, res) => {
        try {
            const record = await findRecordAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!record) return;

            res.status(200).json(record);
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // POST /api/animals/:animalId/health-records
    create: async (req, res) => {
        try {
            const { type, date, title } = req.body;

            if (!type || !date || !title) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Le type, la date et le titre sont obligatoires'
                });
            }

            // Vérification ownership de l'animal
            const animal = await animalService.findById(req.params.animalId);

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

            const record = await healthRecordService.create(
                req.body,
                req.params.animalId,
                req.user.id
            );

            res.status(201).json(record);
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

    // PUT /api/animals/:animalId/health-records/:id
    update: async (req, res) => {
        try {
            const record = await findRecordAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!record) return;

            const updated = await healthRecordService.update(
                req.params.id,
                req.body
            );
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

    // DELETE /api/animals/:animalId/health-records/:id
    delete: async (req, res) => {
        try {
            const record = await findRecordAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!record) return;

            await healthRecordService.delete(req.params.id);
            res.status(200).json({ message: 'Record supprimé avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    }
};

module.exports = healthRecordController;