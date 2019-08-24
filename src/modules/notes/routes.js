const router = require('express').Router();
const validate = require('express-validation');
const controller = require('./controllers');
const Validation = require('./validation');
// const checkAuth = require('./../../services/authentication');

router.get('/', validate(Validation.list), controller.list);
router.get('/mynotes', controller.listMyBooks);
router.get('/:id', [validate(Validation.listOne)], controller.listOne);
router.post('/', [validate(Validation.create)], controller.create);
router.patch('/:id', [validate(Validation.edit)], controller.edit);
router.delete('/:id', controller.remove);

module.exports = router;
