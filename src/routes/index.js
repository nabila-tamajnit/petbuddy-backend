const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const animalRoutes = require('./animal.routes');
const healthRecordRoutes = require('./healthRecord.routes');
const wellnessRoutes = require('./wellness.routes');

router.get('/', (req, res) => {
    res.status(200).json({
        message: '🐾 Bienvenue sur l\'API PetBuddy',
        version: '1.0.0',
        status: 'online'
    });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/animals', animalRoutes);
router.use('/animals/:animalId/health-records', healthRecordRoutes);
router.use('/animals/:animalId/wellness', wellnessRoutes);

module.exports = router;