import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default function Header() {
  return (
    <Navbar className="header" expand="lg">
      <Navbar.Brand href="/">Recipe Radar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
