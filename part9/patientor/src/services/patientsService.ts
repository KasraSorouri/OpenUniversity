import data from '../../data/patients';
import { Patient, NonSensitivePatientData } from "../type";


const getAllPatients = (): NonSensitivePatientData[]=> {
  const patients:Patient[] = data;
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getAllPatients
};

