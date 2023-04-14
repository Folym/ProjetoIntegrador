import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroFunc from "../formularios/FormularioFuncionario.js";
import ListaFuncionarios from "../tabelas/listaFuncionarios.js";
export default function TelaCadastroFuncionarios(props) {
    const [exibirTabela,setExibirTabela] = useState(true);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaFuncionarios onTabela={setExibirTabela}></ListaFuncionarios>
            </Pagina>
        );
    }else{
        return(
            <Pagina>
                 <FormCadastroFunc onTabela={setExibirTabela} ></FormCadastroFunc>
            </Pagina>
        );
    }
   
    
}