
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/doacao'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarDoacao = createAsyncThunk('doacao/buscarDoacao', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'});
    const dadosCProd = await resposta.json();
    return dadosCProd;
});

export const adicionarDoacao = createAsyncThunk('doacao/adicionarDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
  
    const dadosCProd = await resposta.json()
    return {
        resposta : dadosCProd
    };
});

export const excluirDoacao = createAsyncThunk('doacao/excluirDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
    const dadosCProd = await resposta.json()
    return {
        doacao:doacao,
        resposta : dadosCProd
    };
});

const doacaoCProdSlice = createSlice({
    name:'doacaoCProd', 
    initialState:{
        statusCProd:STATUS.CARREGADO,
        dadosCProd:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarDoacao.pending,(state,action)=>{
            state.statusCProd= STATUS.OCIOSO;
        })
        .addCase(buscarDoacao.fulfilled,(state,action)=>{
            state.statusCProd= STATUS.CARREGADO;
            state.dadosCProd = action.payload;
        })
        .addCase(buscarDoacao.rejected,(state,action)=>{
            state.statusCProd= STATUS.ERRO;
        })
        .addCase(adicionarDoacao.pending,(state,action)=>{
            state.statusCProd= STATUS.OCIOSO;
        })
        .addCase(adicionarDoacao.fulfilled,(state,action)=>{

            if (action.payload.statusCProd ===  false) {
                state.statusCProd= STATUS.ERRO;
            } else {
                state.statusCProd= STATUS.CARREGADO;
                state.dadosCProd.push({...action.payload.doacao, doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(adicionarDoacao.rejected,(state,action)=>{
            state.statusCProd= STATUS.ERRO;
        })
        .addCase(excluirDoacao.pending,(state,action)=>{
            state.statusCProd= STATUS.OCIOSO;
        })
        .addCase(excluirDoacao.fulfilled,(state,action)=>{
            if (action.payload.statusCProd ===  false) {
                state.statusCProd= STATUS.ERRO;
            } else {
                state.statusCProd= STATUS.CARREGADO;
                state.dadosCProd.pop({...action.payload.doacao,doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(excluirDoacao.rejected,(state,action)=>{
            state.statusCProd= STATUS.ERRO;
        })
    }
});
export default doacaoCProdSlice.reducer;