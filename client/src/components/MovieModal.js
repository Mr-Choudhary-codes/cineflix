import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;
  return (
    <div className='movie-modal-backdrop'>
      <div className='movie-modal-content'>
        {/* Content will be added later */}
        <h2>{movie.title}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MovieModal;
