const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true        // supprimer les espaces avant/après
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: null     // optionnel, null par défaut
        }
    },
    {
        collection: 'users',  // nom exact de la collection en base
        timestamps: true      // ajouter createdAt et updatedAt automatiquement
    }
);

const User = model('User', userSchema);

module.exports = User;