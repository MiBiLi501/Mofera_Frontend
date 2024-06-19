import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Search.css'; // For styling (create this file separately)
import { CiSearch } from "react-icons/ci";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-pill-form" onSubmit={handleSubmit}>
      <div className="search-pill-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-pill-input"
        />
      </div>
      <button type="submit" className="search-pill-button">
        <CiSearch className='text-2xl' />
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
