import express from 'express';
import UserController from './controller';
import UserRepo from './repo';

const router = express.Router();
export default router;

const repo = new UserRepo();
const ctrl = new UserController(repo);

router.get('/', ctrl.getMany.bind(ctrl));
router.get('/:id', ctrl.getOne.bind(ctrl));
router.post('/', ctrl.handlePost.bind(ctrl));
router.put('/:id', ctrl.update.bind(ctrl));
router.delete('/:id', ctrl.remove.bind(ctrl));

