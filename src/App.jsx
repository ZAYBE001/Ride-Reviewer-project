import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./comonents/Auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = async (credentials) => {
    // simulate an Api call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) =>
            u.eamil === credentials.email && u.password === credentials.password
        );
        if (user) {
          setIsLoggedIn(true);
          resolve();
        } else {
          reject(new Error("invalid email or password"));
        }
      }, 1000);
    });
  };
  const handleSignup = async (userData) => {
    //simulate an APi call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //check if the email already exists
        if (user.some((u) => u.email === userData.eamil)) {
          reject(new Error("The Email is already regitered"));
          return;
        }
        //create a new user obj
        const newUser = {
          id: Date.now(),
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          birthDate: userData.birthDate,
          password: userData.password,
          createdAt: new Date().toISOString(),
        };
        SetUssers((prev) => [...prev, newUser]);
        resolve();
      }, 1500);
    });
  };
  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          Toggle Theme
        </button>

        {!isLoggedIn ? (
          <auth onLogin={handleLogin} onSignup={handleSignup} />
        ) : (
          <>{/*youy esisting logged in content*/}</>
        )}
      </div>
    </div>
  );
};

export default App;
