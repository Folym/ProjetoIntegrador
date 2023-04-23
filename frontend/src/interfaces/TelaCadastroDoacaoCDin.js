import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroDoac from "../formularios/FormularioDoacaoCDin";
import ListaDoacao from "../tabelas/listaDoacaoCDin.js";
export default function TelaCadastroDoacaoCDin(props) {
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