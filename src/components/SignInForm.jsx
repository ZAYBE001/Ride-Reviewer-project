import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    consent: false,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    consent: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkedbox" ? checked : value,
    }));
    //clear errors when the user types
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      consent: "",
    };
    //first name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    // Username validation (same as login)
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9]{4,20}$/.test(formData.username)) {
      newErrors.username = "Username must be 4-20 alphanumeric characters";
      isValid = false;
    }
    // Password validation (same as login but with confirmation)
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least 1 number and 1 special character";
      isValid = false;
    }
    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    // Consent validation
    if (!formData.consent) {
      newErrors.consent = "You must consent to data processing";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      // Remove confirmPassword from the data we send to the server
      const { confirmPassword, consent, ...signUpData } = formData;
      await onSignUp(signUpData);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Sign up failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Create Your Account</h2>

      {errors.general && <div className="error-message">{errors.general}</div>}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name*</label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "error" : ""}
            required
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name*</label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? "error" : ""}
            required
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="username">Username*</label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? "error" : ""}
          required
        />
        {errors.username && (
          <span className="error-message">{errors.username}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password*</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
          required
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
        <div className="password-hints">
          <span>Password must contain:</span>
          <ul>
            <li className={formData.password.length >= 8 ? "valid" : ""}>
              At least 8 characters
            </li>
            <li className={/(?=.*\d)/.test(formData.password) ? "valid" : ""}>
              At least 1 number
            </li>
            <li
              className={
                /(?=.*[!@#$%^&*])/.test(formData.password) ? "valid" : ""
              }
            >
              At least 1 special character
            </li>
          </ul>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password*</label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? "error" : ""}
          required
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="birthDate">When were you born?*</label>
        <input
          id="birthDate"
          type="month"
          value={formData.birthDate}
          onChange={handleChange}
          className={errors.birthDate ? "error" : ""}
          required
        />
        {errors.birthDate && (
          <span className="error-message">{errors.birthDate}</span>
        )}
      </div>

      <div className="form-group checkbox-group">
        <input
          id="consent"
          type="checkbox"
          checked={formData.consent}
          onChange={handleChange}
          className={errors.consent ? "error" : ""}
          required
        />
        <label htmlFor="consent">
          I consent to the processing of my personal data*
        </label>
        {errors.consent && (
          <span className="error-message">{errors.consent}</span>
        )}
      </div>

      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignInForm;
