import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import RadarIcon from "@mui/icons-material/Radar";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../Auth/auth";

export default function Header({ token }) {
  const navigate = useNavigate();
  const role = getUserRole(token);

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
                <Nav.Link href="/home">Home</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ml-auto">
            {token && (
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
