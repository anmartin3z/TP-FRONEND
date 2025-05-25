import express from 'express';
import { getPendings, getDetail, doAction } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/pendings', getPendings);
router.get('/:id', getDetail);
router.post('/action', doAction);

export default router;
