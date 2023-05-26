import React, { useEffect,useState,useRef } from 'react';
import { Container, Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarDoacao } from "../redux/redutores/DoacaoLProdSlice.js";
import { buscarProduto } from '../redux/redutores/ProdutoSlice.js';
import { STATUS } from '../redux/redutores/DoacaoLProdSlice.js';
import { buscarCampanhas } from '../redux/redutores/CampDoacaoSlice.js';

export default function FormCadastroDoac(props) {
  const dispatch = useDispatch();
  const [validado, setValidado] = useState(false);
  const componenteSelecao = useRef();
  const { statusLProd } = useSelector(state => state.doacaoLProd);
  const { dadosPr } = useSelector(state => state.produto);
  const { dadosCamp} = useSelector(state => state.campanhas)
  

  useEffect(()=>{
    dispatch(buscarProduto());
  },[]);

  useEffect(()=>{
    dispatch(buscarCampanhas());
  },[])

  const [doacao, setDoacao] = useState({
    prodcod: "",
    tipo:"LP",
    quant: "",
    data: "",
    desc: "",
    campcod:""
  });




  
  const manipularMudanca = (evento) => {
    console.log(evento.target.name)
    console.log(evento.target.value);
    setDoacao({ ...doacao, [evento.target.name]: evento.target.value });
  }
  
  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(adicionarDoacao(doacao));
      setDoacao({
        prodcod: "",
        tipo:"LP",
        quant: "",
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

  if (statusLProd === STATUS.OCIOSO) {
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
  } else if (statusLProd === STATUS.CARREGADO) {
    return (

      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title classname="col-md-5 mx-auto">Registrar Doação Presencial de Produtos</Modal.Title>
          </Modal.Header>
          <Form method="POST" action="/doacao" className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
            <Modal.Body>
            <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label column sm={2}>Produto</Form.Label>
                  <Form.Select aria-label="Produto" name = "prodcod" onChange = {manipularMudanca} ref={componenteSelecao}>
                        {
                            dadosPr.map((produto) => {
                                return <option key={produto.prod_codigo} value={produto.prod_codigo}>
                                      {produto.prod_nome}  
                                </option>
                            })
                        }
                    </Form.Select>
                  <Form.Control.Feedback type='invalid'>Produto invalido</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Informe a quantidade de produtos"
                    required
                    id='quant'
                    name='quant'
                    value={doacao.quant}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Informe uma quantidade valida</Form.Control.Feedback>
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
                  <Form.Control.Feedback type='invalid'>Informe a data de entrega</Form.Control.Feedback>
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
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label column sm={2}>Campanha</Form.Label>
                  <Form.Select aria-label="Campanha" name = "campcod" onChange = {manipularMudanca} ref={componenteSelecao}>
                        {
                            dadosCamp.map((camp) => {
                                return <option key={camp.camp_codigo} value={camp.camp_codigo}>
                                      {camp.camp_nome}  
                                </option>
                            })
                        }
                    </Form.Select>
                  <Form.Control.Feedback type='invalid'>Campanha invalida</Form.Control.Feedback>
                </Form.Group>
              </Row> 
              <Stack gap={2}>
                <Button type="submit" className="col-md-5 mx-auto" style={{ margin: "5px" }}>Registrar Doação</Button>
                <Button type="button" className="col-md-5 mx-auto" style={{ margin: "5px" }} variant="secondary" onClick={() => { props.onTabela(true) }}>Lista Doação</Button>
              </Stack>
            </Modal.Body>
          </Form>
        </Modal.Dialog>
      </div>
    );
  }
}