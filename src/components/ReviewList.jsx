import React from "react";
import "../App.css"; 

const ReviewList = ({ reviews, onVote }) => {
  return (
    <div className="review-list">
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <div className="review-box">
              <h3>{review.username}</h3>
              <p>
                <strong>Pros:</strong> {review.pros}
              </p>
              <p>
                <strong>Cons:</strong> {review.cons}
              </p>
              <p>
                <strong>Year:</strong> {review.year}
              </p>
              <p>
                <strong>Price Range:</strong> {review.priceRange}
              </p>
              <p>
                <strong>Fuel Type:</strong> {review.fuelType}
              </p>
              <p>
                <strong>Transmission:</strong> {review.transmissionType}
              </p>
              <div className="ratings">
                <p>
                  <strong>Performance:</strong> {review.performance}
                </p>
                <p>
                  <strong>Comfort:</strong> {review.comfort}
                </p>
                <p>
                  <strong>Reliability:</strong> {review.reliability}
                </p>
              </div>
              <button onClick={() => onVote(review.id)} className="vote-button">
                Upvote
              </button>
              <p>Helpful Votes: {review.helpfulVotes}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;