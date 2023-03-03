import express from 'express';
import servises from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(servises.getAllPatients());
});

router.post('/',(req,res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body
  const addedPatient = servises.addPatient({ 
    name,
    dateOfBirth,
    ssn,
    gender, 
    occupation 
  });
  res.json(addedPatient);
});


export default router;