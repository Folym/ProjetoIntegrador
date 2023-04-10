import { useState } from "react";
import Pagina from "../templates/Pagina";
import FormCadastroJovem from "../formularios/FormularioJovens";
import ListaJovens from "../tabelas/listaJovens";
export default function TelaCadastroJovens(props) {
    const [exibirTabela,setExibirTabela] = useState(false);
    console.log(exibirTabela);
    if (exibirTabela) {
        return(  
            <Pagina>
                <ListaJovens onTabela={setExibirTabela}></ListaJovens>
            </Pagina>
        );
        //   O onCadastro passsa esse state setExibirTabela, como parametro para lsita de clientes, para poder mudar seu estado lá sem ter que criar contexto ou coisa do tipo
    }else{
        return(
            <Pagina>
                 <FormCadastroJovem onTabela={setExibirTabela} ></FormCadastroJovem>
            </Pagina>
        );
    }
   
    
}