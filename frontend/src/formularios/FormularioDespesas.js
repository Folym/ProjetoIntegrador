import React, { useEffect,useState,useRef } from 'react';
import Stack from 'react-bootstrap/Stack';
import { Container, Modal } from 'react-bootstrap';
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

 export default function FormCadastroDespesas(props) {
  const [validado, setValidado] = useState(false);

  const dispatch =useDispatch();

  const componenteSelecao = useRef();

  const [exibirParcelas,setExibirParcelas] = useState(true);

  useEffect(()=>{
    dispatch(buscarParcelas());
  },[]);

  const [despesa, setDespesa] = useState({
    codigo:"",
    vencimento:"",
    numparcelas:"",
    desconto:"",
    valor:""
  });

  const [parcela, setParcela] = useState({
    codigo:"",
    desp_codigo:"",
    valor:"",
    vencimento:""
  });

  const {status}= useSelector(state=>state.despesas)

  const manipularMudanca = (evento) =>{
    setDespesa({...despesa,[evento.target.name]:evento.target.value})
  }

  const manipularEnvioDados = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      
      dispatch(adicionarDespesas(despesa));
      setDespesa({
        codigo:"",
        vencimento:"",
        numparcelas:"",
        desconto:"",
        valor:""
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

      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title classname="col-md-5 mx-auto">Lançar Despesas</Modal.Title>
          </Modal.Header>
          <Form method="POST" action="/despesa" className="m-3 p-3" noValidate validated={validado} onSubmit={manipularEnvioDados}>
            <Modal.Body>
              {/* <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label column sm={2}>Tipo da Despesa</Form.Label>
                  <Form.Select ref={componenteSelecao}>
                        {
                            dados.map((tipo_desp) => {
                                return <option key={tipo_desp.tipo_desp_codigo} value={tipo_desp.tipo_desp_codigo}>
                                      {tipo_desp.tipo_desp_descricao}  
                                </option>
                            })
                        }
                    </Form.Select>
                  <Form.Control.Feedback type='invalid'>Tipo invalido.</Form.Control.Feedback>
                </Form.Group>
              </Row> */}
              <Row className="mb-2">  
                <Form.Group as={Col}>
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
              </Row>
              <Row className="mb-2">
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
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Valor Final</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Valor final"
                    required
                    id='val_final'
                    name='val_final'
                    value={despesa.valor - despesa.desconto} //TEM QUE VER SE PODE ISSO
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
              <ListaParcelas onTabela={setExibirParcelas}></ListaParcelas>
              <Stack gap={2}>
                <Button type="submit" className="col-md-5 mx-auto" style={{ margin: "5px" }}>+</Button>
                <Button type="button" className="col-md-5 mx-auto" style={{ margin: "5px" }} variant="secondary" onClick={() => { props.onTabela(true) }}>Listar Despesas</Button>
              </Stack>
            </Modal.Body>
          </Form>
        </Modal.Dialog>
      </div>
    );
  }
}