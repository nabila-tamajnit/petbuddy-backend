const reminderService = require('../services/reminder.service');
const animalService = require('../services/animal.service');

const findReminderAndCheckOwnership = async (reminderId, userId, res) => {
    const reminder = await reminderService.findById(reminderId);

    if (!reminder) {
        res.status(404).json({ statusCode: 404, message: 'Rappel introuvable' });
        return null;
    }

    if (reminder.userId.toString() !== userId) {
        res.status(403).json({ statusCode: 403, message: 'Accès refusé' });
        return null;
    }

    return reminder;
};

const reminderController = {

    // GET /api/animals/:animalId/reminders
    getAll: async (req, res) => {
        try {
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

            const reminders = await reminderService.findByAnimal(
                req.params.animalId
            );
            res.status(200).json({ count: reminders.length, reminders });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // GET /api/reminders/pending
    getPending: async (req, res) => {
        try {
            const reminders = await reminderService.findPendingByUser(req.user.id);
            res.status(200).json({ count: reminders.length, reminders });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // POST /api/animals/:animalId/reminders
    create: async (req, res) => {
        try {
            const { type, title, dueDate } = req.body;

            if (!type || !title || !dueDate) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Le type, le titre et la date sont obligatoires'
                });
            }

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

            const reminder = await reminderService.create(
                req.body,
                req.params.animalId,
                req.user.id
            );

            res.status(201).json(reminder);
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

    // PUT /api/animals/:animalId/reminders/:id
    update: async (req, res) => {
        try {
            const reminder = await findReminderAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!reminder) return;

            const updated = await reminderService.update(req.params.id, req.body);
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

    // PATCH /api/animals/:animalId/reminders/:id/done
    markAsDone: async (req, res) => {
        try {
            const reminder = await findReminderAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!reminder) return;

            if (reminder.status === 'done') {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Ce rappel est déjà marqué comme fait'
                });
            }

            const updated = await reminderService.markAsDone(req.params.id);
            res.status(200).json(updated);
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    },

    // DELETE /api/animals/:animalId/reminders/:id
    delete: async (req, res) => {
        try {
            const reminder = await findReminderAndCheckOwnership(
                req.params.id,
                req.user.id,
                res
            );
            if (!reminder) return;

            await reminderService.delete(req.params.id);
            res.status(200).json({ message: 'Rappel supprimé avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ statusCode: 500, message: 'Erreur serveur' });
        }
    }
};

module.exports = reminderController;