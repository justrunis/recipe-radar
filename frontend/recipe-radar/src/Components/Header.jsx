import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import RadarIcon from "@mui/icons-material/Radar";
import { useNavigate } from "react-router-dom";
import { getUserRole, getUsername } from "../Auth/auth";

export default function Header({ token }) {
  const navigate = useNavigate();
  const role = getUserRole(token);
  console.log(role);

  function handleLogout() {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  }

  return (
    <header>
      <Navbar className="header" expand="lg">
        <Navbar.Brand href="/">
          Recipe Radar <RadarIcon />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!token && (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
            {token && (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </>
            )}
            {token && role === "admin" && (
              <>
                <Nav.Link href="/users">Users</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ml-auto">
            {token && (
              <>
                <Nav.Link href="/profile">{getUsername(token)}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
