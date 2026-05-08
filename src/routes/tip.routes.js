const router = require('express').Router();
const tipController = require('../controllers/tip.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');

// Les tips nécessitent d'être connecté
// mais pas de vérification d'ownership — ce sont des données partagées
router.get('/', authenticationMiddleware(), tipController.getAll);
router.get('/species', authenticationMiddleware(), tipController.getForSpecies);

module.exports = router;