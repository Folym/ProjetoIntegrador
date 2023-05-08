import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export default function CampDoacaoMODAL(props) {
    console.log(props);
    if (props.dados != "") {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.dados.camp_nome}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Objetivo Campanha:</h5>
          <p>
          {props.dados.camp_desc}
          </p>
          <Row>
          <Col md> <h6>Data Inicio: {props.dados.camp_dtinicio.split("T")[0]}</h6> </Col>
          <Col md> <h6>Data Fim : {props.dados.camp_dtfim.split("T")[0]}</h6> </Col>
          </Row>
          <br></br>
          <Row> 
            <Col md> <h6>Local de Doação : {props.dados.camp_local}</h6> </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" ><Link to="/regDoacaoLProd" style={{color:"white"}}>Click aqui para Doar</Link></Button> 
          <Button  variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
    }
}