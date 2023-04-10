import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroDoac from "../formularios/FormularioDoacao.js";
import ListaDoacao from "../tabelas/listaDoacao.js";
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