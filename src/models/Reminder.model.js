// src/models/Reminder.model.js

const { Schema, model, Types } = require('mongoose');

const reminderSchema = new Schema(
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

        type: {
            type: String,
            required: true,
            enum: ['vaccine', 'vet', 'medication', 'grooming', 'deworming', 'custom']
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

        dueDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ['pending', 'done', 'snoozed'],
            default: 'pending'
        },

        completedAt: {
            type: Date,
            default: null     // rempli quand status passe à 'done'
        }
    },
    {
        collection: 'reminders',
        timestamps: true
    }
);

const Reminder = model('Reminder', reminderSchema);
module.exports = Reminder;