import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Home from './components/Home';
import Reviews from './components/Reviews';
import AddReview from './components/AddReview';
import CarStats from './components/CarStats';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Nav = styled.nav`
  background-color: #333;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  margin-right: 15px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-right: 15px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const UserGreeting = styled.span`
  color: white;
  margin-left: auto;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserBadge = styled.span`
  background-color: #4CAF50;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
`;

const Title = styled.h1`
  color: #444;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

function App() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await fetchReviews();
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  };

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  const handleLogin = async (userData) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userData.id}`);
      const updatedUser = {
        ...userData,
        reviewCount: response.data.reviewCount || 0
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserReviewCount = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const updatedUser = {
        ...response.data,
        reviewCount: (response.data.reviewCount || 0) + 1
      };
      
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        reviewCount: updatedUser.reviewCount
      });

      if (user && user.id === userId) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error updating review count:', error);
      throw error;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <Router>
      <AppContainer>
        <Title>Car Review App</Title>
        <Subtitle>Share your experiences and see what others think</Subtitle>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/reviews">All Reviews</NavLink>
          <NavLink to="/car-stats">Car Stats</NavLink>
          {user ? (
            <>
              <NavLink to="/add-review">Add Review</NavLink>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              <UserGreeting>
                Welcome, {user.name}
                <UserBadge>{user.reviewCount || 0} reviews</UserBadge>
              </UserGreeting>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
        </Nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews reviews={reviews} />} />
          <Route 
            path="/add-review" 
            element={
              <ProtectedRoute user={user}>
                <AddReview 
                  addReview={addReview} 
                  user={user} 
                  updateReviewCount={updateUserReviewCount} 
                />
              </ProtectedRoute>
            } 
          />
          <Route path="/car-stats" element={<CarStats reviews={reviews} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
