import React, { useState } from 'react';
import { Alert, Card, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarCampanhas} from "../redux/redutores/CampDoacaoSlice";
import { STATUS } from '../redux/redutores/CampDoacaoSlice'
import CardHeader from 'react-bootstrap/esm/CardHeader';

export default function FormCadastroCampDoacao(props){
    const [validado, setValidado] = useState(false);

    const dispatch =useDispatch();//despacha ações para redutores da store
  
  //PRincipal estado do componente formulario de cadastro de cleinte- quando inicai a pagina, vem com esse valores
    const [campanha,setCampanha] = useState({
      nome:"",
      descri:"",
      finalizado:"N",
      dtInicio :"",
      dtFim:"",
      img :""
    });
  
    const {status}= useSelector(state=>state.campanhas)
  
    const manipularMudanca = (evento) =>{
      setCampanha({...campanha,[evento.target.name]:evento.target.value})// esse ... faz um copia da cosntante cliente, podendo adiconar novos valores ou até atualizar, ou seja, a cada letra ele atualiza
      // [evento.target.name]:evento.target.value}
      // cpf:""  --  é isso que signfica esse parte do evento
    }
  
    const manipularEnvioDados = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        
        
        dispatch(adicionarCampanhas(campanha));
        setCampanha({
            nome:"",
            descri:"",
            finalizado:"N",
            dtInicio :"",
            dtFim:"",
            img :""
        })
        setValidado(false)
      }else{
        setValidado(true);
      }
      event.preventDefault();
      event.stopPropagation();
     
    };
  
    // if (status === STATUS.OCIOSO) {
    //   return(
    //     <Container>
    //             <Button variant="primary" disabled>
    //                 <Spinner
    //                     as="span"
    //                     animation="border"
    //                     size="sm"
    //                     role="status"
    //                     aria-hidden="true"
    //                     />
    //                   {} Buscando Pretendentes
    //             </Button>
    //     </Container>
    // )
    // } else  if (status === STATUS.CARREGADO) {
      return (
        <Container className="justify-content-center align-items-center">
        <Card>
            <CardHeader className="text-center" ><h4>Registrar Campanha Doação</h4></CardHeader>
            <Card.Body>
            <Form method ="POST" action="/campanhas"  className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Informe o nome da Campanha"
                    defaultValue=""
                    id='nome'
                    name='nome'
                    value={campanha.nome}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Informe o Nome da Campanha</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" >
                <Form.Label>Descrição</Form.Label>
                <Form.Control type="textarea" placeholder="Descrição da Campanha" required
                    id='descri'
                    name='descri'
                    value={campanha.descri}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Informe a Descrição da Campanha</Form.Control.Feedback>
                
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" >
                <Form.Label>Data Inicio</Form.Label>
                <Form.Control type="date" placeholder="Data de Inicio da Campanha" required
                    id='dtInicio'
                    name='dtInicio'
                    value={campanha.dtInicio}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Informe a Data de Inicio da Campanha</Form.Control.Feedback>
                
                </Form.Group>
                <Form.Group as={Col} md="6" >
                <Form.Label>Data Fim</Form.Label>
                <Form.Control type="date" placeholder="Data do Fim da Campanha" required
                    id='dtFim'
                    name='dtFim'
                    value={campanha.dtFim}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Informe a Data do Fim da Campanha</Form.Control.Feedback>
                
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" >
                <Form.Label>Insira a Imagem de capa da campanha</Form.Label>
                <Form.Control type="file" placeholder="Imagem da Campanha" required
                    id='img'
                    name='img'
                    value={campanha.img}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Informe a Imagem da Campanha</Form.Control.Feedback>
                
                </Form.Group>
            </Row>
            <Row className="mb-3"></Row>
            <Form.Group as={Col} md="6" style={{display :"none"}} >
                <Form.Label>finalizado</Form.Label>
                <Form.Control type="text" placeholder="" required
                    id='finalizado'
                    name='finalizado'
                    value="N"
                    onChange={manipularMudanca}
                />
                </Form.Group>
            <Button type="submit">Adicionar Campanha</Button>
            <Button type ="button" style={{margin:"15px"}}  variant="secondary" onClick={()=> {props.onTabela(true)}}>Lista de Campanhas</Button>
            </Form>
            </Card.Body>
        </Card>
        </Container>
      );
    //}

}