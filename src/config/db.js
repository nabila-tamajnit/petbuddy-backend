// Gérer la connexion à MongoDB
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            dbName: process.env.DB_NAME
        });
        console.log('💾 Connecté à MongoDB — PetBuddy DB');
    } catch (err) {
        console.error('❌ Échec de connexion à MongoDB :', err.message);
        process.exit(1); // Arrête le serveur si la DB est inaccessible
    }
};

module.exports = connectDB;