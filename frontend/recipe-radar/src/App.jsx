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
import { AuthVerify, getUserRole } from "./Auth/auth";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";
import AdminRoute from "./Components/AdminRoute";
import About from "./Pages/About";

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
              <Route path="/" element={<Home token={token} />} />

              <Route path="/profile" element={<Profile token={token} />} />
              <Route path="about" element={<About token={token} />} />
              <Route element={<AdminRoute token={token} />}>
                <Route path="users" element={<Users token={token} />} />
              </Route>
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
