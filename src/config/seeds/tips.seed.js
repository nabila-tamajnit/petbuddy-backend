const mongoose = require('mongoose');
const Tip = require('../../models/Tip.model');

const tips = [
    // Chats
    { species: 'cat', category: 'activity', content: 'Consacre 15 minutes à jouer avec ton chat — ça réduit son stress et renforce votre lien.', icon: '🎾' },
    { species: 'cat', category: 'activity', content: 'Les chats adorent les hauteurs. Un arbre à chat ou une étagère dédiée stimule leur instinct naturel.', icon: '🏔️' },
    { species: 'cat', category: 'health', content: 'Vérifie les oreilles de ton chat chaque semaine — elles doivent être propres et sans odeur.', icon: '👂' },
    { species: 'cat', category: 'nutrition', content: 'L\'eau fraîche est essentielle pour les chats. Une fontaine à eau les encourage à boire davantage.', icon: '💧' },
    { species: 'cat', category: 'mental', content: 'Cache des friandises dans la maison pour stimuler l\'instinct de chasse de ton chat.', icon: '🧠' },

    // Chiens
    { species: 'dog', category: 'activity', content: 'Une promenade de 30 minutes par jour est le minimum pour un chien adulte en bonne santé.', icon: '🦮' },
    { species: 'dog', category: 'activity', content: 'Le jeu de la balle renforce le lien avec ton chien et dépense son énergie efficacement.', icon: '⚽' },
    { species: 'dog', category: 'mental', content: 'Les jouets d\'éveil et de réflexion fatiguent autant ton chien qu\'une longue promenade.', icon: '🧩' },
    { species: 'dog', category: 'health', content: 'Brosse les dents de ton chien 2 à 3 fois par semaine pour prévenir les maladies dentaires.', icon: '🦷' },
    { species: 'dog', category: 'nutrition', content: 'Évite de nourrir ton chien juste avant ou après l\'exercice — attends 1 heure de chaque côté.', icon: '🍖' },

    // Lapins
    { species: 'rabbit', category: 'activity', content: 'Ton lapin a besoin d\'au moins 3 heures de liberté par jour hors de sa cage.', icon: '🐰' },
    { species: 'rabbit', category: 'nutrition', content: 'Le foin doit représenter 80% de l\'alimentation de ton lapin — c\'est indispensable pour sa digestion.', icon: '🌾' },
    { species: 'rabbit', category: 'health', content: 'Les lapins se toilettent seuls mais ont besoin d\'être brossés régulièrement pour éviter les boules de poils.', icon: '✨' },

    // Oiseaux
    { species: 'bird', category: 'mental', content: 'Parle régulièrement à ton oiseau — les perruches et perroquets ont besoin de stimulation sociale quotidienne.', icon: '💬' },
    { species: 'bird', category: 'activity', content: 'Laisse ton oiseau voler librement dans une pièce sécurisée au moins 30 minutes par jour.', icon: '🕊️' },
    { species: 'bird', category: 'health', content: 'La qualité de l\'air est cruciale pour les oiseaux. Évite les sprays, bougies parfumées et poêles antiadhésifs.', icon: '💨' },

    // Hamsters
    { species: 'hamster', category: 'activity', content: 'Ton hamster peut courir jusqu\'à 10 km par nuit — une roue de grande taille est indispensable.', icon: '⚙️' },
    { species: 'hamster', category: 'mental', content: 'Cache de la nourriture dans la litière de ton hamster pour stimuler son instinct de fouisseur.', icon: '🔍' },
    { species: 'hamster', category: 'health', content: 'Les hamsters sont nocturnes. Évite de les déranger pendant la journée — c\'est leur période de sommeil.', icon: '🌙' },

    // Universels
    { species: 'all', category: 'health', content: 'Une visite vétérinaire annuelle est recommandée pour tous les animaux, même en bonne santé apparente.', icon: '🏥' },
    { species: 'all', category: 'health', content: 'Surveille le comportement de ton animal — un changement soudain d\'habitudes peut signaler un problème de santé.', icon: '👀' },
    { species: 'all', category: 'nutrition', content: 'L\'eau fraîche doit toujours être disponible et renouvelée chaque jour.', icon: '💧' }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            dbName: process.env.DB_NAME
        });
        console.log('💾 Connecté à la DB');

        // Supprime les tips existants avant de réinsérer
        await Tip.deleteMany({});
        console.log('🗑️  Tips existants supprimés');

        await Tip.insertMany(tips);
        console.log(`✅ ${tips.length} tips insérés avec succès`);

    } catch (err) {
        console.error('❌ Erreur lors du seed :', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Déconnecté de la DB');
    }
};

seed();