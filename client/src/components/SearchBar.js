import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='search-bar'>
      <input
        type='text'
        placeholder='Search for movies...'
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchBar;
