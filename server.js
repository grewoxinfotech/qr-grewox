import express from 'express';
import { initializeDatabase } from './database/db.js';
import redirectRoutes from './routes/redirectRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';
import { findRedirectById } from './models/Redirect.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// Support for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Check if server is working
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.send('Server is running!');
});

app.use(express.json());
app.use('/dynamic', redirectRoutes);

// Route to download QR code dynamically based on ID
app.get('/download-qrcode/:id', async (req, res) => {
  const id = req.params.id;
  const result = await findRedirectById(id);

  if (!result?.target_url) {
    return res.status(404).send('Redirect URL not found');
  }

  const url = `https://qr.grewox.in/dynamic/${id}`;
  const qrPath = path.join(__dirname, `qrcode-${id}.png`);

  try {
    await QRCode.toFile(qrPath, url);
    res.download(qrPath, `qr-${id}.png`, (err) => {
      if (err) {
        console.error('Download error:', err);
      } else {
        // Optional: Delete QR after download
        fs.unlink(qrPath, (err) => {
          if (err) console.error('Failed to delete QR file:', err);
        });
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Failed to generate QR code');
  }
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
  });
