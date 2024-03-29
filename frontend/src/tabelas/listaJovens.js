import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {buscarJovens, excluirJovens} from '../redux/redutores/JovensSlice'
import { STATUS } from '../redux/redutores/JovensSlice'

export default function ListaJovens(props) {
    //o useSelector é uma ganjo para conseguir acessar o redux store e consumi-la(esse clientes é da  store)
    //const listaClientes = useSelector(state => state.clientes)
    
    const dispatch = useDispatch();//despacha ações para redutores da store
    const {status,dados} = useSelector(state => state.jovens)
    // willMount -  vai montar
    useEffect(()=>{
        dispatch(buscarJovens());// aqui faz a busca
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
                             { } retornando Jovens...
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
                            <th>Nome do Pai</th>
                            <th>Nome da Mãe</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dados.map(jovem =>
                                <tr>

                                    <td>{jovem.jov_nome}</td>

                                    <td>{jovem.jov_cpf}</td>

                                    <td>{jovem.jov_nomepai}</td>

                                    <td>{jovem.jov_nomemae}</td>

                                    <td>{jovem.jov_idade}</td>

                                    <td>{jovem.jov_sexo}</td>

                                    <td>{jovem.jov_status}</td>
                                    <td>
                                        <Button  onClick={() => {
                                             dispatch(excluirJovens(jovem));
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
                <Button onClick={() => props.onTabela(false)}>Novo jovem</Button>
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