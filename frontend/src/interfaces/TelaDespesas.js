import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroDespesas from "../formularios/FormularioDespesas.js";
//import ListaDespesas from "../tabelas/listaDespesas.js";  
export default function TelaCadastroDespesas(props) {
    const [exibirTabela,setExibirTabela] = useState(false);
    console.log(exibirTabela);
    if (exibirTabela) {
        /*return(  
            <Pagina>
                <ListaDespesas onTabela={setExibirTabela}></ListaDespesas>
            </Pagina>
        );*/
    }else{
        return(
            <Pagina>
                 <FormCadastroDespesas onTabela={setExibirTabela} ></FormCadastroDespesas>
            </Pagina>
        );
    }
   
    
}