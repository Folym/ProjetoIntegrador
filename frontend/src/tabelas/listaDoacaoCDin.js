import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { buscarDoacao,excluirDoacao } from '../redux/redutores/DoacaoCDinSlice.js';
import { STATUS } from '../redux/redutores/DoacaoCDinSlice.js';

export default function ListaDoacao(props) {
    const dispatch = useDispatch();
    const {statusCDin,dadosCDin} = useSelector(state => state.doacaoCDin)

    useEffect(()=>{
        dispatch(buscarDoacao());
    }, []);
   
    if (statusCDin === STATUS.OCIOSO) {
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
    }else if (statusCDin === STATUS.CARREGADO) {
        return (
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Endereço</th>
                            <th>Numero de Endereço</th>
                            <th>CEP</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Descricao</th>
                            <th>Campanha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosCDin.map(doacao =>
                                <tr>

                                    <td>{doacao.doac_end}</td>

                                    <td>{doacao.doac_numend}</td>

                                    <td>{doacao.doac_cep}</td>

                                    <td>{doacao.doac_valor}</td>

                                    <td>{doacao.doac_data}</td>

                                    <td>{doacao.doac_desc}</td>

                                    <td>{doacao.camp_codigo}</td>
                                    <td>
                                        <Button  onClick={() => {
                                            dispatch(excluirDoacao(doacao));
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
            </Container>

        );
    }else if(statusCDin === STATUS.ERRO){
        return(
            <Container>
                <p> <strong>ERRO</strong></p>
            </Container>
        );
        
    }
}