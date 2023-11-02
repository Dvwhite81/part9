interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (target: number, hours: number[]): ExerciseResult => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const getRating = average / target;

  let rating, ratingDescription;
  if (getRating > 1) {
    rating = 3;
    ratingDescription = 'Great job!';
  } else if (getRating > 0.8) {
    rating = 2;
    ratingDescription = 'Not too bad, but could be better';
  } else {
    rating = 1;
    ratingDescription = 'You need to work harder!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

interface ExerciseArgs {
  target: number,
  hours: number[]
}

const parseExerciseArgs = (args: string[]): ExerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = args[2];
  const hours: number[] = [];

  for (let i = 3; i < args.length; i++) {
    hours.push(Number(args[i]));
  }

  if (isNaN(Number(target)) || hours.some(isNaN)) {
    throw new Error('Provided values were not all numbers!');
  } else {
    return {
      target: Number(target),
      hours: hours
    };
  }
};

try {
  const { target, hours } = parseExerciseArgs(process.argv);
  const result = calculateExercises(target, hours);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
