const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('--- Incoming Request ---');
  console.log('Time:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('Origin:', req.headers.origin);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('------------------------');
  next();
});

app.post('/', (req, res) => {
  res.json({ status: 'received', data: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
