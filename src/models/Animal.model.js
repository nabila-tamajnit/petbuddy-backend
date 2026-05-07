const { Schema, model, Types } = require('mongoose');

const animalSchema = new Schema(
    {
        // Référencer vers le propriétaire
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        species: {
            type: String,
            required: true,
            enum: ['cat', 'dog', 'rabbit', 'bird', 'hamster', 'other']
        },

        breed: {
            type: String,
            trim: true,
            default: null       // optionnel
        },

        gender: {
            type: String,
            enum: ['male', 'female', 'unknown'],
            default: 'unknown'
        },

        birthDate: {
            type: Date,
            default: null       // optionnel
        },

        weight: {
            type: Number,
            default: null,      // en kg, optionnel
            min: 0
        },

        photo: {
            type: String,
            default: null       // URL vers l'image, optionnel
        },

        isNeutered: {
            type: Boolean,
            default: false
        },

        chipNumber: {
            type: String,
            trim: true,
            default: null       // optionnel
        },

        // Si l'animal est décédé
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        collection: 'animals',
        timestamps: true
    }
);

const Animal = model('Animal', animalSchema);
module.exports = Animal;