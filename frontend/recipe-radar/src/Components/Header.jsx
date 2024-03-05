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
          <Nav className="mr-auto"></Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
