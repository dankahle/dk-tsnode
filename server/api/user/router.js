const router = require('express').Router(),
  UserController = require('./controller'),
  UserRepo = require('./repo');

const repo = new UserRepo();
const ctrl = new UserController(repo);


router.get('/', ctrl.getMany.bind(ctrl));
router.get('/:id', ctrl.getOne.bind(ctrl));
router.post('/', ctrl.handlePost.bind(ctrl));
router.put('/:id', ctrl.update.bind(ctrl));
router.delete('/:id', ctrl.remove.bind(ctrl));

module.exports = router;
