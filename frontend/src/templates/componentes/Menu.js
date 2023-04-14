import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';


export default function Menu(props) {
    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} bg="warning" expand={expand} className="mb-3">
                <Container fluid>
                    <Navbar.Brand href="#">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown
                            title="Cadastros"
                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                            <NavDropdown.Item ><Link to="/cadPretendentes" > Pretendentes </Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item ><Link to="/cadJovens" > Jovens </Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item ><Link to="/cadDoacao" > Doação </Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item ><Link to="/cadFuncionarios" > Funcionários </Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                            Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
                </Navbar>
            ))}
        </>
    );
}