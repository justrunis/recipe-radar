import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import RadarIcon from "@mui/icons-material/Radar";

export default function Header() {
  return (
    <header>
      <Navbar className="header" expand="lg">
        <Navbar.Brand href="/">
          Recipe Radar <RadarIcon />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
