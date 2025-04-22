import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes';
import storeRoutes from './routes/storeRoutes';
import { validateEnv } from './utils/validateEnv';
import { supabase } from './utils/supabaseClient';
validateEnv();
const app = express();
app.use(cors());

// app.use(cors({
//   origin: ['http://localhost:3000', 'https://qwok04e-anonymous-8081.exp.direct'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

app.use(express.json());
app.use('/transactions', transactionRoutes);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});
supabase
  .from('stores')
  .select('*')
  .then(({ data, error }) => {
    if (error) console.error('Supabase Error:', error);
    else console.log('Supabase Data:', data);
  });
app.use('/api', storeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

