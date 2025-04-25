import React, { useState, useEffect } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import Login from "./components/Login";
import SignInForm from "./components/SignInForm";
import AddCarForm from "./components/AddCarForm";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [authView, setAuthview] = useState("login");

  //mock userdata base
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: "John Doe",
      pros: "Great performance, smooth ride.",
      cons: "Expensive, less space.",
      performance: 4,
      comfort: 5,
      reliability: 4,
      helpfulVotes: 10,
    },
    {
      id: 2,
      username: "Jane Smith",
      pros: "Comfortable and reliable.",
      cons: "Not great on performance.",
      performance: 3,
      comfort: 5,
      reliability: 5,
      helpfulVotes: 5,
    },
  ]);

  const handleLogin = async ({ username, password }) => {
    //simulate an Api call delay
    await new promise((resolve) => setTimeout(resolve, 1000));
  };

  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cars, setCars] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch("/db.json");
      const data = await response.json();
      setCars(data.images);
    };

    fetchCars();
  }, []);

  const handleSearch = (brand) => {
    const filtered = cars.filter((car) =>
      car.title.toLowerCase().includes(brand.toLowerCase())
    );
    setSearchResults(filtered);
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

  const handleAddCar = async (newCar) => {
    try {
      const response = await fetch("http://localhost:3000/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      if (!response.ok) throw new Error("Failed to add car");

      const savedCar = await response.json();
      setCars((prevCars) => [...prevCars, savedCar]);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleDeleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id);
    setCars(updatedCars); // Update the cars state by removing the car with the given id
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme
        </button>

        {!isLoggedIn ? (
          isRegistering ? (
            <>
              <SignInForm onSignIn={handleLogin} />
              <p className="">
                Already have an account?{" "}
                <button onClick={() => setIsRegistering(false)}>Log In</button>
              </p>
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} />
              <p className="">
                Don’t have an account?{" "}
                <button onClick={() => setIsRegistering(true)}>Sign In</button>
              </p>
            </>
          )
        ) : (
          <>
            <SearchForm onSearch={handleSearch} />

            <h2>Search Results</h2>
            <div className="car-gallery">
              {(searchResults.length > 0 ? searchResults : cars).map((car) => (
                <div key={car.id} className="car-item">
                  <img src={car.url} alt={car.title} />
                  <h3>{car.title}</h3>
                  <p>{car.comment}</p>
                  <button onClick={() => handleDeleteCar(car.id)}>
                    Delete Car
                  </button>
                </div>
              ))}
            </div>

            <ReviewForm
              onSubmit={(newReview) =>
                setReviews([...reviews, { id: Date.now(), ...newReview }])
              }
            />

            <h2>Car Reviews</h2>
            <ReviewList
              reviews={reviews}
              onVote={(id) =>
                setReviews((prevReviews) =>
                  prevReviews.map((review) =>
                    review.id === id
                      ? { ...review, helpfulVotes: review.helpfulVotes + 1 }
                      : review
                  )
                )
              }
              onDelete={handleDeleteReview}
            />

            <AddCarForm onAddCar={handleAddCar} />

            <h2>Car Gallery</h2>
            <div className="car-gallery">
              {cars.map((car) => (
                <div key={car.id} className="car-item">
                  <img src={car.url} alt={car.title} />
                  <h3>{car.title}</h3>
                  <p>{car.comment}</p>
                  <button onClick={() => handleDeleteCar(car.id)}>
                    Delete Car
                  </button>
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
