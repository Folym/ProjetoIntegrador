import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroPret from "../formularios/FormularioPretendente"
import ListaPretendentes from "../tabelas/listaPretendentes";
export default function TelaCadastroCliente(props) {
    const [exibirTabela,setExibirTabela] = useState(false);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaPretendentes onTabela={setExibirTabela}></ListaPretendentes>
            </Pagina>
        );
    }else{
        return(
            <Pagina>
                 <FormCadastroPret onTabela={setExibirTabela} ></FormCadastroPret>
            </Pagina>
        );
    }
   
    
}