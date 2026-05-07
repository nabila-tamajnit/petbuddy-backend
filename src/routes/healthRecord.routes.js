const router = require('express').Router({ mergeParams: true });
const healthRecordController = require('../controllers/healthRecord.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');

router.use(authenticationMiddleware());

router.route('/')
    .get(healthRecordController.getAll)
    .post(healthRecordController.create);

router.route('/:id')
    .get(healthRecordController.getById)
    .put(healthRecordController.update)
    .delete(healthRecordController.delete);

module.exports = router;