import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json())
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height , weight} = req.query;
  try {
    const bmi = calculateBmi( Number(height), Number(weight) );
    const response = {
      height: Number(height),
      weight: Number(weight),
      bmi: bmi
    };
    res.json(response);
  } catch(error: unknown){
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json(errorMessage);
  }
});

app.post('/exercise', (req, res) => {

  const { daily_exercises, target} = req.body;
  /*
  if ( daily_exercises.length < 1 || !target) {
    return res.status(400).send({ error: 'parameters missing' });
    };
  if (!Number(target)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  */
  try {
    const result = exerciseCalculator( daily_exercises, target )
    return res.json(result)
  } catch(error: unknown){
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).json(errorMessage);
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is run on the port: ${PORT}`);
});
