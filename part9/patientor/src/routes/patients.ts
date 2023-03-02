import express from 'express';
import servises from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(servises.getAllPatients());
});

export default router;