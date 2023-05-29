import Pagina from "../templates/Pagina";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import foto from "../imagens/doacao.jpg";
import { Link } from 'react-router-dom';

import fotoSobre from "../imagens/equipe.jpg";
import fotoDaocao from "../imagens/campDoacao.png";
import fotoAdocao from "../imagens/adocao.jpg";
//import fotoDoacao from "../imagens/doacao2.png";

export default function MenuSistema(props) {
    return (
        <Pagina>
            <Container>
                <Row className="justify-content-md-center">
                    <Carousel style={{ width: "100%" }}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={fotoDaocao}
                                alt="First slide"
                                style={{ height: "400px" }}
                            />
                            <Carousel.Caption>
                                <h3>Campanhas de Doação</h3>
                                <p>Aqui você encontrara todas as campanhas realizadas pela Casa Lar</p>
                                {/* <Button variant="outline-primary">Ver Campanhas</Button> */}
                                <Button variant="outline-primary" ><Link to="/cadCampanhaDoacao"  style={{color:"white"}}>Ver Campanhas</Link></Button> 
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={fotoAdocao}
                                alt="Second slide"
                                style={{ height: "400px" }}
                            />

                            <Carousel.Caption>
                                <h3>Adoção, escolha gerada pelo coração</h3>
                                <p>Faça aqui a sua adoção.</p>
                                <Button variant="outline-primary" ><Link to="/cadCampanhaDoacao"  style={{color:"white"}}>Ver adoação</Link></Button> 
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={foto}
                                alt="Third slide"
                                style={{ height: "400px" }}
                            />

                            <Carousel.Caption>
                                <h3>Faça aqui sua Doação</h3>
                                <p>
                                    Todo Mundo doando um pouco ajuda o outro.
                                </p>
                                <Button variant="outline-primary" ><Link to="/cadCampanhaDoacao"  style={{color:"white"}}>Doe Aqui</Link></Button> 
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row className="justify-content-md-center mt-5">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h4 style={{color:"#0B4181"}}>Sobre</h4></Accordion.Header>
                            <Accordion.Body>
                                <h2 style={{color:"#0B4181"}}>História</h2>
                                <p style={{textIndent:"3ch"}}> 
                                A nossa organização foi legalmente constituída em 10 de dezembro de 1958,
                                com o objetivo norteador de oferecer a Proteção Integral a crianças e
                                adolescentes que vivenciassem as condições de abandono e desamparo familiar,
                                acolhendo-os em regime de internato, hoje denominado Acolhimento Institucional.
                                No decorrer de seu caminhar, em sua extrema preocupação com o bem estar da
                                criança e do adolescente, a Casa Lar no ano de 2006 tornou-se a Organização
                                Certificadora do Projeto C.A.R.A. - Construindo Ações Reais para Adolescentes,
                                que desde o ano de 2004 desenvolve o Serviço de Convivência e Fortalecimentos
                                de Vínculos para Jovens com ênfase na Qualificação e Inserção no Mundo do Trabalho,
                                conforme a Lei do Aprendiz nº. 10.097/2000.
                                </p>
                                <br></br>
                                <h2 style={{color:"#0B4181"}}>Valores</h2>
                                <p style={{textIndent:"3ch"}}>
                                A nossa organização busca primeiramente constituir-se como um espaço de acolhida, escuta, 
                                construção e reconstrução de história, tendo como, princípios e valores norteadores o amor, 
                                o respeito, a igualdade, a honestidade, a dignidade, a paz e felicidade.
                                </p>
                                <br></br>
                                <img
                                    className="d-block w-100"
                                    src={fotoSobre}
                                    alt="Third slide"
                                    style={{ height: "400px" }}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h4 style={{color:"#0B4181"}}>Objetivos da Instituição</h4></Accordion.Header>
                            <Accordion.Body>
                            <h2 style={{color:"#0B4181"}}>Nossa Missão</h2>
                            <p style={{textIndent:"3ch"}}> 
                                Realizar um trabalho com amor, comprometimento e respeito ao próximo, visando proporcionar 
                                o resgate da dignidade, a garantia dos direitos preconizados no ECA e o empoderamento de 
                                jovens e adolescentes.
                                </p>
                                
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </Row>
            </Container>
        </Pagina>
    );
}