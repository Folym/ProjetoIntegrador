import React, { useEffect,useState,useRef } from 'react';
import { Container, Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { buscarProduto } from '../redux/redutores/ProdutoSlice.js';
import { useDispatch, useSelector } from "react-redux";
import { adicionarDoacao } from "../redux/redutores/DoacaoLDinSlice.js";
import { STATUS } from '../redux/redutores/DoacaoLDinSlice.js';

export default function FormCadastroDoac(props) {
  const [validado, setValidado] = useState(false);
  const dispatch = useDispatch();

  const componenteSelecao = useRef();

  useEffect(()=>{
    dispatch(buscarProduto());
  },[]);


  const [doacao, setDoacao] = useState({
    valor: "",
    data: "",
    desc: "",
    campcod:""
  });



  const { status,dados } = useSelector(state => state.doacao)

  
  const manipularMudanca = (evento) => {
    setDoacao({ ...doacao, [evento.target.name]: evento.target.value })

  }

  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(adicionarDoacao(doacao));
      setDoacao({
        valor:"",
        data: "",
        desc: "",
        campcod:""
      })
      setValidado(false)
    } else {
      setValidado(true);
    }
    event.preventDefault();
    event.stopPropagation();
  };

  if (status === STATUS.OCIOSO) {
    return (
      <Container>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          { } Buscando Doacao
        </Button>
      </Container>
    )
  } else if (status === STATUS.CARREGADO) {
    return (

      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title classname="col-md-5 mx-auto">Registrar Doação</Modal.Title>
          </Modal.Header>
          <Form method="POST" action="/doacao" className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
            <Modal.Body>
            <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Informe o valor que irá doar"
                    required
                    id='valor'
                    name='valor'
                    value={doacao.valor}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Informe um valor valido</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Data</Form.Label>
                  <Form.Control type="date" placeholder="data" required
                    id='data'
                    name='data'
                    value={doacao.data}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Informe a data para busca</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb">
                <Form.Group as={Col}>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control type="text" placeholder="Descricao" required
                    id='desc'
                    name='desc'
                    value={doacao.desc}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Informe uma descrição</Form.Control.Feedback>
                </Form.Group>
              </Row>
              {/* <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label column sm={2}>Campanha</Form.Label>
                  <Form.Select ref={componenteSelecao}>
                        {
                            dados.map((camp) => {
                                return <option key={camp.camp_codigo} value={camp.camp_codigo}>
                                      {camp.camp_nome}  
                                </option>
                            })
                        }
                    </Form.Select>
                  <Form.Control.Feedback type='invalid'>Campanha invalida</Form.Control.Feedback>
                </Form.Group>
              </Row> */}
              <Stack gap={2}>
                <Button type="submit" className="col-md-5 mx-auto" style={{ margin: "5px" }}>Registrar Doação</Button>
                <Button type="button" className="col-md-5 mx-auto" style={{ margin: "5px" }} variant="secondary" onClick={() => { props.onTabela(true) }}>Lista Doacao</Button>
              </Stack>
            </Modal.Body>
          </Form>
        </Modal.Dialog>
      </div>
    );
  }
}