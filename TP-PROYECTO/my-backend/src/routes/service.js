import express from 'express';
import { getPendings } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/pendings', getPendings);

export default router;
