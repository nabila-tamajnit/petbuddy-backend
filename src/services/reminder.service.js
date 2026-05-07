const Reminder = require('../models/Reminder.model');

const reminderService = {

    // Tous les rappels d'un animal, triés par date d'échéance
    findByAnimal: async (animalId) => {
        return await Reminder.find({ animalId })
            .sort({ dueDate: 1 }); // croissant — le plus urgent en premier
    },

    // Tous les rappels en attente d'un user
    findPendingByUser: async (userId) => {
        return await Reminder.find({ userId, status: 'pending' })
            .sort({ dueDate: 1 })
            .populate('animalId', 'name species photo');
    },

    findById: async (reminderId) => {
        return await Reminder.findById(reminderId);
    },

    create: async (reminderData, animalId, userId) => {
        const reminder = new Reminder({
            ...reminderData,
            animalId,
            userId
        });
        await reminder.save();
        return reminder;
    },

    update: async (reminderId, updateData) => {
        return await Reminder.findByIdAndUpdate(
            reminderId,
            updateData,
            { new: true }
        );
    },

    // Marquer comme fait
    markAsDone: async (reminderId) => {
        return await Reminder.findByIdAndUpdate(
            reminderId,
            {
                status: 'done',
                completedAt: new Date()
            },
            { new: true }
        );
    },

    delete: async (reminderId) => {
        await Reminder.findByIdAndDelete(reminderId);
    }
};

module.exports = reminderService;