const router = require('express').Router();


router.get('/', (req, res) => {
    res.status(200).json({
        message: '🐾 Bienvenue sur l\'API PetBuddy',
        version: '1.0.0',
        status: 'online'
    });
});

module.exports = router;