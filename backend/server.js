import express from 'express';
import cors from 'cors';
import upload from './utils/upload.js';

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.static('public'));

app.post('/file-upload', upload.single('image'), (req, res) => {
  // console.log(req.file);
  if (!req.file) throw new Error('No File uploaded');
  const properFilePath = req.file.path.replaceAll('\\', '/').replace('public/', '');

  // Eventuell in Datenbank speichern

  res.json({ file: properFilePath, alt: req.file.originalname });
});

app.use((err, req, res, next) => {
  process.env.NODE_ENV !== 'production' && console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`File Server listening on localhost:${port}`);
});
