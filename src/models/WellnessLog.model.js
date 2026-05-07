const { Schema, model, Types } = require('mongoose');

const wellnessLogSchema = new Schema(
    {
        animalId: {
            type: Types.ObjectId,
            ref: 'Animal',
            required: true,
            index: true
        },

        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        date: {
            type: Date,
            required: true
        },

        mood: {
            type: String,
            enum: ['happy', 'calm', 'tired', 'stressed', 'sick', 'unknown'],
            default: 'unknown'
        },

        energyLevel: {
            type: Number,
            min: 1,
            max: 5,
            default: null
        },

        // Tableau d'activités journalières
        activities: {
            type: [String],
            default: []
        },

        // Durée totale des activités en minutes
        activityDuration: {
            type: Number,
            min: 0,
            default: null
        },

        appetite: {
            type: String,
            enum: ['normal', 'increased', 'decreased', 'refused', null],
            default: null
        },

        // Note libre
        note: {
            type: String,
            trim: true,
            default: null
        }
    },
    {
        collection: 'wellness_logs',
        timestamps: true
    }
);

const WellnessLog = model('WellnessLog', wellnessLogSchema);
module.exports = WellnessLog;