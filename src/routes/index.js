const router = require('express').Router();
const authRoutes = require('./auth.routes');

router.get('/', (req, res) => {
    res.status(200).json({
        message: '🐾 Bienvenue sur l\'API PetBuddy',
        version: '1.0.0',
        status: 'online'
    });
});

// Toutes les routes auth
router.use('/auth', authRoutes);

module.exports = router;