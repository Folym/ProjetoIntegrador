import { configureStore } from "@reduxjs/toolkit"
import PretendentesSlice from "./redutores/PretendentesSlice";
import JovensSlice from "./redutores/JovensSlice";
import DoacaoSlice from "./redutores/DoacaoSlice";
import FuncionariosSlice from "./redutores/FuncionariosSlice";

const store = configureStore({
    reducer:{
        pretendentes: PretendentesSlice,
        jovens: JovensSlice,
        doacao: DoacaoSlice,
        funcionarios: FuncionariosSlice,
    }

})

export default store;