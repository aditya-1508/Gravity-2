const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

dotenv.config();

const app = express();

app.use(cors()); // Allow cross-origin
app.use(express.json()); // Parse incoming JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const PORT =5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
