import Sistema from "./Sistema";
import TelaCadastroPretedentes from "./interfaces/TelaCadastroPretendentes";
import TelaMenu from "./interfaces/MenuSistema";
import {Route} from "react-router-dom";
import ContextoUsuario from "./contexto/ContextoGlobal";
import TelaCadastroJovens from "./interfaces/TelaCadastroJovens";
import TelaCadastroDoacao from "./interfaces/TelaCadastroDoacao";

import { useState } from "react";
import TelaLogin from "./interfaces/TelaLogin";

function App() {
  const [usuario, setUsuario] = useState({
    nome: "",
    logado: false
  });

  if (!usuario.logado) {
    return (
      <ContextoUsuario.Provider value={[usuario, setUsuario]}>
        <Sistema>
          <Route path="*" element={<TelaLogin />} />
        </Sistema>
      </ContextoUsuario.Provider>
    );
  }else{
    return (
      <ContextoUsuario.Provider >
        <Sistema>
          <Route path="*" element ={<TelaMenu/>}></Route>
          <Route path="/cadPretendentes" element ={<TelaCadastroPretedentes/>}></Route>
          <Route path="/cadJovens" element ={<TelaCadastroJovens/>}></Route>
          <Route path="/cadDoacao" element ={<TelaCadastroDoacao/>}></Route>
          <Route path="/cadFuncionarios" element ={<TelaCadastroFuncionarios/>}></Route>
        </Sistema>
      </ContextoUsuario.Provider>
     );
  }
  

}

export default App;