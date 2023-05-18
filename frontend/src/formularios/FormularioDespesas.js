import React, { useEffect,useState,useRef } from 'react';
import Stack from 'react-bootstrap/Stack';
import { Container, Modal, Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { adicionarDespesas} from "../redux/redutores/DespesasSlice.js";
import { buscarParcelas} from "../redux/redutores/ParcelasSlice.js";  
import { STATUS } from '../redux/redutores/DespesasSlice.js'
import ListaParcelas from "../tabelas/listaParcelas.js";
import { buscarTipoDesp } from "../redux/redutores/TipoDespesaSlice.js";

 export default function FormCadastroDespesas(props) {
  const [validado, setValidado] = useState(false);

  const dispatch =useDispatch();

  const componenteSelecao = useRef();

  const [exibirParcelas, setExibirParcelas] = useState(true);
  //const [exibirTipoDesp, setExibirTipoDesp] = useState(true);

  useEffect(()=>{
    dispatch(buscarTipoDesp());
  },[]);

  useEffect(()=>{
    dispatch(buscarParcelas());
  },[]);

  const [despesa, setDespesa] = useState({
    codigo:"",
    vencimento:"",
    numparcelas:1,
    desconto:"",
    valor:0
  });

  const [parcela, setParcela] = useState({
    codigo:"",
    desp_codigo:"",
    valor:"",
    vencimento:""
  });

  const [modalShow, setModalShow] = useState(true);
  const {status, dados}= useSelector(state=>state.despesas)
  const {status_tipo, dados_tipo}= useSelector(state=>state.tiposdesp)
  const {status_parcela, dados_parcela} = useSelector(state=>state.parcelas)

  const manipularMudanca = (evento) =>{
    setDespesa({...despesa,[evento.target.name]:evento.target.value})

    if(evento.target.name === 'valor' || evento.target.name === 'desconto')
    {
      setDespesa({...despesa,[evento.target.name]:evento.target.value.replace(/^-\d*\.?\d+$/, "")});
    }

  }

  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      
      dispatch(adicionarDespesas(despesa));
      setDespesa({
        codigo:"",
        vencimento:"",
        numparcelas:1,
        desconto:"",
        valor:1
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
                    {} Buscando Despesas
              </Button>
      </Container>
  )
  } else  if (status === STATUS.CARREGADO) {
    return (

      <div className="modal show" style={{ display: 'block', position: 'initial'}}>
        <Modal.Dialog size="lg">
          <Modal.Header>
            <Modal.Title classname="col-md-5 mx-auto">Lançar Despesas</Modal.Title>
          </Modal.Header>
          <Form method="POST" action="/despesa" className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
            <Modal.Body>
              { <Row className="mb-3">
                <Form.Group as={Col} md="8">
                  <Form.Label>Tipo de Despesa</Form.Label>
                  <Form.Select ref={componenteSelecao}>
                        {
                            dados_tipo.map((tipo) => {
                                return <option key={tipo.tipo_desp_codigo} value={tipo.tipo_desp_codigo}>
                                      {tipo.tipo_desp_descricao}  
                                </option>
                            })
                        }
                    </Form.Select>
                  <Form.Control.Feedback type='invalid'>Tipo invalido.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Valor da despesa"
                    defaultValue=""
                    id='valor'
                    name='valor'
                    value={despesa.valor}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Valor inválido.</Form.Control.Feedback>
                </Form.Group>
              </Row> }
              <Row className="mb-2" md="6">
                <Form.Group as={Col}>
                  <Form.Label>Desconto</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Valor de desconto"
                    defaultValue="0"
                    id='desconto'
                    name='desconto'
                    value={despesa.desconto}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Valor inválido</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Valor Final</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Valor final"
                    required
                    id='val_final'
                    name='val_final'
                    disabled = 'disabled'
                    value={(despesa.valor - despesa.desconto)}
                    onChange={manipularMudanca}

                  />
                  <Form.Control.Feedback>Ok</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Parcelas</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="1"
                    required
                    defaultValue="1"
                    id='numparcelas'
                    name='numparcelas'
                    value={despesa.numparcelas}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Quantidade inválida.</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Vencimento</Form.Label>
                  <Form.Control type="date" placeholder="data" required
                    id='vencimento'
                    name='vencimento'
                    value={despesa.vencimento}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Data inválida.</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb">
                <Form.Group as={Col}>
                  <Form.Label>Valor da Parcela</Form.Label>
                  <Form.Control type="number" placeholder="0  " required
                    id='valor'
                    name='valor'
                    value={parcela.valor}
                    onChange={manipularMudanca}
                  />
                  <Form.Control.Feedback>Ok</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>Valor de parcela inválido</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Valor</th>
                            <th>Vencimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dados_parcela.map(parcela =>
                                <tr>

                                    <td>{parcela.parc_valor}</td>

                                    <td>{parcela.parc_vencimento}</td>

                                    <td>
                                        <Button  onClick={() => {
                                             //dispatch(excluirParcelas(parcela));
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        
                                        </Button>
                                    </td>
                                </tr>

                            )
                        }
                    </tbody>
                </Table>
            </Container>
              <Stack gap={2}>
                <Button type="submit" className="col-md-5 mx-auto" style={{ margin: "5px" }}>+</Button>
                <Button type="button" className="col-md-5 mx-auto" style={{ margin: "5px" }} variant="secondary">Listar Despesas</Button>
              </Stack>
            </Modal.Body>
          </Form>
        </Modal.Dialog>

        
      </div>
    );
  }
}