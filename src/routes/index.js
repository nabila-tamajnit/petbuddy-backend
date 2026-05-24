const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const animalRoutes = require('./animal.routes');
const healthRecordRoutes = require('./healthRecord.routes');
const wellnessRoutes = require('./wellness.routes');
const reminderRoutes = require('./reminder.routes');
const reminderController = require('../controllers/reminder.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');
const tipRoutes = require('./tip.routes');

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
router.get('/reminders/pending', authenticationMiddleware(), reminderController.getPending);
router.use('/animals/:animalId/reminders', reminderRoutes);
router.use('/tips', tipRoutes);

module.exports = router;