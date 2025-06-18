import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Link for "Watch" button
import axios from 'axios';

const MovieDetailPage = () => {
  const { id: movieId } = useParams(); // Get movie ID from URL params
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (movieId) {
      axios.get(`/api/movies/${movieId}`)
        .then(response => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching movie details:", err);
          setError('Failed to load movie details.');
          setLoading(false);
        });
    }
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-detail-page">
      <img src={movie.thumbnailUrl || 'https://via.placeholder.com/400x600.png?text=No+Image'} alt={movie.title} style={{maxWidth: '400px', maxHeight: '600px'}} />
      <h1>{movie.title}</h1>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Language:</strong> {movie.language}</p>
      <p><strong>Rating:</strong> {movie.rating}/10</p>
      <p><strong>Description:</strong> {movie.description}</p>
      <Link to={`/watch/${movie._id}`} className="watch-button">
        Watch Now
      </Link>
      {/* Add more details or related movies here */}
    </div>
  );
};

export default MovieDetailPage;
