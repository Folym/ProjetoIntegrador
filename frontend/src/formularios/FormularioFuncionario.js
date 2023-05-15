import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarFuncionarios} from "../redux/redutores/FuncionariosSlice";
import { STATUS } from '../redux/redutores/FuncionariosSlice'
import { IMaskInput } from "react-imask";


 export default function FormCadastroFunc(props) {
  const [validado, setValidado] = useState(false);

  const dispatch =useDispatch();//despacha ações para redutores da store

//PRincipal estado do componente formulario de cadastro de cleinte- quando inicai a pagina, vem com esse valores
  const [funcionario,setFuncionario] = useState({
    codigo:"",
    nome:"",
    cpf:"",
    cel:"",
    email:"",
    end:"",
    numend:"",
    cep:""

  });

  const {status}= useSelector(state=>state.funcionarios)

  const manipularMudanca = (evento) =>{
    setFuncionario({...funcionario,[evento.target.name]:evento.target.value})
  }
  const apenasLetras = (evento) =>{
    setFuncionario({...funcionario,[evento.target.name]:evento.target.value.replace(/[^a-z \u00C0-\u00FF]/gi, '').toUpperCase()})
    //Codigo regex para aceitar apenas letras espaço e acentos
  }

  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {

      //funcionario.cel.replace(/[^0-9]/g, '');
      
      dispatch(adicionarFuncionarios(funcionario));
      setFuncionario({
        codigo:"",
        nome:"",
        cpf:"",
        cel:"",
        email:"",
        end:"",
        numend:"",
        cep:""
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
                    {} Buscando Funcionarios
              </Button>
      </Container>
  )
  } else  if (status === STATUS.CARREGADO) {
    return (
      <Form method ="POST" action="/funcionario"  className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                  required
                  type="text"
                  maxlength="14"
                  as={IMaskInput}
                  mask="000.000.000-00"
                  placeholder="Informe seu CPF"
                  defaultValue=""
                  id='cpf'
                  name='cpf'
                  value ={funcionario.cpf}
                  onChange={manipularMudanca}
              />
              <Form.Control.Feedback>Ok</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu CPF</Form.Control.Feedback>
              </Form.Group>
          </Row>
      <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="50"
              placeholder="Informe seu nome"
              defaultValue=""
              id='nome'
              name='nome'
              value={funcionario.nome}
              onChange={apenasLetras}
            />
            <Form.Control.Feedback>Ok</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe seu Nome</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              required
              type="text"
              maxlength="50"
              placeholder="Informe seu Endereço"
              defaultValue=""
              id='end'
              name='end'
              value={funcionario.end}
              onChange={apenasLetras}
            />
            <Form.Control.Feedback>Ok</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe seu Endereço</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Nº Endereço</Form.Label>
              <Form.Control
                  type="text"
                  maxlength="6"
                  placeholder="Informe seu Numero de Endereço"
                  as={IMaskInput}
                  mask="000000"
                  required
                  id='numend'
                  name='numend'
                  value={funcionario.numend}
                  onChange={manipularMudanca}
                  
              />
              <Form.Control.Feedback>Ok</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Nº Endereço</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" >
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Email"
              required
              maxlength="100"
              id='email'
              name='email'
              value={funcionario.email}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Email</Form.Control.Feedback>
            
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>Nº de Telefone</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Celular" 
              required 
              id='cel'
              name='cel'
              maxlength="14"
              as={IMaskInput}
              mask="(00)00000-0000"
              value={funcionario.cel} //.replace(/[^\d]/g, '') regex pra tirar a mascara
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Nº de Telefone</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>CEP</Form.Label>
            <Form.Control type="text" placeholder="CEP" required 
              id='cep'
              name='cep'
              as={IMaskInput}
              maxlength="9"
              mask="00000-000"
              value={funcionario.cep}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu CEP</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Cadastrar</Button>
        <Button type ="button" style={{margin:"15px"}}  variant="secondary" onClick={()=> {props.onTabela(true)}}>Lista de Funcionários</Button>
      </Form>
    );
  }
}