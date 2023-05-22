import { useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { buscarProduto,excluirProduto } from '../redux/redutores/ProdutoSlice.js';
import { STATUS } from '../redux/redutores/ProdutoSlice.js';

export default function ListaProduto(props) {
    const dispatch = useDispatch();
    const {status,dadosPr} = useSelector(state => state.produto)

    useEffect(()=>{
        dispatch(buscarProduto());
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
                             { } retornando doações...
                    </Button>
            </Container>
        )
    }else if (status === STATUS.CARREGADO) {
        
        return (
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Descricao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosPr.map(produto =>
                                <tr>

                                    <td>{produto.prod_codigo}</td>
                                    <td>{produto.prod_nome}</td>
                                    <td>{produto.prod_desc}</td>
                                    <td>
                                        <Button  onClick={() => {
                                            dispatch(excluirProduto(produto));
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
                <Button onClick={() => props.onTabela(false)}>Novo Produto</Button>
            </Container>
        );
    }else if(status === STATUS.ERRO){
        return(
            <Container>
                <p> <strong>ERRO</strong></p>
            </Container>
        );
        
    }
}