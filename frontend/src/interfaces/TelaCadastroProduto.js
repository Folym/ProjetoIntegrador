import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroProd from "../formularios/FormularioProduto.js";
import ListaProduto from "../tabelas/listaProduto.js";
export default function TelaCadastroProduto(props) {
    const [exibirTabela,setExibirTabela] = useState(false);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaProduto onTabela={setExibirTabela}></ListaProduto>
            </Pagina>
        );
    }else{
        return(
            <Pagina>
                 <FormCadastroProd onTabela={setExibirTabela} ></FormCadastroProd>
            </Pagina>
        );
    }
   
    
}