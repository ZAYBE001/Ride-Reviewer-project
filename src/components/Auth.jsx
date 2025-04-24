//this Auth will handle both login and sign up
import React, { useState } from "react";

const Auth = ({ onLogin, onSignup }) => {
  const [islogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [loginForm, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    consent: false,
    terms: false,
  });

  //validation rules

  const validateLogin = () => {
    const newErrors = {};

    if (!validator.isEmail(loginForm.email)) {
      newErrors.email = "plaese enter a valid email address";
    }
    if (loginForm.password.length < 8) {
      newErrors.password = "password must be atleast 8 characters";
    }
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // show errors in the UI
    } else {
      onLogin(loginForm); // proceed to login
    }
  };
};
