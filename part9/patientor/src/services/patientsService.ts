import patients from '../../data/patients';
import { Patient, NonSensitivePatientData, Entry, NewPatientEntry, EntryWithoutId } from "../type";
import { v1 as uuid } from 'uuid'

//const patients: Patient[] = patients as Patient[];

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
    id: uuid(),
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

const addEntry = (newEntry: EntryWithoutId) : Entry => {
  const newItem = {
    id: uuid(),
    ...newEntry
  };
  console.log('newItem -> ',newItem);
  return newItem
}

export default {
  getAllPatients,
  addPatient,
  findById,
  addEntry
}

