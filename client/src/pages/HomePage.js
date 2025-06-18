import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Will be used to fetch movies
import MovieCard from '../components/MovieCard'; // Assuming MovieCard is in components
import SearchBar from '../components/SearchBar'; // Assuming SearchBar is in components

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/movies') // Using proxy, so no need for full URL
      .then(response => {
        setMovies(response.data);
        setFilteredMovies(response.data); // Initially show all movies
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching movies:", err);
        setError('Failed to load movies.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredMovies(movies);
      return;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      movie.genre.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredMovies(results);
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <h2 class='text-2xl font-semibold text-white my-4'>Explore Movies</h2>
      {filteredMovies.length > 0 ? (
        <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default HomePage;
