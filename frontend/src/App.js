import Sistema from "./Sistema";
import TelaCadastroPretedentes from "./interfaces/TelaCadastroPretendentes";
import TelaMenu from "./interfaces/MenuSistema";
import {Route} from "react-router-dom";
import ContextoUsuario from "./contexto/ContextoGlobal";
import TelaCadastroProduto from "./interfaces/TelaCadastroProduto.js";
import TelaCadastroJovens from "./interfaces/TelaCadastroJovens.js";
import TelaCadastroDoacao from "./interfaces/TelaCadastroDoacao.js";
import TelaCadastroFuncionarios from "./interfaces/TelaCadastroFuncionarios.js";
import TelaCadastroCampDoacao from "./interfaces/TelaCadastroCampanha";


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
          <Route path="/cadProduto" element ={<TelaCadastroProduto/>}></Route>
          <Route path="/cadFuncionarios" element ={<TelaCadastroFuncionarios/>}></Route>
          <Route path="/cadCampanhaDoacao" element ={<TelaCadastroCampDoacao/>}></Route>
          <Route path="/regDoacao" element ={<TelaCadastroDoacao/>}></Route>
        </Sistema>
      </ContextoUsuario.Provider>
     );
  }
  

}

export default App;