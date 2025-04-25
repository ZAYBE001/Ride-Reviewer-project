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
      <div className="search-grid">
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="e.g. Toyota"
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
            placeholder="e.g. Corolla"
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
            placeholder="e.g. 2020"
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
            placeholder="e.g. $20,000 - $30,000"
            value={searchCriteria.priceRange}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type:</label>
          <select
            id="fuelType"
            name="fuelType"
            value={searchCriteria.fuelType}
            onChange={handleChange}
          >
            <option value="">Select Fuel Type</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="transmissionType">Transmission Type:</label>
          <select
            id="transmissionType"
            name="transmissionType"
            value={searchCriteria.transmissionType}
            onChange={handleChange}
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchForm;
