import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroDoac from "../formularios/FormularioDoacaoCProd";
import ListaDoacao from "../tabelas/listaDoacaoCProd.js";
export default function TelaCadastroDoacaoCProd(props) {
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