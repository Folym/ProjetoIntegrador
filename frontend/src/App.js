import Sistema from "./Sistema";
import TelaCadastroPretedentes from "./interfaces/TelaCadastroPretendentes";
import TelaMenu from "./interfaces/MenuSistema";
import {Route} from "react-router-dom";
import ContextoUsuario from "./contexto/ContextoGlobal";
import TelaCadastroJovens from "./interfaces/TelaCadastroJovens";

function App() {
  
    return (
      <ContextoUsuario.Provider >
        <Sistema>
          <Route path="*" element ={<TelaMenu/>}></Route>
          <Route path="/cadPretendentes" element ={<TelaCadastroPretedentes/>}></Route>
          <Route path="/cadJovens" element ={<TelaCadastroJovens/>}></Route>
        </Sistema>
      </ContextoUsuario.Provider>
     );
  

}

export default App;
