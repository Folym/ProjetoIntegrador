import { configureStore } from "@reduxjs/toolkit"
import PretendentesSlice from "./redutores/PretendentesSlice";
import JovensSlice from "./redutores/JovensSlice";
import DoacaoCProdSlice from "./redutores/DoacaoCProdSlice";
import DoacaoLProdSlice from "./redutores/DoacaoLProdSlice";
import DoacaoCDinSlice from "./redutores/DoacaoCDinSlice";
import DoacaoLDinSlice from "./redutores/DoacaoLDinSlice";
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
        doacaoCProd: DoacaoCProdSlice,
        doacaoLProd: DoacaoLProdSlice,
        doacaoCDin : DoacaoCDinSlice,
        doacaoLDin : DoacaoLDinSlice,
        funcionarios: FuncionariosSlice,
        produto: ProdutoSlice,
        campanhas : CampanhasSlice,
        despesas: DespesasSlice,
        parcelas: ParcelasSlice,
        tiposdesp: TipoDespesaSlice
    }

})

export default store;