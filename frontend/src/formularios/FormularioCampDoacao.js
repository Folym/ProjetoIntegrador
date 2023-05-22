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
import Toast from 'react-bootstrap/Toast';

import api from '../config/configAPI';

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
      local:"",
      img :""
    });
  
    const {statusCamp}= useSelector(state=>state.campanhas)
  
    const manipularMudanca = (evento) =>{
     
    setCampanha({...campanha,[evento.target.name]:evento.target.value})// esse ... faz um copia da cosntante cliente, podendo adiconar novos valores ou até atualizar, ou seja, a cada letra ele atualiza

      // [evento.target.name]:evento.target.value}
      // cpf:""  --  é isso que signfica esse parte do evento
    }
  
    
    const manipularEnvioDados =  async (event) => {
      const form = event.currentTarget;
      console.log(form[3].value)
      var dtFim = new Date(form[3].value);
      var dtInicio = new Date(form[2].value);
      setShow(false);

      // IMG
     // setCampanha({img:image.name})
        
      if (dtInicio < dtFim) {
        if (form.checkValidity() === true) {
          event.preventDefault();
          const formData = new FormData();
          formData.append('image',image);
      
          const headers = {
            'headers': {
              'Content-Type': 'multipart/form-data'
            }
          }
            console.log("PASSOU AQUI")
            await api.post("/upload-image", formData, headers).then((response) => {
              console.log("CERTO")
            // setStatus({
            //   type: 'success',
            //   mensagem: response.data.mensagem
            // });
          }).catch((err) => {
            if(err.response){
              console.log("ERRADO")
              // setStatus({
              //   type: 'error',
              //   mensagem: err.response.data.mensagem
              // });
            }else{
              console.log("ERRADO")
              // setStatus({
              //   type: 'error',
              //   mensagem: "Erro: Tente mais tarde!"
              // });
            }
          });

          dispatch(adicionarCampanhas(campanha));
          setCampanha({
              nome:"",
              descri:"",
              finalizado:"N",
              dtInicio :"",
              dtFim:"",
              local:"",
              img :""
          })
          setValidado(false)
        }else{
          setValidado(true);
        }
      }else{
        setShow(true);
        setValidado(true);
      }
      event.preventDefault();
      event.stopPropagation();
     
    };

    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);

    //UPLOAD IMAGEM
    const [image, setImage] = useState('');
    const salvarImg =(evento) =>{
     
      setCampanha({...campanha,img:image.name})// esse ... faz um copia da cosntante cliente, podendo adiconar novos valores ou até atualizar, ou seja, a cada letra ele atualiza

    }

   

    // const uploadImage =  async (e) => {
    //   e.preventDefault();
    //   const formData = new FormData();
    //   formData.append('image', campanha.img);
  
    //   const headers = {
    //     'headers': {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    //     console.log("PASSOU AQUI")
    //     await api.post("/upload-image", formData, headers).then((response) => {
    //     // setStatus({
    //     //   type: 'success',
    //     //   mensagem: response.data.mensagem
    //     // });
    //   }).catch((err) => {
    //     if(err.response){
    //       // setStatus({
    //       //   type: 'error',
    //       //   mensagem: err.response.data.mensagem
    //       // });
    //     }else{
    //       // setStatus({
    //       //   type: 'error',
    //       //   mensagem: "Erro: Tente mais tarde!"
    //       // });
    //     }
    //   });
  
    // }

    

  
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
                <Form.Group as={Col} md="6">
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
                <Toast show={show} onClose={toggleShow} >
                  <Toast.Header>
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="2em"
                      width="1em"
                      {...props}
                    >
                      <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
                    </svg>
                    <strong className="me-auto"> Erro no Campo Data Fim!!</strong>
                  </Toast.Header>
                  <Toast.Body>A Data Fim tem que ser maior que a Data Inicio</Toast.Body>
                </Toast>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" >
                <Form.Label>Local de Entrega</Form.Label>
                <Form.Control type="text" placeholder="Local de Doação dos Produtos" required
                    id='local'
                    name='local'
                    value={campanha.local}
                    onChange={manipularMudanca}
                />
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Informe o Local de Doação dos Produtos</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="8" >
                <Form.Label>Insira a Imagem de capa da campanha</Form.Label>
                <Form.Control type="file" placeholder="Imagem da Campanha" required
                    id='img'
                    name='img'
                    //value={campanha.img}
                    onChange={e => setImage(e.target.files[0])}
                />
                {/* <input type="file" name="image" onChange={e => setImage(e.target.files[0])} /> */}
                <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>Informe a Imagem da Campanha</Form.Control.Feedback>
                
                </Form.Group>
                <Button type="button"  style={{marginTop:"1em"}} onClick={salvarImg} >Salvar Imagem</Button>  
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