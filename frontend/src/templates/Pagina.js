import Menu from "./componentes/Menu";
import Cabecalho from "./componentes/Cabecalho";
import Footer from "./componentes/footer";


export default function Pagina(props) {
    return(
        <div>
            {/* <Cabecalho titulo="Casa Lar"></Cabecalho> */}
            <Menu></Menu>
            <div>
             {props.children}
            </div>
            {/* Essa essa é o filho de pagina, ou seja , o que esta dentro de Pagina em TelaCadastroCliente */}
            <Footer></Footer>
        </div>
    );
  
    
}