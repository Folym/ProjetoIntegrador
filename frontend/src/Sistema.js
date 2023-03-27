import {BrowserRouter,Routes} from "react-router-dom";

// import { useContext } from "react";
// import ContextoUsuario  from "./contextos/ContextoGlobal";// qual contexto vai usar

export default function Sistema(props){
    

    return(
        <div>
        {/* <Button variant="primary">Primary</Button> */}
         <BrowserRouter>
           <Routes>
              {props.children}
           </Routes>
         </BrowserRouter>
         {/* Esse dois e para emvolver em uma rota */}
       </div>
    );
}