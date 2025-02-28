import express from 'express';
import {  updateOrCreateConfig, getConfig } from './config.controller';
import { authenticateToken } from '../../middleware/auth';

const router = express.Router();

router.put('/', authenticateToken, updateOrCreateConfig);
router.get('/', authenticateToken, getConfig);

export default router;