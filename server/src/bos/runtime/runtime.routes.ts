import express from 'express';
import { getPostsByHandle } from './runtime.controller';

const router = express.Router();

// Define the route for getting posts by blogName
router.get('/:handle', getPostsByHandle);

export default router;
