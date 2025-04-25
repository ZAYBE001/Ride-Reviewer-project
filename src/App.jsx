import React, { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import Login from "./components/Login";
import SignInForm from "./components/SignInForm";
import AddCarForm from "./components/AddCarForm";

const BASE_URL = "https://ride-reviewer-db-zkvn.onrender.com/api";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cars, setCars] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const reviewsResponse = await fetch(`${BASE_URL}/reviews`);
        if (!reviewsResponse.ok) throw new Error("Error fetching reviews");
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        
        const carsResponse = await fetch(`${BASE_URL}/images`);
        if (!carsResponse.ok) throw new Error("Error fetching car images");
        const carsData = await carsResponse.json();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (criteria) => {
    const filteredReviews = reviews.filter((review) => {
      const brandMatch = criteria.brand
        ? review.username.toLowerCase().includes(criteria.brand.toLowerCase())
        : false;
      const modelMatch = criteria.model
        ? review.pros.toLowerCase().includes(criteria.model.toLowerCase())
        : false;
      const yearMatch = criteria.year ? review.year === criteria.year : false;
      const priceRangeMatch = criteria.priceRange
        ? review.priceRange === criteria.priceRange
        : false;
      const fuelTypeMatch = criteria.fuelType
        ? review.fuelType === criteria.fuelType
        : false;
      const transmissionTypeMatch = criteria.transmissionType
        ? review.transmissionType === criteria.transmissionType
        : false;

      const noCriteria =
        !criteria.brand &&
        !criteria.model &&
        !criteria.year &&
        !criteria.priceRange &&
        !criteria.fuelType &&
        !criteria.transmissionType;

      return (
        noCriteria ||
        brandMatch ||
        modelMatch ||
        yearMatch ||
        priceRangeMatch ||
        fuelTypeMatch ||
        transmissionTypeMatch
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
    console.log("Logged in with:", username, password);
    setIsLoggedIn(true);
  };

  
  const handleSubmitReview = async (newReview) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newReview.username,
          pros: newReview.pros,
          cons: newReview.cons,
          performance: newReview.performance,
          comfort: newReview.comfort,
          reliability: newReview.reliability,
          image: newReview.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Error submitting the review");
      }

      const submittedReview = await response.json();
      console.log("Review submitted successfully:", submittedReview);

      setReviews((prevReviews) => [...prevReviews, submittedReview]);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleAddCar = async (newCar) => {
    try {
      const response = await fetch(`${BASE_URL}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newCar.title,
          url: newCar.url,
          comment: newCar.comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Error submitting the new car");
      }

      const submittedCar = await response.json();
      setCars((prevCars) => [...prevCars, submittedCar]);
    } catch (error) {
      console.error("Error submitting new car:", error);
      alert("Failed to submit new car. Please try again.");
    }
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        <button
          className="btn btn-primary theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Theme
        </button>

        {!isLoggedIn ? (
          isRegistering ? (
            <section className="auth-section">
              <SignInForm onSignIn={handleLogin} />
              <p className="text-center mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-500 underline"
                >
                  Log In
                </button>
              </p>
            </section>
          ) : (
            <section className="auth-section">
              <Login onLogin={handleLogin} />
              <p className="text-center mt-4">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-500 underline"
                >
                  Sign Up
                </button>
              </p>
            </section>
          )
        ) : (
          <main>
            <section className="search-section">
              <SearchForm onSearch={handleSearch} />
            </section>

            {searchResults.length > 0 ? (
              <section className="reviews-section">
                <h2>Search Results</h2>
                <ReviewList reviews={searchResults} onVote={handleVote} />
              </section>
            ) : (
              <section className="reviews-section">
                <h2>All Reviews</h2>
                <ReviewList reviews={reviews} onVote={handleVote} />
              </section>
            )}

            <section className="review-form-section">
              <ReviewForm onSubmit={handleSubmitReview} />
            </section>

            <section className="car-gallery-section">
              <h2>Add a New Car</h2>
              <AddCarForm onAddCar={handleAddCar} />
            </section>

            <section className="car-gallery-section">
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
            </section>
          </main>
        )}
      </div>
    </div>
  );
};

export default App;
