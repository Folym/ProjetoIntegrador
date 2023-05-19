import { configureStore } from "@reduxjs/toolkit"
import PretendentesSlice from "./redutores/PretendentesSlice";
import JovensSlice from "./redutores/JovensSlice";
import DoacaoCProdSlice from "./redutores/DoacaoCProdSlice";
import FuncionariosSlice from "./redutores/FuncionariosSlice";
import ProdutoSlice from "./redutores/ProdutoSlice.js";
import CampanhasSlice from "./redutores/CampDoacaoSlice";
import DespesasSlice from "./redutores/DespesasSlice";
import ParcelasSlice from "./redutores/ParcelasSlice.js";
import TipoDespesaSlice from "./redutores/TipoDespesaSlice.js";

const store = configureStore({
    reducer:{
        pretendentes: PretendentesSlice,
        jovens: JovensSlice,
        doacao: DoacaoCProdSlice,
        funcionarios: FuncionariosSlice,
        produto: ProdutoSlice,
        campanhas : CampanhasSlice,
        despesas: DespesasSlice,
        parcelas: ParcelasSlice,
        tiposdesp: TipoDespesaSlice
    }

})

export default store;