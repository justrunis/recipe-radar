import React, { useState } from "react";
import { variables } from "../Variables";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Typography,
  CircularProgress,
} from "@mui/material";
import { validateRegistrationData } from "../Helpers/validationUtils";
import { makePostRequest } from "../Helpers/databaseRequests";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    error: null,
  });

  const [showError, setShowError] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegistration() {
    setShowError({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    });
    setRegistrationData({
      ...registrationData,
      error: "",
    });

    const validatedData = validateRegistrationData(registrationData);

    if (validatedData.isValid) {
      try {
        const URL = variables.API_URL + "register";
        setIsLoading(true);
        const response = await makePostRequest(URL, registrationData);
        if (response.error) {
          setIsLoading(false);
          setRegistrationData({
            ...registrationData,
            error: response.error,
          });
        } else {
          setIsLoading(false);
          // Redirect to login page
          navigate("/login");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error registering user:", error);
        setRegistrationData({
          ...registrationData,
          error: "Error registering user",
        });
      }
    } else {
      setIsLoading(false);
      setShowError({
        username: validatedData.formErrors.username,
        password: validatedData.formErrors.password,
        confirmPassword: validatedData.formErrors.confirmPassword,
        email: validatedData.formErrors.email,
      });
    }
  }

  return (
    <>
      <Header />
      <div className="registration-container">
        <div className="registration-form my-5" onSubmit={handleRegistration}>
          <h2>Register</h2>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              type="text"
              value={registrationData.username}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  username: e.target.value,
                })
              }
              required
            />
            {showError.username && (
              <Typography color="error" variant="caption">
                {showError.username}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              value={registrationData.email}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  email: e.target.value,
                })
              }
              required
            />
            {showError.email && (
              <Typography color="error" variant="caption">
                {showError.email}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              value={registrationData.password}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  password: e.target.value,
                })
              }
              required
            />
            {showError.password && (
              <Typography color="error" variant="caption">
                {showError.password}
              </Typography>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={registrationData.confirmPassword}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
            {showError.confirmPassword && (
              <Typography color="error" variant="caption">
                {showError.confirmPassword}
              </Typography>
            )}
          </FormControl>
          {registrationData.error && (
            <Typography color="error" variant="caption">
              {registrationData.error}
            </Typography>
          )}
          <button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleRegistration}
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} style={{ color: "#ffd700" }} />
            ) : (
              "Register"
            )}
          </button>
          <div>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
