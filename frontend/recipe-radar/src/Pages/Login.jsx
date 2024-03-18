import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { FormControl, Input, InputLabel, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { validateLoginData } from "../Helpers/validationUtils";
import { variables } from "../Variables";
import { CircularProgress } from "@mui/material";

export default function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    error: null,
  });

  const [showError, setShowError] = useState({
    username: false,
    password: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleLogin() {
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
      setIsLoading(true);
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setIsLoading(false);
            return response.json();
          } else {
            return response.json().then((error) => {
              setIsLoading(false);
              console.log("error", error.error);
              setLoginData({ ...loginData, error: error.error });
              throw new Error(error);
            });
          }
        })
        .then((data) => {
          setIsLoading(false);
          localStorage.setItem("jwtToken", data.token);
          onLogin(data.token);
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error logging in:", error);
        });
    } else {
      setIsLoading(false);
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
        <div className="registration-form my-5">
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
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} style={{ color: "#ffd700" }} />
            ) : (
              "Login"
            )}
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
