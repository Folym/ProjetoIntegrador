import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroPret from "../formularios/FormularioPretendente"
import ListaPretendentes from "../tabelas/listaPretendentes";
export default function TelaCadastroPretedentes(props) {
    const [exibirTabela,setExibirTabela] = useState(true);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaPretendentes onTabela={setExibirTabela}></ListaPretendentes>
            </Pagina>
        );
        //   O onCadastro passsa esse state setExibirTabela, como parametro para lsita de clientes, para poder mudar seu estado lá sem ter que criar contexto ou coisa do tipo
    }else{
        return(
            <Pagina>
                 <FormCadastroPret onTabela={setExibirTabela} ></FormCadastroPret>
            </Pagina>
        );
    }
   
    
}