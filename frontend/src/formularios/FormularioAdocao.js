import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarAdocoes } from "../redux/redutores/AdocaoSlice.js";
import { STATUS } from '../redux/redutores/AdocaoSlice.js'
import Select from "react-select";
import {buscarPretendentes} from '../redux/redutores/PretendentesSlice.js';
import { buscarJovens } from '../redux/redutores/JovensSlice.js';

 export default function FormCadastroAdocao(props) {
  const [validado, setValidado] = useState(false);

  const dispatch = useDispatch();//despacha ações para redutores da store

  // const opcoes = [
  //   { value: "Gabriel Carrocini Tamaoki", label: "Gabriel Carrocini Tamaoki" },
  //   { value: "Heitor José", label: "Heitor José" },
  //   { value: "Henrique Maioli Pelegrini", label: "Henrique Maioli Pelegrini" },
  //   { value: "Marcelo", label: "Marcelo" },
  //   { value: "Marcela", label: "Marcela" },
  //   { value: "Julia", label: "Julia" },
  //   { value: "Ana", label: "Ana" },
  //   { value: "Fernanda", label: "Fernanda" },
  //   ];

  const {dados} = useSelector(state => state.pretendentes);
  const {dadosJovem} = useSelector(state => state.jovens)


  useEffect(()=>{
    dispatch(buscarPretendentes());
}, []);


const arrayPret= [];
dados.map(pret =>{arrayPret.push({"value":pret.pret_codigo ,"label" : pret.pret_nome});});



//PRincipal estado do componente formulario de cadastro de cleinte- quando inicai a pagina, vem com esse valores
  const [adocao,setAdocao] = useState({
    pret_cod1:"",
    pret_cod2:"",
    jov_cod:"",
    status :"",
  });

  const {status}= useSelector(state=>state.adocoes)

  const manipularMudanca = (evento) =>{
    setAdocao({...adocao,[evento.target.name]:evento.target.value})
  }

  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    

    if (form.checkValidity() === true) {
      
      
      dispatch(adicionarAdocoes(adocao));
      setAdocao({
        pret_cod1:"",
        pret_cod2:"",
        jov_cod:"",
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
                    {} Buscando adocoes
              </Button>
      </Container>
  )
  } else  if (status === STATUS.CARREGADO) {
    return (
      <Form method ="POST" action="/adocao"  className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
       <Row className = "mb-3">
        <p>Primeiro Pretendente</p>
        <Select isMulti options={arrayPret} id='pret_cod1' name='pret_cod1' value={adocao.pret_cod1}/>
        <hr/>
        <p>Segundo Pretendente</p>
        <Select options={arrayPret} placeholder="Pretendente 2" id='pret_cod2' name='pret_cod2' value={adocao.pret_cod2}/>
        <hr/>
        <p>Jovem</p>
        <Select options={arrayJov} placeholder="Nome do Jovem" id='jov_cod' name='jov_cod' value={adocao.jov_cod}/>
        <hr/>
       </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" >
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" placeholder="Status" required 
              id='status'
              name='status'
              value={adocao.status}
              onChange={manipularMudanca}
            />
            <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>Informe seu Status</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Cadastrar</Button>
        <Button type ="button" style={{margin:"15px"}}  variant="secondary" onClick={()=> {props.onTabela(true)}}>Lista de adocoes</Button>
      </Form>
    );
  }
}