import { OccupationalHealthcareEntry } from "../Frontend/src/types";
import { BaseEntry, EntryWithoutId, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewPatientEntry } from "./type";


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name) || name.length < 3) {
    throw new Error('Incorrect or missing name!');
  }
  return name;
};

const isDate = (date: string) => {
   return Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
}

const parseSsn = (ssn: unknown): string => {
  if(!isString(ssn) || ssn.length !== 11) {
    throw new Error('Incorrect or missing ssn:' + ssn);
  };
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param) 
}
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  };
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation:' + occupation);
  };
  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || description.length < 3) {
    throw new Error('Incorrect or missing Description!');
  }
  return description;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(g => g).includes(param) 
}
const parseHealthCheck = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating:' + healthCheckRating);
  };
  return healthCheckRating;
};

const parseDischarge = (object: unknown) :  {date: string, criteria: string } | string => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ( 'date' in object && 'criteria' in object) {
    const discharge : { date:string, criteria: string} = {
      date: parseDate(object.date),
      criteria: parseName(object.criteria)
    }
    return discharge;
  }
  throw new Error('Incorrect or missing data');
}

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  };

  if( 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object ) {
    const newPatient : NewPatientEntry = {
      name : parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };
    return newPatient;
  };
  throw new Error('Incorrect data: a field missing');
};

const entryBaseTypeValidator = (object:{}) : Omit<BaseEntry, 'id'> => {
  if ('description' in object && 'date' in object && 'specialist' in object ) {
    let newEntry: Omit<BaseEntry, 'id'> = {
      description : parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseName(object.specialist),
    };
    
    if ('diagnosisCodes' in object) {
        const diagnosisCodes = object.diagnosisCodes as string[]
        newEntry.diagnosisCodes = diagnosisCodes
    }
    return newEntry;
  };
  throw new Error('Incorrect data: a field missing'); 
};

const healthCheckTypeValidator = (object:{}) : Omit<HealthCheckEntry, 'id'> => {
  console.log('health check validator object ->', object)
  const base : Omit<BaseEntry, 'id'>  = entryBaseTypeValidator(object);
  if ( 'healthCheckRating' in object ) {
    const healthCheckRating : HealthCheckRating = parseHealthCheck(object.healthCheckRating)
    const newEntry : Omit<HealthCheckEntry, 'id'> = {
      type: "HealthCheck",
      healthCheckRating,
      ...base
    }
    console.log('health check validator object export->', newEntry)

    return newEntry;
  }
  throw new Error('Incorrect or missing data: healthCheckRating'); 
}

const hospitalTypeValidator = (object:{}) : Omit<HospitalEntry, 'id'> => {
  const base : Omit<BaseEntry, 'id'>  = entryBaseTypeValidator(object);
  if ( 'discharge' in object ) {
    const discharge = parseDischarge(object.discharge)
    if ( typeof(discharge) === 'string' ) {
      throw new Error('Incorrect or missing data: discharge'); 
    };
    const newEntry : Omit<HospitalEntry, 'id'> = {
      type: "Hospital",
      ...base,
      discharge,
    }
    return newEntry
  }
  throw new Error('Incorrect or missing data: discharge'); 
}

const occupationalHealthcareEntryValidator = (object: {}): Omit<OccupationalHealthcareEntry, 'id'> => {
  const base: Omit<BaseEntry, 'id'> = entryBaseTypeValidator(object);
  if ('employerName' in object) {
    const employerName: string = parseName(object.employerName);
    let sickLeave: { startDate: string, endDate: string } | undefined;
    if ('sickLeave' in object) {
      const sickLeaveObj = object.sickLeave;
      if (typeof sickLeaveObj === 'object' && sickLeaveObj !== null) {
        if ('startDate' in sickLeaveObj && 'endDate' in sickLeaveObj) {
          sickLeave = {
            startDate: parseDate(sickLeaveObj.startDate),
            endDate: parseDate(sickLeaveObj.endDate)
          };
        } else {
          throw new Error('For sick leave, both start date and end date should be provided');
        }
      } else {
        throw new Error('Incorrect or missing sick leave data');
      }
    }
    const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
      type: "OccupationalHealthcare",
      ...base,
      employerName,
      sickLeave,
    };
    return newEntry;
  }
  throw new Error('Incorrect or missing data: employer name');
};


export const toNewEntry = (object:unknown) : EntryWithoutId => {
  if ( !object || typeof object !== 'object' || !('type' in object) ) {
    throw new Error('Incorrect or missing data');
  }
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  switch (object.type) {
    case "HealthCheck": return healthCheckTypeValidator(object);
    case "Hospital": return hospitalTypeValidator(object)
    case "OccupationalHealthcare": return occupationalHealthcareEntryValidator(object)
    default : return assertNever(object.type as never)
  };
/*
  if ('description' in object && 'date' in object && 'specialist' in object && 'healthCheckRating' in object) {
    const newEntry: EntryWithoutId = {
      description : parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseName(object.specialist),
      healthCheckRating: parseHealthCheck(object.healthCheckRating),
    }

    return newEntry
    */
 };


export default {
  toNewPatientEntry,
  toNewEntry
};