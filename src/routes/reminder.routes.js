const router = require('express').Router({ mergeParams: true });
const reminderController = require('../controllers/reminder.controller');
const authenticationMiddleware = require('../middlewares/authentication.middleware');

router.use(authenticationMiddleware());

router.route('/')
    .get(reminderController.getAll)
    .post(reminderController.create);

router.route('/:id')
    .put(reminderController.update)
    .delete(reminderController.delete);

// Route dédiée pour marquer comme fait
router.patch('/:id/done', reminderController.markAsDone);

module.exports = router;