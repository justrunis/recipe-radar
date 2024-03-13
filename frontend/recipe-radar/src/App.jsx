import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useState } from "react";
import { AuthVerify } from "./Auth/auth";
import Profile from "./Pages/Profile";

export const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  const handleLogin = (token) => {
    setToken(token);
  };

  AuthVerify(token);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute token={token} />}>
              <Route path="/home" element={<Home token={token} />} />
              <Route path="profile" element={<Profile token={token} />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
