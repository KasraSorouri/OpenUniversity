import data from '../../data/diagnoses';
import { Diagnose } from "../type";

const diagnoses: Diagnose[] = data;

const getAllDiagnoses = (): Diagnose[]=> {
  return diagnoses;
};

export default {
  getAllDiagnoses
};

