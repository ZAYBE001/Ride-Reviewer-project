import React, { useState } from 'react';
import '../App.css'; // Import the CSS file

const SearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    brand: '',
    model: '',
    year: '',
    priceRange: '',
    fuelType: '',
    transmissionType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Cars</h2>
      <div className="form-group">
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={searchCriteria.brand}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          name="model"
          value={searchCriteria.model}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          name="year"
          value={searchCriteria.year}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priceRange">Price Range:</label>
        <input
          type="text"
          id="priceRange"
          name="priceRange"
          value={searchCriteria.priceRange}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fuelType">Fuel Type:</label>
        <input
          type="text"
          id="fuelType"
          name="fuelType"
          value={searchCriteria.fuelType}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="transmissionType">Transmission Type:</label>
        <input
          type="text"
          id="transmissionType"
          name="transmissionType"
          value={searchCriteria.transmissionType}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">Search</button>
    </form>
  );
};

export default SearchForm;

