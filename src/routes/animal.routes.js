const router = require('express').Router();
const animalController = require('../controllers/animal.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');

router.use(authenticationMiddleware());

router.route('/')
    .get(animalController.getAll)
    .post(animalController.create);

router.route('/:id')
    .get(animalController.getById)
    .put(animalController.update)
    .delete(animalController.delete);

router.patch('/:id/restore', animalController.restore);

router.delete('/:id/permanent', animalController.permanentDelete);

module.exports = router;