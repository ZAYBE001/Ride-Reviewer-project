import React, { useState } from "react";
import "../App.css";

const AddCarForm = ({ onAddCar }) => {
  const [formData, setFormData] = useState({
    brand: "",
    image: null,
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: URL.createObjectURL(e.target.files[0]), // Generate temporary image URL
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    const newCar = {
      id: Date.now(), // Temporary ID for frontend
      title: formData.brand,
      url: formData.image,
      comment: formData.comment,
    };

    onAddCar(newCar); // Pass new car to the parent component
    setFormData({ brand: "", image: null, comment: "" }); // Clear the form
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h2>Add a New Car</h2>

      <div className="form-group">
        <label htmlFor="addcar-brand">Brand:</label>
        <input
          type="text"
          id="addcar-brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="addcar-image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {formData.image && (
          <img src={formData.image} alt="Car Preview" width="100" />
        )}
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="addcar-comment"
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
