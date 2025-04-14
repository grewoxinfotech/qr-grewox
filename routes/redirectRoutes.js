import express from 'express';
import { handleRedirect, handleCreate } from '../controllers/redirectController.js';

const router = express.Router();

router.get('/:id', handleRedirect);
router.post('/', handleCreate);

export default router;
