import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroDoac from "../formularios/FormularioDoacaoLDin";
import ListaDoacao from "../tabelas/listaDoacaoLDin.js";
export default function TelaCadastroDoacaoLDin(props) {
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