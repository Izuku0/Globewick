import React from "react";
import { useForm } from "react-hook-form";
import "../index.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Login successful");
        reset(); // Clear the form after successful login
        navigate("/Home");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Password Field */}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        {/* Submit Button */}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginPage;
