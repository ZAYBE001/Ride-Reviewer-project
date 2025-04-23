import React, { useState } from 'react';
import Login from './Login.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewList from './ReviewList.jsx';
import SearchForm from './SearchForm.jsx';
import './App.css';



const App = () => {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  //const [recommendations, setRecommendations] = useState([]);
  //const [priceTrends, setPriceTrends] = useState([]);

  const handleLogin = (userData) => {
    
    setUser(userData);
  };

  const handleReviewSubmit = (review) => {
    
    setReviews([...reviews, { ...review, id: Date.now(), helpfulVotes: 0 }]);
  };

  const handleVote = (reviewId) => {
    
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, helpfulVotes: review.helpfulVotes + 1 } : review
    ));
  };

  const handleSearch = (criteria) => {
    
    console.log('Search criteria:', criteria);
  };

  return (
    <div>
      <h1>Vehicle Review App</h1>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <ReviewForm onSubmit={handleReviewSubmit} />
          <ReviewList reviews={reviews} onVote={handleVote} />
          <SearchForm onSearch={handleSearch} />
         
        </div>
      )}
    </div>
  );
};

export default App;