import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
//import { remover } from '../redux/redutores/clientesSlice';
import { buscarPretendentes ,excluirPretendentes} from '../redux/redutores/PretendentesSlice';
import { STATUS } from '../redux/redutores/PretendentesSlice'
//import { useEffect  } from 'react';

export default function ListaPretendentes(props) {
    //o useSelector é uma ganjo para conseguir acessar o redux store e consumi-la(esse clientes é da  store)
    //const listaClientes = useSelector(state => state.clientes)
    
    const dispatch = useDispatch();//despacha ações para redutores da store
    const {status,dados} = useSelector(state => state.pretendentes)
    // willMount -  vai montar
    useEffect(()=>{
        dispatch(buscarPretendentes());// aqui faz a busca
    }, []);

   
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
                             { } retornando Pretendentes...
                    </Button>
            </Container>
        )
    }else if (status === STATUS.CARREGADO) {
        
        return (
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Celular</th>
                            <th>Email</th>
                            <th>Endereço</th>
                            <th>Nº Endereço</th>
                            <th>Cidade/UF</th>
                            <th>CEP</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dados.map(predentende =>
                                <tr>

                                    <td>{predentende.nome}</td>

                                    <td>{predentende.cpf}</td>

                                    <td>{predentende.cel}</td>

                                    <td>{predentende.email}</td>

                                    <td>{predentende.end}</td>

                                    <td>{predentende.numend}</td>

                                    <td>{predentende.cep}</td>

                                    <td>{predentende.status}</td>
                                    <td>
                                        <Button  onClick={() => {
                                             dispatch(excluirPretendentes(predentende));
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
                <Button onClick={() => props.onTabela(false)}>Novo Pretendente</Button>
            </Container>

        );
    }else if(status === STATUS.ERRO){
        return(
            <Container>
                <p> <strong>DEU CERTO NÂO</strong></p>
            </Container>
        );
        
    }
}