import React, { useState } from 'react';

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
    
    <form onSubmit={handleSubmit}>
       
      <div>
        <label>Brand:</label>
        <input type="text" name="brand" value={searchCriteria.brand} onChange={handleChange} />
      </div>
      <div>
        <label>Model:</label>
        <input type="text" name="model" value={searchCriteria.model} onChange={handleChange} />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" name="year" value={searchCriteria.year} onChange={handleChange} />
      </div>
      <div>
        <label>Price Range:</label>
        <input type="text" name="priceRange" value={searchCriteria.priceRange} onChange={handleChange} />
      </div>
      <div>
        <label>Fuel Type:</label>
        <input type="text" name="fuelType" value={searchCriteria.fuelType} onChange={handleChange} />
      </div>
      <div>
        <label>Transmission Type:</label>
        <input type="text" name="transmissionType" value={searchCriteria.transmissionType} onChange={handleChange} />
      </div>
      <button type="submit">Search</button>
    </form>
    );
};

export default SearchForm;