import express from 'express';
import { initializeDatabase } from './database/db.js';
import redirectRoutes from './routes/redirectRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Add a basic route to check if server is responding
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Server is running!');
});

app.use(express.json());
app.use('/dynamic', redirectRoutes);

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
  });
