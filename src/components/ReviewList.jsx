import React from 'react';

const ReviewList = ({ reviews, onVote }) => {
  return (
    <div>
    
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>{review.username}</h3>
            <p>Pros: {review.pros}</p>
            <p>Cons: {review.cons}</p>
            <p>Performance: {review.performance}</p>
            <p>Comfort: {review.comfort}</p>
            <p>Reliability: {review.reliability}</p>
            <button onClick={() => onVote(review.id)}>Upvote</button>
            <p>Helpful Votes: {review.helpfulVotes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;