import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroFunc from "../formularios/FormularioFuncionario"
import ListaFuncionarios from "../tabelas/listaFuncionarios";
export default function TelaCadastroFuncionarios(props) {
    const [exibirTabela,setExibirTabela] = useState(true);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaFuncionarios onTabela={setExibirTabela}></ListaFuncionarios>
            </Pagina>
        );
        //   O onCadastro passsa esse state setExibirTabela, como parametro para lsita de clientes, para poder mudar seu estado lá sem ter que criar contexto ou coisa do tipo
    }else{
        return(
            <Pagina>
                 <FormCadastroFunc onTabela={setExibirTabela} ></FormCadastroFunc>
            </Pagina>
        );
    }
   
    
}