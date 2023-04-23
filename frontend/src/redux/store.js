import { configureStore } from "@reduxjs/toolkit"
import PretendentesSlice from "./redutores/PretendentesSlice";
import JovensSlice from "./redutores/JovensSlice";
import DoacaoCProdSlice from "./redutores/DoacaoCProdSlice";
import FuncionariosSlice from "./redutores/FuncionariosSlice";
import ProdutoSlice from "./redutores/ProdutoSlice.js";
import CampanhasSlice from "./redutores/CampDoacaoSlice";

const store = configureStore({
    reducer:{
        pretendentes: PretendentesSlice,
        jovens: JovensSlice,
        doacao: DoacaoCProdSlice,
        funcionarios: FuncionariosSlice,
        produto: ProdutoSlice,
        campanhas : CampanhasSlice,

    }

})

export default store;