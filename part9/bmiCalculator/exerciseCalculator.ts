interface Inputs {
  hours: number[];
  target:number;
}

const parseArguments = (args: string[]): Inputs => {
  if ( args.length < 4 ) throw new Error('Not enough arguments');
  return {
    hours: args.slice(3).map(arg => Number(arg)),
    target: Number(args[2])
  };
};
interface Rate {
  rate: number;
  description: string ;
}

const rating = (target: number, avg: number): Rate => {
  if( avg >= target ) {
    return { rate:1 , description: 'well done!' };
  } else if ( avg < target && avg >= 0.6 * target ) {
    return { rate:2 , description: 'not too bad but could be better' };
  } else {
    return { rate:3 , description: 'you should try harder' };
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number; 
}

const exerciseCalculator = (exercises: number[], target: number): Result  => {
  const avgExercise = (exercises.reduce((s, h) => s + h))/exercises.length;
  const report = {
    periodLength: exercises.length,
    trainingDays: exercises.filter(h => h > 0).length,
    success: (avgExercise >= target),
    rating: rating(target, avgExercise).rate,
    ratingDescription: rating(target, avgExercise).description,
    target: target,
    average: avgExercise,
  };
  return report;
};

const { hours, target } = parseArguments(process.argv);
console.log(exerciseCalculator(hours, target));

