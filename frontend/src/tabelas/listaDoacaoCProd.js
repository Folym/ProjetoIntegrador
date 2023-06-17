import { useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { buscarDoacao,excluirDoacao } from '../redux/redutores/DoacaoCProdSlice.js';
import { STATUS } from '../redux/redutores/DoacaoCProdSlice.js';

export default function ListaDoacao(props) {
    const dispatch = useDispatch();
    const {statusCProd,dadosCProd} = useSelector(state => state.doacaoCProd)

    function formtData(data) {    
        if (data && data.includes("T")) {
          const splitData = data.split('T')[0].split('-');
          const day = splitData[2];
          const month = splitData[1];
          const year = splitData[0];
      
          return `${day}/${month}/${year}`;
        } 
        return data;
      }

    useEffect(()=>{
        dispatch(buscarDoacao());
    }, []);

   


    if (statusCProd === STATUS.OCIOSO) {
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
                             { } retornando doações...
                    </Button>
            </Container>
        )
    }else if (statusCProd === STATUS.CARREGADO) {
        
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title classname="col-md-5 mx-auto">Tabela de Doação Remota de Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Endereço</th>
                                <th>Numero de Endereço</th>
                                <th>CEP</th>
                                <th>Quantidade</th>
                                <th>Data</th>
                                <th>Descricao</th>
                                <th>Campanha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dadosCProd.map(doacao =>
                                    <tr>

                                        <td>{doacao.prod_codigo}</td>

                                        <td>{doacao.doac_end}</td>

                                        <td>{doacao.doac_numend}</td>

                                        <td>{doacao.doac_cep}</td>

                                        <td>{doacao.doac_quant}</td>

                                        <td>{formtData(doacao.doac_data)}</td>

                                        <td>{doacao.doac_desc}</td>

                                        <td>{doacao.camp_codigo}</td>
                                        <td>
                                            <Button  onClick={() => {
                                                swal("Deseja confirmar a exclusão?", {
                                                    dangerMode: true,
                                                    buttons: true,
                                                })
                                                .then((result) => {
                                                    if (result) {
                                                        dispatch(excluirDoacao(doacao));
                                                    }
                                                });
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
                    <Button onClick={() => props.onTabela(false)}>Nova Doacao</Button>
                </Modal.Body>
            </Modal.Dialog>

        );
    } else if (statusCProd === STATUS.ERRO) {
        return (
            <Container>
                <p> <strong>ERRO</strong></p>
            </Container>
        );

    }
}