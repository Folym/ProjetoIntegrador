import Sistema from "./Sistema";
import TelaCadastroPretedentes from "./interfaces/TelaCadastroPretendentes";
import TelaMenu from "./interfaces/MenuSistema";
import {Route} from "react-router-dom";
import ContextoUsuario from "./contexto/ContextoGlobal";
import TelaCadastroJovens from "./interfaces/TelaCadastroJovens";
import TelaCadastroDoacao from "./interfaces/TelaCadastroDoacao";

function App() {
  
    return (
      <ContextoUsuario.Provider >
        <Sistema>
          <Route path="*" element ={<TelaMenu/>}></Route>
          <Route path="/cadPretendentes" element ={<TelaCadastroPretedentes/>}></Route>
          <Route path="/cadJovens" element ={<TelaCadastroJovens/>}></Route>
          <Route path="/cadDoacao" element ={<TelaCadastroDoacao/>}></Route>
        </Sistema>
      </ContextoUsuario.Provider>
     );
  

}

export default App;
