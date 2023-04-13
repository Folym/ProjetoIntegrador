import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarPretendentes} from "../redux/redutores/PretendentesSlice";
import { STATUS } from '../redux/redutores/PretendentesSlice'

 export default function FormCadastroPret(props) {
  const [validado, setValidado] = useState(false);

  const dispatch =useDispatch();//despacha ações para redutores da store

//PRincipal estado do componente formulario de cadastro de cleinte- quando inicai a pagina, vem com esse valores
  const [pretendente,setPretendente] = useState({
    cpf:"",
    nome:"",
    numend:0,
    end:"",
    email:"",
    status:"",
    cep:0,
    cel :""
  });

  const {status}= useSelector(state=>state.pretendentes)

  const manipularMudanca = (evento) =>{
    setPretendente({...pretendente,[evento.target.name]:evento.target.value})// esse ... faz um copia da cosntante cliente, podendo adiconar novos valores ou até atualizar, ou seja, a cada letra ele atualiza
    // [evento.target.name]:evento.target.value}
    // cpf:""  --  é isso que signfica esse parte do evento
  }

  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      
      
      dispatch(adicionarPretendentes(pretendente));
      setPretendente({
        cpf:"",
        nome:"",
        numend:0,
        end:"",
        email:"",
        status:"",
        cep:0,
        cel :""
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
                    {} Buscando Pretendentes
              </Button>
      </Container>
  )
  } else  if (status === STATUS.CARREGADO) {
    return (
      <Form method ="POST" action="/pretendente"  className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                  required
                  type="text"
                  placeholder="Informe seu CPF"
                  defaultValue=""
                  id='cpf'
                  name='cpf'
                  value ={pretendente.cpf}
                  onChange={manipularMudanca}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu CPF</Form.Control.Feedback>
              </Form.Group>
          </Row>
      <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informe seu nome"
              defaultValue=""
              id='nome'
              name='nome'
              value={pretendente.nome}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe seu Nome</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informe seu Endereço"
              defaultValue=""
              id='end'
              name='end'
              value={pretendente.end}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe seu Endereço</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Nº Endereço</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Informe seu Numero de Endereço"
                  required
                  id='numend'
                  name='numend'
                  value={pretendente.numend}
                  onChange={manipularMudanca}
                  
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Nº Endereço</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" >
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" required
              id='email'
              name='email'
              value={pretendente.email}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Email</Form.Control.Feedback>
            
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>Nº de Telefone</Form.Label>
            <Form.Control type="text" placeholder="Celular" required 
              id='cel'
              name='cel'
              value={pretendente.cel}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Nº de Telefone</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>CEP</Form.Label>
            <Form.Control type="text" placeholder="CEP" required 
              id='cep'
              name='cep'
              value={pretendente.cep}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu CEP</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" placeholder="Status" required 
              id='status'
              name='status'
              value={pretendente.status}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Status</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Cadastrar</Button>
        <Button type ="button" style={{margin:"15px"}}  variant="secondary" onClick={()=> {props.onTabela(true)}}>Lista Pretendentes</Button>
      </Form>
    );
  }
}