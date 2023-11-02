import express from 'express';
import cors = require('cors');
import diagnosisRouter from './routes/diagnosesRoutes';
import patientRouter from './routes/patientRoutes';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
