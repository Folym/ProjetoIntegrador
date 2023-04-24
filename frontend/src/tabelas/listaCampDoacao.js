import { useEffect,useState} from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { buscarCampanhas, STATUS ,atualizarCampanhas} from '../redux/redutores/CampDoacaoSlice'

import img from "../imagens/doacao.jpg";
import CampDoacaoMODAL from '../Modais/CampDoacaoMODAL';


export default function ListaCampDoacao(props) {
    const dispatch = useDispatch();//despacha ações para redutores da store
    const {status,dados} = useSelector(state => state.campanhas)
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
                                        {/* <Button variant="secondary"  style={{marginLeft:"1em"}}>Finalizar a Campanha</Button>  */}
                                        <Button variant="primary" onClick={() =>{exibirModal(camp)}}>
                                        Click aqui para mais Informções
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
    }else if(status === STATUS.ERRO){
        return(
            <Container>
                <p> <strong>DEU CERTO NÂO</strong></p>
            </Container>
        );
        
    }
}