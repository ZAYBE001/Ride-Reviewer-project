import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState({
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
    <form onSubmit={handleSubmit}>
      <h2>Leave a Review</h2>
      <div>
        <label>Pros:</label>
        <textarea name="pros" value={review.pros} onChange={handleChange} />
      </div>
      <div>
        <label>Cons:</label>
        <textarea name="cons" value={review.cons} onChange={handleChange} />
      </div>
      <div>
        <label>Performance:</label>
        <input type="number" name="performance" value={review.performance} onChange={handleChange} />
      </div>
      <div>
        <label>Comfort:</label>
        <input type="number" name="comfort" value={review.comfort} onChange={handleChange} />
      </div>
      <div>
        <label>Reliability:</label>
        <input type="number" name="reliability" value={review.reliability} onChange={handleChange} />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;