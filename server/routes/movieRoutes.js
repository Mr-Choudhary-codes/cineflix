const express = require('express');
const Movie = require('../models/Movie'); // Assuming Movie model is in ../models/Movie.js
const router = express.Router();

// --- Placeholder for Admin Authentication Middleware ---
// This middleware will be used to protect POST, PUT, DELETE routes
const isAdmin = (req, res, next) => {
  // TODO: Implement actual JWT verification logic here
  // For now, allow all requests for development purposes
  // In a real scenario, you would check for a valid admin JWT
  // if (!req.user || !req.user.isAdmin) {
  //   return res.status(403).json({ message: 'Forbidden: Admin access required.' });
  // }
  console.log('Admin middleware check (currently permissive)');
  next();
};

// GET /api/movies - Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Server error fetching movies.' });
  }
});

// POST /api/movies - Admin uploads a new movie
router.post('/', isAdmin, async (req, res) => {
  const { title, genre, releaseYear, language, description, videoUrl, thumbnailUrl, rating } = req.body;

  // Basic validation
  if (!title || !genre || !releaseYear || !language || !description || !videoUrl || !thumbnailUrl) {
    return res.status(400).json({ message: 'Please provide all required movie details.' });
  }

  try {
    const newMovie = new Movie({
      title,
      genre,
      releaseYear,
      language,
      description,
      videoUrl,
      thumbnailUrl,
      rating
    });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error saving movie:', error);
    // Check for duplicate key error (if you add unique indexes to title, for example)
    if (error.code === 11000) {
        return res.status(409).json({ message: 'Movie with this title might already exist.' });
    }
    res.status(500).json({ message: 'Server error saving movie.' });
  }
});

// GET /api/movies/:id - Get movie details by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid movie ID format.' });
    }
    res.status(500).json({ message: 'Server error fetching movie details.' });
  }
});

// PUT /api/movies/:id - Admin edits a movie
router.put('/:id', isAdmin, async (req, res) => {
  const { title, genre, releaseYear, language, description, videoUrl, thumbnailUrl, rating } = req.body;

  // Basic validation (similar to POST)
  if (!title || !genre || !releaseYear || !language || !description || !videoUrl || !thumbnailUrl) {
    return res.status(400).json({ message: 'Please provide all required movie details for update.' });
  }

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, genre, releaseYear, language, description, videoUrl, thumbnailUrl, rating },
      { new: true, runValidators: true } // new: true returns the updated document, runValidators ensures schema validation
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found for update.' });
    }
    res.json(updatedMovie);
  } catch (error) {
    console.error('Error updating movie:', error);
     if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid movie ID format for update.' });
    }
    res.status(500).json({ message: 'Server error updating movie.' });
  }
});

// DELETE /api/movies/:id - Admin deletes a movie
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found for deletion.' });
    }
    res.json({ message: 'Movie deleted successfully.', deletedMovie });
  } catch (error) {
    console.error('Error deleting movie:', error);
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid movie ID format for deletion.' });
    }
    res.status(500).json({ message: 'Server error deleting movie.' });
  }
});

module.exports = router;
