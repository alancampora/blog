import express from 'express';
import { getPostsByBlogName } from './runtime.controller';

const router = express.Router();

// Define the route for getting posts by blogName
router.get('/:blogName', getPostsByBlogName);

export default router;
