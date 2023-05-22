
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/doacao'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarDoacao = createAsyncThunk('doacao/buscarDoacao', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'});
    const dadosLProd = await resposta.json();
    return dadosLProd;
});

export const adicionarDoacao = createAsyncThunk('doacao/adicionarDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
  
    const dadosLProd = await resposta.json()
    return {
        resposta : dadosLProd
    };
});

export const excluirDoacao = createAsyncThunk('doacao/excluirDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
    const dadosLProd = await resposta.json()
    return {
        doacao:doacao,
        resposta : dadosLProd
    };
});

const doacaoLProdSlice = createSlice({
    name:'doacaoLProd', 
    initialState:{
        statusLProd:STATUS.CARREGADO,
        dadosLProd:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarDoacao.pending,(state,action)=>{
            state.statusLProd= STATUS.OCIOSO;
        })
        .addCase(buscarDoacao.fulfilled,(state,action)=>{
            state.statusLProd= STATUS.CARREGADO;
            state.dadosLProd = action.payload;
        })
        .addCase(buscarDoacao.rejected,(state,action)=>{
            state.statusLProd= STATUS.ERRO;
        })
        .addCase(adicionarDoacao.pending,(state,action)=>{
            state.statusLProd= STATUS.OCIOSO;
        })
        .addCase(adicionarDoacao.fulfilled,(state,action)=>{

            if (action.payload.statusLProd ===  false) {
                state.statusLProd= STATUS.ERRO;
            } else {
                state.statusLProd= STATUS.CARREGADO;
                state.dadosLProd.push({...action.payload.doacao, doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(adicionarDoacao.rejected,(state,action)=>{
            state.statusLProd= STATUS.ERRO;
        })
        .addCase(excluirDoacao.pending,(state,action)=>{
            state.statusLProd= STATUS.OCIOSO;
        })
        .addCase(excluirDoacao.fulfilled,(state,action)=>{
            if (action.payload.statusLProd ===  false) {
                state.statusLProd= STATUS.ERRO;
            } else {
                state.statusLProd= STATUS.CARREGADO;
                state.dadosLProd.pop({...action.payload.doacao,doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(excluirDoacao.rejected,(state,action)=>{
            state.statusLProd= STATUS.ERRO;
        })
    }
});
export default doacaoLProdSlice.reducer;