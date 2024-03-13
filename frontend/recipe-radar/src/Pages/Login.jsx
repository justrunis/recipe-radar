import Footer from "../Components/Footer";
import Header from "../Components/Header";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { validateLoginData } from "../Helpers/validationUtils";
import { makePostRequest } from "../Helpers/databaseRequests";
import { variables } from "../Variables";

export default function Login({ handleLogin }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    error: null,
  });

  const [showError, setShowError] = useState({
    username: false,
    password: false,
  });

  const navigate = useNavigate();

  function handleLogin() {
    console.log("Login button clicked");
    setShowError({
      username: "",
      password: "",
    });
    setLoginData({
      ...loginData,
      error: "",
    });

    const validatedData = validateLoginData(loginData);

    if (validatedData.isValid) {
      const URL = variables.API_URL + "login";
      makePostRequest(URL, loginData)
        .then((response) => {
          if (response.error) {
            console.log(response.error);
            setLoginData({
              ...loginData,
              error: response.error,
            });
          } else {
            console.log(response);
            localStorage.setItem("jwtToken", response.token);
            navigate("/home");
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    } else {
      setShowError({
        username: validatedData.formErrors.username,
        password: validatedData.formErrors.password,
      });
    }
  }
  return (
    <>
      <Header />
      <div className="registration-container">
        <div className="registration-form">
          <h2>Login</h2>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              type="text"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              required
            />
            {showError.username && (
              <Typography color="error">{showError.username}</Typography>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
            {showError.password && (
              <Typography color="error">{showError.password}</Typography>
            )}
          </FormControl>
          {loginData.error && (
            <Typography color="error">{loginData.error}</Typography>
          )}
          <button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className="submit-button"
          >
            Login
          </button>
          <div>
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
