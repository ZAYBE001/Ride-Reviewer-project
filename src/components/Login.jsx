import React, { useState } from "react";

const Login = ({ onLogin, switchToSignup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(flase);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    //clear error whe the user types
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "username is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9]{4,20}$/.test(formData.username)) {
      newErrors.username = "username must be 4-20 characters";
      isValid = false;
    }
    if (!formData.password.length < 8) {
      newErrors.password =
        "password must ontain at least 1 number and 1 special character";
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password =
        "password must contain atleast 1 number and 1 special character";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(formData);

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      await onLogin(formData);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Login failed.please try again",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Log In</h2>

      {errors.general && <div className="error-message">{errors.general}</div>}

      <div className="form-group">
        <label htmlFor="username">Username</label>
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
        <label htmlFor="password">Password</label>
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
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      <div className="auth-switch">
        Don't have an account?{""}
        <button
          type="button"
          onClick={switchToSignup}
          className="switch-button"
        >
          signup
        </button>
      </div>
    </form>
  );
};

export default Login;
