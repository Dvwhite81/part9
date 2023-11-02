export const calculateBmi = (height: number, weight: number) => {
  const metresSquared = (height / 100) ** 2;
  const bmi = weight / metresSquared;

  let message: string;
  if (bmi < 18.5) message = 'Underweight';
  else if (bmi < 25) message = 'Normal (healthy weight)';
  else if (bmi < 30) message = 'Overweight';
  else message = 'Obese';

  return message;
};

// console.log(calculateBmi(180, 74));

interface BmiArgs {
  height: number,
  weight: number
}

const parseBmiArgs = (args: string[]): BmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

try {
  const { height, weight } = parseBmiArgs(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
