import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../index.css";

function SignupPage() {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://globewick.onrender.com/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("User registered");
        reset(); 
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Register error", error);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName", { required: "First Name is required" })}
          type="text"
          placeholder="First Name"
        />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}

        <input
          {...register("lastName", { required: "Last Name is required" })}
          type="text"
          placeholder="Last Name"
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}

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

        <input
          {...register("countryCode", { required: "Country Code is required" })}
          type="text"
          placeholder="Country Code"
        />
        {errors.countryCode && <p className="error">{errors.countryCode.message}</p>}

        <input
          {...register("phoneNumber", {
            required: "Phone Number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Invalid phone number format",
            },
          })}
          type="text"
          placeholder="Phone Number"
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}

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

        <input
          {...register("confirmPassword", { required: "Confirm Password is required" })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <input
          {...register("dob", { required: "Date of Birth is required" })}
          type="date"
        />
        {errors.dob && <p className="error">{errors.dob.message}</p>}

        <select {...register("gender", { required: "Gender is required" })}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="error">{errors.gender.message}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
