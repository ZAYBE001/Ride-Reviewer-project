import React, { useState } from 'react';
import '../App.css';

const SearchForm = ({ onSearch }) => {
  const [brand, setBrand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(brand);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Cars by Brand</h2>
      <div className="form-group">
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-button">Search</button>
    </form>
  );
};

export default SearchForm;
