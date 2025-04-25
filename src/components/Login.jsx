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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
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
