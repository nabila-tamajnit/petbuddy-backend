const router = require('express').Router({ mergeParams: true });
const wellnessController = require('../controllers/wellness.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');

router.use(authenticationMiddleware());

router.route('/')
    .get(wellnessController.getAll)
    .post(wellnessController.create);

router.route('/:id')
    .get(wellnessController.getById)
    .put(wellnessController.update)
    .delete(wellnessController.delete);

module.exports = router;