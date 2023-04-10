import { configureStore } from "@reduxjs/toolkit"
import PretendentesSlice from "./redutores/PretendentesSlice";
import JovensSlice from "./redutores/JovensSlice";
import DoacaoSlice from "./redutores/DoacaoSlice";

const store = configureStore({
    reducer:{
        pretendentes: PretendentesSlice,
        jovens: JovensSlice,
        doacao: DoacaoSlice,
    }

})

export default store;