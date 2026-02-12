import express from 'express';
import { generateSpec, getHistory, getStatus } from '../controllers/specController.js';

const router = express.Router();

router.post('/generate', generateSpec);
router.get('/history', getHistory);
router.get('/status', getStatus);

export default router;
