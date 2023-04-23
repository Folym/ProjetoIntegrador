import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroAdocao from "../formularios/FormularioAdocao";
import ListaAdocao from "../tabelas/listaAdocoes";

export default function TelaCadastroAdocao(props) {
    const [exibirTabela,setExibirTabela] = useState(false);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaAdocao onTabela={setExibirTabela}></ListaAdocao>
            </Pagina>
        );
        //   O onCadastro passsa esse state setExibirTabela, como parametro para lsita de clientes, para poder mudar seu estado lá sem ter que criar contexto ou coisa do tipo
    }else{
        return(
            <Pagina>
                 <FormCadastroAdocao onTabela={setExibirTabela} ></FormCadastroAdocao>
            </Pagina>
        );
    }
   
}