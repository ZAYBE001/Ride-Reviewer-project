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
};
