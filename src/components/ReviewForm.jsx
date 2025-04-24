import React, { useState } from 'react';
import '../App.css'; // Import the CSS file

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState({
    username: '',
    pros: '',
    cons: '',
    performance: 0,
    comfort: 0,
    reliability: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(review);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Leave a Review</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={review.username}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="pros">Pros:</label>
        <textarea
          id="pros"
          name="pros"
          value={review.pros}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cons">Cons:</label>
        <textarea
          id="cons"
          name="cons"
          value={review.cons}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
        type="file"
        id="image"
        name="image"
        accept="image/"
        className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100"
        />
        </div>

      <div className="form-group">
        <label htmlFor="performance">Performance:</label>
        <input
          type="number"
          id="performance"
          name="performance"
          value={review.performance}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="comfort">Comfort:</label>
        <input
          type="number"
          id="comfort"
          name="comfort"
          value={review.comfort}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="reliability">Reliability:</label>
        <input
          type="number"
          id="reliability"
          name="reliability"
          value={review.reliability}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">Submit Review</button>
    </form>
  );
};

export default ReviewForm;

