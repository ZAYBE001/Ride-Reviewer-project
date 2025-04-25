//this Auth will handle both login and sign up
import React, { useState } from "react";
import validator from "validator";
import "../App.css";

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
    // const errors = validateLogin();
    // if (Object.keys(errors).length > 0) {
    //   setErrors(errors); // show errors in the UI
    // } else {
    //   onLogin(loginForm); // proceed to login

    // }
    const errors = validateLogin();
    if (Object.keys(errors).length === 0) {
    } else {
      setErrors(errors);
      return;
    }
  };

  const handleLoginSubmit = (e) => e.preventDefault();
  if (validateLogin()) {
    setLogin(true);
    onLogin(loginForm)
      .catch((err) => {
        setErrors({ form: err.message });
      })
      .finally(() => setLoading(false));
  }
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  const validateSignup = () => {
    const newErrors = {};
    if (!signupForm.firstName.trim()) {
      newErrors.firstName = "firstName is required";
    }
  };
};

export default Auth;
