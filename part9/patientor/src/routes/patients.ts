import express from 'express';
import servises from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(servises.getAllPatients());
});

router.post('/',(req,res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = servises.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch(error: unknown){
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = servises.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});


export default router;