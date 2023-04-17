import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroDoac from "../formularios/FormularioDoacaoLProd";
import ListaDoacao from "../tabelas/listaDoacaoLProd.js";
export default function TelaCadastroDoacao(props) {
    const [exibirTabela,setExibirTabela] = useState(false);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaDoacao onTabela={setExibirTabela}></ListaDoacao>
            </Pagina>
        );
    }else{
        return(
            <Pagina>
                 <FormCadastroDoac onTabela={setExibirTabela} ></FormCadastroDoac>
            </Pagina>
        );
    }
   
    
}