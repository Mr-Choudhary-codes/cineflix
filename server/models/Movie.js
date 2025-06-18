const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  language: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  rating: { type: Number, default: 0 } // Default rating to 0 or some other suitable value
});

module.exports = mongoose.model('Movie', movieSchema);
