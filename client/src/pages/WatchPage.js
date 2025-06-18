import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer'; // Assuming VideoPlayer is in components

const WatchPage = () => {
  const { id: movieId } = useParams();
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
          console.error("Error fetching movie for watch page:", err);
          setError('Failed to load movie data.');
          setLoading(false);
        });
    }
  }, [movieId]);

  if (loading) return <p>Loading movie...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie data not found.</p>;

  return (
    <div className="watch-page">
      <h2>Now Watching: {movie.title}</h2>
      <VideoPlayer videoUrl={movie.videoUrl} />
      {/* Optionally, add description or back button */}
      <p>{movie.description}</p>
    </div>
  );
};

export default WatchPage;
