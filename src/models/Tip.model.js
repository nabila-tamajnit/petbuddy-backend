const { Schema, model } = require('mongoose');

const tipSchema = new Schema(
    {
        species: {
            type: String,
            required: true,
            enum: ['cat', 'dog', 'rabbit', 'bird', 'hamster', 'other', 'all']
        },

        category: {
            type: String,
            required: true,
            enum: ['activity', 'nutrition', 'health', 'grooming', 'mental']
        },

        content: {
            type: String,
            required: true,
            trim: true
        },

        icon: {
            type: String,
            default: '💡'
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        collection: 'tips',
        timestamps: true
    }
);

const Tip = model('Tip', tipSchema);
module.exports = Tip;