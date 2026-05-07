const { Schema, model, Types } = require('mongoose');

const healthRecordSchema = new Schema(
    {
        // Référencer vers l'animal concerné
        animalId: {
            type: Types.ObjectId,
            ref: 'Animal',
            required: true,
            index: true
        },

        // Permet de vérifier l'ownership sans charger l'animal
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        type: {
            type: String,
            required: true,
            enum: [
                'weight',
                'vaccine',
                'vet_visit',
                'medication',
                'symptom',
                'grooming',
                'deworming',
                'note'
            ]
        },

        date: {
            type: Date,
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            default: null
        },

        // Champs spécifiques selon le type
        value: {
            type: Number,
            default: null
        },

        unit: {
            type: String,
            enum: ['kg', 'g', null],
            default: null
        },

        // Utilisés pour les visites vétérinaires
        veterinarian: {
            type: String,
            trim: true,
            default: null
        },

        clinic: {
            type: String,
            trim: true,
            default: null
        },

        // Date du prochain rendez-vous suggéré
        nextDueDate: {
            type: Date,
            default: null
        }
    },
    {
        collection: 'health_records',
        timestamps: true
    }
);

const HealthRecord = model('HealthRecord', healthRecordSchema);
module.exports = HealthRecord;