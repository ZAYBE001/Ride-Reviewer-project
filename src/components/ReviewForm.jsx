import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState({
    pros: '',
    cons: '',
    performance: 0,
    comfort: 0,
    reliability: 0,
    rating: 0
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
        <label htmlFor="pros">Pros:</label>
        <textarea
          id="pros"
          name="pros"
          value={review.pros}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="cons">Cons:</label>
        <textarea
          id="cons"
          name="cons"
          value={review.cons}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="performance">Performance:</label>
        <input
          id="performance"
          type="number"
          name="performance"
          value={review.performance}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="comfort">Comfort:</label>
        <input
          id="comfort"
          type="number"
          name="comfort"
          value={review.comfort}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="reliability">Reliability:</label>
        <input
          id="reliability"
          type="number"
          name="reliability"
          value={review.reliability}
          onChange={handleChange}
        />
      </div>
      <div className="rating">
        <input
          value="5"
          name="rating"
          id="star5"
          type="radio"
          onChange={handleChange}
        />
        <label htmlFor="star5">5 Stars</label>
        <input
          value="4"
          name="rating"
          id="star4"
          type="radio"
          onChange={handleChange}
        />
        <label htmlFor="star4">4 Stars</label>
        <input
          value="3"
          name="rating"
          id="star3"
          type="radio"
          onChange={handleChange}
        />
        <label htmlFor="star3">3 Stars</label>
        <input
          value="2"
          name="rating"
          id="star2"
          type="radio"
          onChange={handleChange}
        />
        <label htmlFor="star2">2 Stars</label>
        <input
          value="1"
          name="rating"
          id="star1"
          type="radio"
          onChange={handleChange}
        />
        <label htmlFor="star1">1 Star</label>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;