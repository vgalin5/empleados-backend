import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const controller = new UserController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.list(req, res));
router.patch('/:id/approve', (req, res) => controller.approve(req, res));
router.patch('/:id/reject', (req, res) => controller.reject(req, res));


export default router;
