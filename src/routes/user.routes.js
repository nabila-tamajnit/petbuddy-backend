const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');

// Les deux routes nécessitent d'être connecté

// GET /api/users/me → voir son profil
router.get('/me', authenticationMiddleware(), userController.getMe);

// DELETE /api/users/me → supprimer son compte
router.delete('/me', authenticationMiddleware(), userController.deleteAccount);

module.exports = router;