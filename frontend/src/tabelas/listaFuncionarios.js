import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
//import { remover } from '../redux/redutores/clientesSlice';
import { buscarFuncionarios ,excluirFuncionarios} from '../redux/redutores/FuncionariosSlice';
import { STATUS } from '../redux/redutores/FuncionariosSlice'
//import { useEffect  } from 'react';

export default function ListaFuncionarios(props) {
    //o useSelector é uma ganjo para conseguir acessar o redux store e consumi-la(esse clientes é da  store)
    //const listaClientes = useSelector(state => state.clientes)
    
    const dispatch = useDispatch();//despacha ações para redutores da store
    const {status,dados} = useSelector(state => state.funcionarios)
    // willMount -  vai montar
    useEffect(()=>{
        dispatch(buscarFuncionarios());// aqui faz a busca
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
                             { } Retornando Funcionários.
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
                            <th>CEP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dados.map(funcionario =>
                                <tr>

                                    <td>{funcionario.func_nome}</td>

                                    <td>{funcionario.func_cpf}</td>

                                    <td>{funcionario.func_cel}</td>

                                    <td>{funcionario.func_email}</td>

                                    <td>{funcionario.func_end}</td>

                                    <td>{funcionario.func_numend}</td>

                                    <td>{funcionario.func_cep}</td>

                                    <td>
                                        <Button  onClick={() => {
                                             dispatch(excluirFuncionarios(funcionario));
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
                <Button onClick={() => props.onTabela(false)}>Cadastrar Funcionario</Button>
            </Container>

        );
    }else if(status === STATUS.ERRO){
        return(
            <Container>
                <p> <strong>DEU CACA</strong></p>
            </Container>
        );
        
    }
}