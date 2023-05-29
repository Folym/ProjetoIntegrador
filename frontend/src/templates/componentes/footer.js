import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import foto from "../facebook.png"

export default function Footer(){
    return (
        // <Navbar expand="lg" bg="light" >
        //     <Container fluid  style={{"background-color":"#FFC107"}}>
        //         <Navbar.Brand href="#">Navbar</Navbar.Brand>
        //     </Container>
        // </Navbar>

        <Navbar key={false} bg="warning" expand={false}  className="mt-5">
        <Container >
            <Row className='' >
                <Col  style={{marginLeft:"5em",color:"#0B4181"}} >
                <h2 >Contato</h2>
                <p >- 18 3361-2583</p>
                <p>- 18 3361-1469</p>
                <p>- casalar@outlook.com</p>
                <p>- Paraguaçu Paulista - SP</p>
                </Col>
                <Col  style={{marginLeft:"30em",color:"#0B4181"}}>
                     <h2>Redes Sociais</h2>
                     <a href="https://www.facebook.com/profile.php?id=100008390238048">
                        <img src={foto} style={{ height: "100px" }} />
                    </a>
                </Col>
                
            </Row>

        </Container>
        </Navbar>
    );
}