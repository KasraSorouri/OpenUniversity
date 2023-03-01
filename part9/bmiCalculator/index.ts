import express = require('express');
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height , weight} = req.query;
  console.log('params ->', {height , weight} );
  try {
    const bmi = calculateBmi( Number(height) , Number(weight) )
    const response = {
      height: Number(height),
      weight: Number(weight),
      bmi: bmi
    }
    res.json(response)
  } catch(error: unknown){
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json(errorMessage)
  }
})

const PORT:number = 3003;
app.listen(PORT, () => {
  console.log(`Server is run on the port: ${PORT}`);
  
})
