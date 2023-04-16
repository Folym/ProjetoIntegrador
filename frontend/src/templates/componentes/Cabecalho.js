import { Container } from "react-bootstrap";
//import {useContext } from "react";//para poder usar o contexto
//import ContextoUsuario from "../../contextos/ContextoGlobal";// qual contexto vai usar

export default function Cabecalho(props) {
    // const [usuario,setUsuario] =useContext(ContextoUsuario)
    // function logout(){
    //     setUsuario({...usuario,logado:false,nome:"",
    //     avatar:"",});
    // }
    return(
        <Container className="border w-100 p-0 m-100 text-center" style={{"background-color":"#FFC107"}}>
            <h1>{props.titulo||"Casa Lar"}</h1>
            <div>
                {/* <img style={{height:"3.0em",width:"3.0em"}} src={usuario.avatar}/>
                ///
                <span>Usuario:{usuario.nome}</span>
                <Button style={{marginLeft:"100px"}} onClick={logout} variant="outline-danger" >Sair</Button> */}
            </div>
        </Container>
    );
    
}