import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).send({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(height, weight);
  const result = {
    weight: weight,
    height: height,
    bmi: bmi
  };
  return res.status(200).send(result);
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: number[], target: number };

  if (!daily_exercises || !target) {
    return res.status(400).send({
      error: 'parameters missing'
    });
  }

  if (isNotNumber(target) || daily_exercises.some(ex => isNotNumber(ex))) {
    return res.status(400).send({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExercises(target, daily_exercises);
  return res.status(200).send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
