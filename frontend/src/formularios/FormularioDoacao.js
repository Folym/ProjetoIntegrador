import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarDoacao} from "../redux/redutores/DoacaoSlice";
import { STATUS } from '../redux/redutores/DoacaoSlice'

 export default function FormCadastroDoac(props) {
  const [validado, setValidado] = useState(false);

  const dispatch =useDispatch();
  const [doacao,setDoacao] = useState({
    tipo:"",
    end:"",
    numend:"",
    cep:"",
    quant:"",
    valor:"",
    data:"",
    desc :""
  });

  const {status}= useSelector(state=>state.doacao)

  const manipularMudanca = (evento) =>{
    setDoacao({...doacao,[evento.target.name]:evento.target.value})// esse ... faz um copia da cosntante cliente, podendo adiconar novos valores ou até atualizar, ou seja, a cada letra ele atualiza

  }

  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      
      
      dispatch(adicionarDoacao(doacao));
      setDoacao({
        tipo:"",
        end:"",
        numend:"",
        cep:"",
        quant:"",
        valor:"",
        data:"",
        desc :""
      })
      setValidado(false)
    }else{
      setValidado(true);
    }
    event.preventDefault();
    event.stopPropagation();
   
  };

  if (status === STATUS.OCIOSO) {
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
                    {} Buscando Doacao
              </Button>
      </Container>
  )
  } else  if (status === STATUS.CARREGADO) {
    return (
      <Form method ="POST" action="/doacao"  className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                  required
                  type="text"
                  placeholder="Informe o tipo da doação"
                  defaultValue=""
                  id='tipo'
                  name='tipo'
                  value ={doacao.tipo}
                  onChange={manipularMudanca}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Tipo invalido</Form.Control.Feedback>
              </Form.Group>
          </Row>
      <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informe seu endereço"
              defaultValue=""
              id='end'
              name='end'
              value={doacao.end}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe seu endereço</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Numero de Endereço</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informe o numero do seu endereço"
              defaultValue=""
              id='numend'
              name='numend'
              value={doacao.numend}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe o numero do endereço</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>CEP</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Informe seu CEP"
                  required
                  id='cep'
                  name='cep'
                  value={doacao.cep}
                  onChange={manipularMudanca}
                  
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu CEP</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" >
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
          <Form.Group as={Col} md="3" >
            <Form.Label>Data</Form.Label>
            <Form.Control type="text" placeholder="data" required 
              id='data'
              name='data'
              value={doacao.data}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe a data atual</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" placeholder="Descricao" required 
              id='desc'
              name='desc'
              value={doacao.cep}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe uma descrição</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Cadastrar</Button>
        <Button type ="button" style={{margin:"15px"}}  variant="secondary" onClick={()=> {props.onTabela(true)}}>Lista Doacao</Button>
      </Form>
    );
  }
}