import { configureStore } from "@reduxjs/toolkit"
import PretendentesSlice from "./redutores/PretendentesSlice";
import JovensSlice from "./redutores/JovensSlice";

const store = configureStore({
    reducer:{//é algo global o reducer e combina umas listas de reducers
        pretendentes: PretendentesSlice,
        jovens: JovensSlice,
    }

})

export default store;