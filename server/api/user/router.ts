import {Router} from 'express';
import UserController from './controller';
import container from '../../inversify.config';

const router = Router();
export default router;

const ctrl = container.get(UserController);

router.get('/', ctrl.getMany.bind(ctrl));
router.get('/:id', ctrl.getOne.bind(ctrl));
router.post('/', ctrl.handlePost.bind(ctrl));
router.put('/:id', ctrl.update.bind(ctrl));
router.delete('/:id', ctrl.remove.bind(ctrl));

