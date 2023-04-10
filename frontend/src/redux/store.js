import { configureStore } from "@reduxjs/toolkit"
import PretendentesSlice from "./redutores/PretendentesSlice.js";
import DoacaoSlice from "./redutores/DoacaoSlice.js";


const store = configureStore({
    reducer:{
        pretendentes: PretendentesSlice,
        doacao : DoacaoSlice,
    }

})

export default store;