import React from 'react';
import '../App.css'; // Import the CSS file

const ReviewList = ({ reviews, onVote, onDelete}) => {
  return (
    <div className="review-list">
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          
          <li key={review.id} className="review-item">
            
            <div>
            <h3>{review.username}</h3>
            <p>Pros: {review.pros}</p>
            <p>Cons: {review.cons}</p>
            <p>Performance: {review.performance}</p>
            <p>Comfort: {review.comfort}</p>
            <p>Reliability: {review.reliability}</p>
            <button onClick={() => onVote(review.id)} className="vote-button">
              Upvote
            </button>
            <p>Helpful Votes: {review.helpfulVotes}</p>
            <button onClick={() => onDelete(review.id)}>Delete</button>
            </div>
          </li>     
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;

