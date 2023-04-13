import { Container, Form, Button, Card } from "react-bootstrap";
import { useContext, useState } from "react";
import ContextoUsuario from "../contexto/ContextoGlobal";

export default function FormLogin(props) {
    const [usuario, setUsuario] = useContext(ContextoUsuario);

    const [dadosLogin, setDadosLogin] = useState({
        usuario: "",
        senha: ""
    });

    function manipularMudanca(e) {
        setDadosLogin({ ...dadosLogin, [e.target.name]: e.target.value });
    }



    function login() {
        if (dadosLogin.senha === "123") {
            setUsuario({
                nome: dadosLogin.usuario,
                logado: true
            })
        }
        
    }

    return (
        <Container className="w-50 justify-content-center align-items-center">
            <Card className="mt-5">
                <Card.Header className="text-center" ><h4>Login</h4></Card.Header>
                <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuario:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Usuário"
                            id="usuario"
                            name="usuario"
                            value={dadosLogin.usuario}
                            onChange={manipularMudanca} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Digite sua senha"
                            id="senha"
                            aria-describedby="passwordHelpBlock"
                            name="senha"
                            value={dadosLogin.senha}
                            onChange={manipularMudanca}
                            
                        />
                          <Form.Text id="passwordHelpBlock" muted>
                               Sua senha deve ter de 1 a 10 digitos.
                            </Form.Text>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button onClick={login} variant="primary" type="button">
                            Login
                        </Button>
                    </Form.Group>
                </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}