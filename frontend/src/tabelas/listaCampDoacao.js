import { useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { buscarCampanhas, STATUS ,atualizarCampanhas} from '../redux/redutores/CampDoacaoSlice'
import { Link } from 'react-router-dom';
import img from "../imagens/doacao.jpg";


export default function ListaCampDoacao(props) {
    const dispatch = useDispatch();//despacha ações para redutores da store
    const {status,dados} = useSelector(state => state.campanhas)
    // willMount -  vai montar
    useEffect(()=>{
        dispatch(buscarCampanhas());// aqui faz a busca
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
                             { } retornando Camapnhas de Doação...
                    </Button>
            </Container>
        )
    }else if (status === STATUS.CARREGADO) {
        return(
            <Container>
            <div className="colunas"  style={{display: 'flex',flexWrap :'wrap'}}>
                {dados.map((camp) =>
                    <div>
                        <section className="mb-3 mx-2 align-items-center justify-center" style={{paddingLeft: "2em"}} >
                            {/* <Col xs={1}style={{ paddingLeft: '8em'}} > */}
                                <Card style={{ width: '30em'}}>
                                    <Card.Img variant="top" src={img}  />
                                    <Card.Body >
                                    <Card.Title>{camp.camp_nome}</Card.Title>
                                    {/* <Card.Subtitle>Preço : R$ {produto.price}</Card.Subtitle> */}
                                     <Card.Text >
                                        {camp.camp_desc}
                                    </Card.Text>
                                     <Button variant="primary" ><Link to="/regDoacao" style={{color:"white"}}>Click aqui para Doar</Link></Button> 
                                     <Button variant="secondary"  style={{marginLeft:"1em"}}>Finalizar a Campanha</Button> 
                                    </Card.Body>
                                </Card>
                            {/* </Col> */}
                        </section>
                    </div>
                    )}
            </div>
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