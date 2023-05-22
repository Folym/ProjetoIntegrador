import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarProduto} from "../redux/redutores/ProdutoSlice.js";
import { STATUS } from '../redux/redutores/ProdutoSlice.js'

 export default function FormCadastroProd(props) {
  const [validado, setValidado] = useState(false);
  const dispatch = useDispatch();


  const [produto,setProduto] = useState({
        nome:"",
        desc:""
  });
  
  const {statusPr} = useSelector(state=>state.produto);
  
  const manipularMudanca = (evento) =>{
    setProduto({...produto,[evento.target.name]:evento.target.value})
  }
  
    const manipularEnvioDados = (event) => {

    const form = event.currentTarget;
        if (form.checkValidity() === true) {
        dispatch(adicionarProduto(produto));
        setProduto({
            nome:"",
            desc:""
        })
        setValidado(false)
        }else{
        setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };
  if (statusPr === STATUS.OCIOSO) {
    return(
      <Container>
              <Button variant="primary" disabled>
                  <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      />
                    {} Buscando Produto
              </Button>
      </Container>
  )
  } else  if (statusPr === STATUS.CARREGADO) {
    return (
      <Form method ="POST" action="/produto" className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>

      <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informe o nome do produto"
              defaultValue=""
              id='nome'
              name='nome'
              value={produto.nome}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe o Nome do produto</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Insira uma descrição do produto</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informe a descrição do produto"
              defaultValue=""
              id='desc'
              name='desc'
              value={produto.desc}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe a Descrição</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Cadastrar</Button>
        <Button type ="button" style={{margin:"15px"}}  variant="secondary" onClick={()=> {props.onTabela(true)}}>Lista Produto</Button>
      </Form>
    );
  }else if(statusPr === STATUS.ERRO){
    console.log("erro");
  }
}