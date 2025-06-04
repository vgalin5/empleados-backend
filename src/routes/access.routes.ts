import { Router } from 'express';
import { AccessRequestController } from '../controllers/AccessRequestController';

const router = Router();
const controller = new AccessRequestController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/:userId', (req, res) => controller.listByUser(req, res));

export default router;
