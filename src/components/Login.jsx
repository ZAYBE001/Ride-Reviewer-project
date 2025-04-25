import React, { useState } from "react";

const Login = ({ onLogin, switchToSignup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Log In</h2>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
