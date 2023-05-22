import { useEffect,useState} from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { buscarCampanhas, STATUS ,atualizarCampanhas,excluirCampanhas} from '../redux/redutores/CampDoacaoSlice'

import img from "../";
import CampDoacaoMODAL from '../Modais/CampDoacaoMODAL';
import ModalConfirmacao from '../Modais/ModalConfirmacao';
//import img from "..../backend/public/upload/imagens/"


export default function ListaCampDoacao(props) {
    const dispatch = useDispatch();//despacha ações para redutores da store
    const {statusCamp,dadosCamp} = useSelector(state => state.campanhas)
    // willMount -  vai montar
    useEffect(()=>{
        dispatch(buscarCampanhas());// aqui faz a busca
    }, []);

    const [modalShow, setModalShow] = useState(false);
    const [modalShowConf, setModalShowConf] = useState(false);
    const [modalTipo ,setModalTipo] = useState("");
    const [linha,setLinha] = useState("")

    const exibirModalInfo =(dados)=>{
        setModalShow(true);
        setLinha(dados);
    };

    const exibirModalConfirmacao=(dados, tipo)=>{
        setModalShowConf(true);
        setLinha(dados);
        setModalTipo(tipo);
    };

    //const img ="../imagens/"
   
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
                {dadosCamp.filter((filter) => filter.camp_finalizado ==="N").map((camp) =>
                      
                        <div>
                            <section className="mb-3 mx-2 align-items-center justify-center" style={{paddingLeft: "2em"}} >
                                {/* <Col xs={1}style={{ paddingLeft: '8em'}} > */}
                                    <Card style={{ width: '30em'}}>
                                        <Card.Img variant="top" width={"100em"}   height={"400em"} src={"http://localhost:8080/files/imagens/" + camp.camp_img} />
                                        <Card.Body >
                                            <Card.Title>{camp.camp_nome}</Card.Title>
                                            {/* <Card.Subtitle>Preço : R$ {produto.price}</Card.Subtitle> */}
                                            <Card.Text >
                                                {camp.camp_desc}
                                            </Card.Text>
                                            {/* <Button variant="secondary"  style={{marginLeft:"1em"}}>Finalizar a Campanha</Button>  */}
                                            <Button variant="primary" onClick={() =>{exibirModalInfo(camp)}}>
                                             Mais Informações
                                            </Button>
                                            <Button  variant="dark"  style={{marginLeft:"130px"}}  onClick={() => { exibirModalConfirmacao(camp,"Finalizar")   }}>
                                                Finalizar Campanha
                                            </Button>
                                           
                                            <CampDoacaoMODAL
                                                show={modalShow}
                                                onHide={() => {setModalShow(false);}}
                                                dados={linha}
                                            />
                                            <ModalConfirmacao show={modalShowConf} onHide={()=>setModalShowConf(false)}  dados={linha} tipo={modalTipo}/>
                                        
                                        </Card.Body>
                                        <Card.Body>
                                             <Button  variant="outline-danger" onClick={() => {
                                                        exibirModalConfirmacao(camp,"Excluir") 
                                                    }}>
                                                        <svg  width="420" height="25" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                        />
                                                        </svg>
                                                    
                                            </Button>
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