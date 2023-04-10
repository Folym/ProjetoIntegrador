import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarJovens} from "../redux/redutores/JovensSlice";
import { STATUS } from '../redux/redutores/JovensSlice'

 export default function FormCadastroJovem(props) {
  const [validado, setValidado] = useState(false);

  const dispatch =useDispatch();//despacha ações para redutores da store

//PRincipal estado do componente formulario de cadastro de cleinte- quando inicai a pagina, vem com esse valores
  const [jovem,setJovem] = useState({
    nome:"",
    cpf:"",
    nomepai:"",
    nomemae:"",
    idade:0,
    sexo:"",
    status:"",
  });

  const {status}= useSelector(state=>state.jovens)

  const manipularMudanca = (evento) =>{
    setJovem({...jovem,[evento.target.name]:evento.target.value})
  }

  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      
      
      dispatch(adicionarJovens(jovem));
      setJovem({
        nome:"",
        cpf:"",
        idade:0,
        nomepai: "",
        nomemae:"",
        sexo:"",
        status :""
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
                    {} Buscando jovens
              </Button>
      </Container>
  )
  } else  if (status === STATUS.CARREGADO) {
    return (
      <Form method ="POST" action="/jovem"  className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                  required
                  type="text"
                  placeholder="Informe seu CPF."
                  defaultValue=""
                  id='cpf'
                  name='cpf'
                  value ={jovem.cpf}
                  onChange={manipularMudanca}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu CPF</Form.Control.Feedback>
              </Form.Group>
          </Row>
      <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>Nome Jovem.</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informe o nome do Jovem."
              defaultValue=""
              id='nome'
              name='nome'
              value={jovem.nome}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe o nome do Jovem.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Nome da mãe.</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Informe seu Nome da mãe"
              defaultValue=""
              id='nomemae'
              name='nomemae'
              value={jovem.nomemae}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>Informe o nome da mãe.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Nome do Pai.</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Informe o nome do pai."
                  required
                  id='nomepai'
                  name='nomepai'
                  value={jovem.nomepai}
                  onChange={manipularMudanca}
                  
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe o nome do pai.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" >
            <Form.Label>Idade</Form.Label>
            <Form.Control type="text" placeholder="Idade" required
              id='idade'
              name='idade'
              value={jovem.idade}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe sua Idade</Form.Control.Feedback>
            
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>Informe o sexo do Jovem.</Form.Label>
            <Form.Control type="text" placeholder="Informe o sexo do Jovem." required 
              id='sexo'
              name='sexo'
              value={jovem.sexo}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe o sexo do Jovem.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" placeholder="Status" required 
              id='status'
              name='status'
              value={jovem.status}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Status</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Cadastrar</Button>
        <Button type ="button" style={{margin:"15px"}}  variant="secondary" onClick={()=> {props.onTabela(true)}}>Lista de jovens</Button>
      </Form>
    );
  }
}