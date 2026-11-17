const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => {
  res.send('O Positive Health API chal raha hai');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log('Server chal raha hai port ' + PORT);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err.message);
  });