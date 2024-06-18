import React from 'react';

import SearchIcon from './assets/Search_Icon.png';

const { useState } = React;

function SearchBar({setQueryItem, reviewList, setFiltered }) {

  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setQueryItem(value);
    if (value.length >= 3) {
      const filtered = reviewList.filter((review) => {
        return review.body.toLowerCase().includes(value.toLowerCase());
      });
      setFiltered(filtered);
    } else {
      setFiltered([]);
    }
  };
  return (

    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <button type="button" className="search-button">
        <img src={SearchIcon} width="20px" alt="search icon" className="search-icon" />
      </button>
    </div>

  );
}

export default SearchBar;
