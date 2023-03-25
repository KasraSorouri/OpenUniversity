import data from '../../data/patients';
import { Patient, NonSensitivePatientData, NewPatientEntry } from "../type";
import { v1 as uuid } from 'uuid'

const patients: Patient[] = data as Patient[];

const getAllPatients = (): NonSensitivePatientData[]=> {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatientEntry: NewPatientEntry): Patient => {
  const newPatient = {
    id:uuid(),
    ... newPatientEntry
  };

  patients.push(newPatient);
  return newPatient;
}

const findById = (id: string): Patient | null => {
  const patient =  patients.find(patient => patient.id === id)
  if (patient) {
    return patient;
  }
  return null;
}

export default {
  getAllPatients,
  addPatient,
  findById
};

