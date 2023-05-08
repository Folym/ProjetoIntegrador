import { useEffect,useState} from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { buscarCampanhas, STATUS ,atualizarCampanhas,excluirCampanhas} from '../redux/redutores/CampDoacaoSlice'

import img from "../imagens/doacao.jpg";
import CampDoacaoMODAL from '../Modais/CampDoacaoMODAL';


export default function ListaCampDoacao(props) {
    const dispatch = useDispatch();//despacha ações para redutores da store
    const {statusCamp,dadosCamp} = useSelector(state => state.campanhas)
    // willMount -  vai montar
    useEffect(()=>{
        dispatch(buscarCampanhas());// aqui faz a busca
    }, []);

    const [modalShow, setModalShow] = useState(false);
    const [linha,setLinha] = useState("")

    const exibirModal =(dados)=>{
        setModalShow(true);
        setLinha(dados);
    };

   
    if (statusCamp === STATUS.OCIOSO) {
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
    }else if (statusCamp === STATUS.CARREGADO) {
        return(
            <Container>
            <div className="colunas"  style={{display: 'flex',flexWrap :'wrap'}}>
                {dadosCamp.filter((filter) => filter.camp_finalizado == "N").map((camp) =>
                 
                        <div>
                            <section className="mb-3 mx-2 align-items-center justify-center" style={{paddingLeft: "2em"}} >
                                {/* <Col xs={1}style={{ paddingLeft: '8em'}} > */}
                                    <Card style={{ width: '30em'}}>
                                        <Card.Header> 
                                            <Button  variant="outline-danger" onClick={() => {
                                                        dispatch(excluirCampanhas(camp));
                                                    }}>
                                                        <svg  width="420" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 11.708-.708L8 7.293l5.146-5.147a.5.5 0 01.708.708L8.707 8l5.147 5.146a.5.5 0 01-.708.708L8 8.707l-5.146 5.147a.5.5 0 01-.708-.708L7.293 8 2.146 2.854z" />
                                                        </svg>
                                                    
                                            </Button>
                                        </Card.Header>
                                        <Card.Img variant="top" src={img}  />
                                        <Card.Body >
                                            <Card.Title>{camp.camp_nome}</Card.Title>
                                            {/* <Card.Subtitle>Preço : R$ {produto.price}</Card.Subtitle> */}
                                            <Card.Text >
                                                {camp.camp_desc}
                                            </Card.Text>
                                            {/* <Button variant="secondary"  style={{marginLeft:"1em"}}>Finalizar a Campanha</Button>  */}
                                            <Button variant="primary" onClick={() =>{exibirModal(camp)}}>
                                             Mais Informações
                                            </Button>
                                            <Button  variant="dark"  style={{marginLeft:"130px"}}  onClick={() => {
                                                dispatch(atualizarCampanhas(camp));
                                                window.location.reload()
                                            }}>
                                                Finalizar Campanha
                                            </Button>
                                           
                                            <CampDoacaoMODAL
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            dados={linha}
                                            />
                                        
                                        </Card.Body>
                                    </Card>
                                {/* </Col> */}
                            </section>
                        </div>
                    )}
                    <div className="colunas"  style={{display: 'flex',flexWrap :'wrap'}}>
                        <div>
                            <section className="mb-3 mx-2 align-items-center justify-center" style={{paddingLeft: "2em",paddingTop:"11em"}} >
                                <Card style={{ width: '30em'}}>
    
                                        <Button type ="button" style={{margin:"15px"}}  variant="outline-primary" onClick={()=> {props.onTabela(false)}}>Registrar Nova Campanha</Button>
                                    
                                </Card>
                            </section>
                        </div>
                    </div>
                   
            </div>
        </Container>
        );
    }else if(statusCamp === STATUS.ERRO){
        return(
            <Container>
                <p> <strong>DEU CERTO NÂO</strong></p>
            </Container>
        );
        
    }
}