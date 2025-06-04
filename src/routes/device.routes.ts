import { Router } from 'express';
import { DeviceController } from '../controllers/DeviceController';

const router = Router();
const controller = new DeviceController();

router.get('/available', (req, res) => controller.listAvailable(req, res));
router.post('/assign', (req, res) => controller.assign(req, res));
router.get('/history/:userId', (req, res) => controller.userHistory(req, res));

export default router;
