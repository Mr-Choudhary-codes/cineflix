import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className='movie-card bg-netflix-light-gray rounded-lg overflow-hidden shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer'>
      {/* Content will be added later */}
      <img src={movie && movie.thumbnailUrl ? movie.thumbnailUrl : 'https://via.placeholder.com/300x450.png?text=Movie+Poster'} alt={movie ? movie.title : 'Movie'} className='w-full h-auto object-cover' style={{height: '450px'}} />
      <div className='p-4'>
        <h3 className='text-lg font-semibold mb-2 truncate'>{movie ? movie.title : 'Movie Title'}</h3>
        <p className='text-sm text-netflix-gray truncate'>{movie ? movie.genre : 'Genre'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
