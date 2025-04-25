//this Auth will handle both login and sign up
import React, { useState } from "react";
import validator from "validator";
import "../App.css";

const Auth = ({ onLogin, onSignup }) => {
  const [islogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
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
      newErrors.email = "please enter a valid email address";
    }
    if (loginForm.password.length < 8) {
      newErrors.password = "password must be atleast 8 characters";
    }
    return newErrors; // this returns new validation errors after actual checks
    // const errors = validateLogin();
    // if (Object.keys(errors).length > 0) {
    //   setErrors(errors); // show errors in the UI
    // } else {
    //   onLogin(loginForm); // proceed to login
    // }
    // const errors = validateLogin();
    // if (Object.keys(errors).length === 0) {
    // } else {
    //   setErrors(errors);
    //   return;
    // }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Show errors in the UI
    } else {
      setLoginForm(true);
      onLogin(loginForm)
        .then(() => {
          setIsLogin(true);
        })
        .catch((err) => {
          setErrors({ form: err.message });
        })
        .finally(() => setLoading(false)); // Always stops loading
    }
  };
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
      newErrors.email = "Please enter a valid email address";
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
      newErrors.consent = "Consent to the processing of your data";
    }
    if (!signupForm.terms) {
      newErrors.terms = "accept this trems and onditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateSignup()) {
      setLoading(true);
      onSignup(signupForm)
        .then(() => setLogin(true))
        .catch((err) => {
          setErrors({ form: err.message });
        })
        .finally(() => setLoading(false));
    }
  };
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <h2>Login</h2>

          {errors.form && <div className="error-message">{errors.form}</div>}

          <div className={`form-group ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="login-email">Email:</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className={`form-group ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-switch">
            Don't have an account?{" "}
            <button type="button" onClick={() => setIsLogin(false)}>
              Sign up
            </button>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignupSubmit}>
          <h2>Sign Up</h2>

          {errors.form && <div className="error-message">{errors.form}</div>}

          <div className="form-row">
            <div
              className={`form-group ${errors.firstName ? "has-error" : ""}`}
            >
              <label htmlFor="first-name">First Name*</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={signupForm.firstName}
                onChange={handleSignupChange}
                required
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            <div className={`form-group ${errors.lastName ? "has-error" : ""}`}>
              <label htmlFor="last-name">Last Name*</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={signupForm.lastName}
                onChange={handleSignupChange}
                required
              />
              {errors.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className={`form-group ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="signup-email">Email*</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className={`form-group ${errors.birthDate ? "has-error" : ""}`}>
            <label htmlFor="birth-date">When were you born?*</label>
            <input
              type="month"
              id="birth-date"
              name="birthDate"
              value={signupForm.birthDate}
              onChange={handleSignupChange}
              required
            />
            {errors.birthDate && (
              <span className="error-text">{errors.birthDate}</span>
            )}
          </div>

          <div className={`form-group ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="signup-password">Password*</label>
            <input
              type="password"
              id="signup-password"
              name="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              required
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
            <div className="password-hints">
              Password must contain:
              <ul>
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one number</li>
              </ul>
            </div>
          </div>

          <div
            className={`form-group ${
              errors.confirmPassword ? "has-error" : ""
            }`}
          >
            <label htmlFor="confirm-password">Confirm Password*</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={signupForm.confirmPassword}
              onChange={handleSignupChange}
              required
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <div
            className={`form-group checkbox-group ${
              errors.consent ? "has-error" : ""
            }`}
          >
            <input
              type="checkbox"
              id="data-consent"
              name="consent"
              checked={signupForm.consent}
              onChange={handleSignupChange}
              required
            />
            <label htmlFor="data-consent">
              I consent to the processing of my personal data*
            </label>
            {errors.consent && (
              <span className="error-text">{errors.consent}</span>
            )}
          </div>

          <div
            className={`form-group checkbox-group ${
              errors.terms ? "has-error" : ""
            }`}
          >
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={signupForm.terms}
              onChange={handleSignupChange}
              required
            />
            <label htmlFor="terms">
              I agree to the Terms and Conditions and Privacy Policy*
            </label>
            {errors.terms && <span className="error-text">{errors.terms}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="auth-switch">
            Already have an account?{" "}
            <button type="button" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Auth;
