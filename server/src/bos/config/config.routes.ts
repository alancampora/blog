import express from 'express';
import { updateConfig, updateOrCreateConfig, getConfig } from './config.controller';
import { authenticateToken } from '../../middleware/auth';

const router = express.Router();

router.put('/', authenticateToken, updateOrCreateConfig);
router.get('/', authenticateToken, getConfig);
router.put('/:id', authenticateToken, updateConfig);

export default router;