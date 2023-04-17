import { useState } from "react";
import FormCadastroCampDoacao from "../formularios/FormularioCampDoacao";
import ListaCampDoacao from "../tabelas/listaCampDoacao";
import Pagina from "../templates/Pagina";

export default function TelaCadastroCampDoacao(props) {
    const [exibirTabela,setExibirTabela] = useState(false);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaCampDoacao onTabela={setExibirTabela}></ListaCampDoacao>
            </Pagina>
        );
        //   O onCadastro passsa esse state setExibirTabela, como parametro para lsita de clientes, para poder mudar seu estado lá sem ter que criar contexto ou coisa do tipo
    }else{
        return(
            <Pagina>
                 <FormCadastroCampDoacao onTabela={setExibirTabela} > </FormCadastroCampDoacao>
            </Pagina>
        );
    }
   
    
}