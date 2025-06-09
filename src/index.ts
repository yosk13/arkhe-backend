import express from 'express';
import cors from 'cors';
import entradasRouter from './routes/entradas'; 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/entradas', entradasRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🕯️  Arkhé API corriendo en http://localhost:${PORT}`);
});
