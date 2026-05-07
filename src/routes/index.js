const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

router.get('/', (req, res) => {
    res.status(200).json({
        message: '🐾 Bienvenue sur l\'API PetBuddy',
        version: '1.0.0',
        status: 'online'
    });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;