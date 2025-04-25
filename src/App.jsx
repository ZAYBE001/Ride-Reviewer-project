import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./comonents/Auth";

const App = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
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
};

export default App;
