import express from 'express';
import servises from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(servises.getAllDiagnoses());
});

export default router;