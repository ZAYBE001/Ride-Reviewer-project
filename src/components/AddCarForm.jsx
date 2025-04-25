import React, { useState } from "react";
import "../App.css";

const AddCarForm = ({ onAddCar }) => {
  const [formData, setFormData] = useState({
    brand: "",
    image: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please enter an image URL.");
      return;
    }

    const newCar = {
      id: Date.now(), // Temporary ID for frontend
      title: formData.brand,
      url: formData.image,
      comment: formData.comment,
    };

    onAddCar(newCar); // Pass new car to the parent component
    setFormData({ brand: "", image: "", comment: "" }); // Clear the form
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Add a New Car</h2>

      <div className="form-group">
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Add Car
      </button>
    </form>
  );
};

export default AddCarForm;
