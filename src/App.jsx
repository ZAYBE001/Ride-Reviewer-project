import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import Login from './components/Login';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: 'John Doe',
      pros: 'Great performance, smooth ride.',
      cons: 'Expensive, less space.',
      performance: 4,
      comfort: 5,
      reliability: 4,
      helpfulVotes: 10,
    },
    {
      id: 2,
      username: 'Jane Smith',
      pros: 'Comfortable and reliable.',
      cons: 'Not great on performance.',
      performance: 3,
      comfort: 5,
      reliability: 5,
      helpfulVotes: 5,
    },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [cars, setCars] = useState([]);  

  useEffect(() => {
    
    const fetchCars = async () => {
      const response = await fetch('/db.json');  
      const data = await response.json();
      setCars(data.images);
    };

    fetchCars();
  }, []);

  const handleSearch = (criteria) => {
    console.log('Search criteria submitted:', criteria);
    const filteredReviews = reviews.filter((review) => {
      return (
        (criteria.brand ? review.username.includes(criteria.brand) : true) &&
        (criteria.model ? review.pros.includes(criteria.model) : true)
      );
    });
    setSearchResults(filteredReviews);
  };

  const handleVote = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, helpfulVotes: review.helpfulVotes + 1 }
          : review
      )
    );
  };

  const handleLogin = ({ username, password }) => {
    
    console.log('Logged in with:', username, password);
    setIsLoggedIn(true); 
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme
        </button>

        {!isLoggedIn ? (
          
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <SearchForm onSearch={handleSearch} />

            <h2>Search Results</h2>
            <ReviewList reviews={searchResults.length > 0 ? searchResults : reviews} onVote={handleVote} />

            <ReviewForm onSubmit={(newReview) => setReviews([...reviews, { id: Date.now(), ...newReview }])} />

            <h2>Car Gallery</h2>
            <div className="car-gallery">
              {cars.map((car) => (
                <div key={car.id} className="car-item">
                  <img src={car.url} alt={car.title} />
                  <h3>{car.title}</h3>
                  <p>{car.comment}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
