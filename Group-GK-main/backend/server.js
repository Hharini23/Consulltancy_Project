const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Incoming Rs.   {req.method} request to Rs.   {req.url}`);
  next();
});

// MongoDB connection string - replace with your actual connection details
const MONGO_URI = 'mongodb://localhost:27017/test';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process if unable to connect
});

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port Rs.   {PORT}`);
});
