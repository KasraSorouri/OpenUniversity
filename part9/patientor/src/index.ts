import express from "express";
import cors from 'cors'

import diagnosesRouter from './routes/diagnoses'

const app = express();
app.use(express.json(),cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
})

