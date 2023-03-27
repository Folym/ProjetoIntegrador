import { configureStore } from "@reduxjs/toolkit"
import PretendentesSlice from "./redutores/PretendentesSlice";

const store = configureStore({
    reducer:{//é algo global o reducer e combina umas listas de reducers
        pretendentes: PretendentesSlice,
    }

})

export default store;