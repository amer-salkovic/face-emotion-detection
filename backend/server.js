const express = require('express');
const app = express();

// Middleware za JSON
app.use(express.json());

// GET endpoint /api/test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server works! ✅' });
});

// Port
const PORT = process.env.PORT || 5001;

// Pokreni server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});