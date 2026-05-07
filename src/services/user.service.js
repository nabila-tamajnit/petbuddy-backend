const User = require('../models/User.model');
// const Animal = require('../models/Animal.model');
// const HealthRecord = require('../models/HealthRecord.model');
// const WellnessLog = require('../models/WellnessLog.model');
// const Reminder = require('../models/Reminder.model');

const userService = {

    // Récupèrer le profil d'un user (sans le password)
    findById: async (userId) => {
        const user = await User.findById(userId).select('-password');
        return user;
    },

    // Suppression du compte avec cascade sur les données liées
    deleteAccount: async (userId) => {

        // Étape 1 — toutes les données liées à ce user
        // await WellnessLog.deleteMany({ userId });
        // await HealthRecord.deleteMany({ userId });
        // await Reminder.deleteMany({ userId });
        // await Animal.deleteMany({ userId });

        // Étape 2 — le user lui-même
        await User.findByIdAndDelete(userId);
    }
};

module.exports = userService;