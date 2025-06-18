const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // For serving static files later

// Import routes
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const port = process.env.PORT || 5001;

// --- Middleware ---
// Parse JSON request bodies
app.use(express.json());

// --- MongoDB Connection ---
// Replace 'YOUR_MONGODB_CONNECTION_STRING' with your actual MongoDB connection string
// It's highly recommended to use environment variables for this
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/movieMagicCinema';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true, // No longer needed for Mongoose 6+
  // useFindAndModify: false // No longer needed for Mongoose 6+
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));

// --- API Routes ---
app.use('/api/admin', adminAuthRoutes);
app.use('/api/movies', movieRoutes);

// --- Serve static assets for production (React build) ---
// This part will be more relevant after building the React app.
// It needs to serve 'index.html' for any routes not handled by the API.
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Backend server is running in development mode!');
  });
}

// --- Global Error Handler (optional basic example) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(\`Server listening at http://localhost:\${port}\`);
});
