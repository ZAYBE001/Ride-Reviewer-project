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
      newErrors.firstName = "first name is required";
    }
    if (!signupForm.lastName.trim()) {
      newErrors.lastName = "Last name is required ";
    }
    if (!validator.isEmail(signupForm.email)) {
      newErrors.isEmail = "Please enter a valid email address";
    }
    if (!signupForm.birthDate) {
      newErrors.birthDate = "Birth date is requied";
    } else {
      const birthDate = new Date(signupForm.birthDate);
      const minAgeDate = new Date();
      minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);

      if (birthDate > minAgeDate) {
        newErrors.birthDate = "you must be at least 13 years old ";
      }
    }
    if (signupForm.password.length < 8) {
      newErrors.password = "password must be atleast 8 characters ";
    } else if (!/[A-Z]/.test(signupForm.password)) {
      newErrors.password =
        "password must contain at least one uppercase 1etter";
    } else if (!/[!0-9]/.test(signupForm.password)) {
      newErrors.password = "password must contain at least one number";
    }
    if (!signupForm.consent) {
      newErrors.consent = "Consent to this shit my nigga";
    }
    if (!signupForm.terms) {
      newErrors.terms = "accept this shit man!! terms an condition apply";
    }
  };
};

export default Auth;
