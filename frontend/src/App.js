//import { Button } from "react-bootstrap";
import Sistema from "./Sistema";
import TelaCadastroPretedentes from "./interfaces/TelaCadastroPretendentes";
// import TelaCadastroProduto from "./interfaces/TelaCadastroProduto";
import TelaMenu from "./interfaces/MenuSistema";
// import TelaCadastroCliente from "./interfaces/TelaCadastroCliente";
// import TelaLogin from "./interfaces/TelaLogin";

import {Route} from "react-router-dom";
import { useState } from "react";
// import imgAvatar from "./imagens/avatar.png"
import ContextoUsuario from "./contexto/ContextoGlobal";
// import TelaVenda from "./interfaces/TelaVenda";

function App() {
  // const [usuario,setUsuario] =useState({ // para poder usar usuario em todos os compenentes que desejam fazer uso
  //   nome:"",
  //   avatar:imgAvatar,
  //   logado:false,
  // })

    return (
      <ContextoUsuario.Provider >
        <Sistema>
          <Route path="*" element ={<TelaMenu/>}></Route>
          <Route path="/cadPretendentes" element ={<TelaCadastroPretedentes/>}></Route>
        </Sistema>
      </ContextoUsuario.Provider>
     );
  

}

export default App;
