
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/doacao'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarDoacao = createAsyncThunk('doacao/buscarDoacao', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'});
    const dadosCDin = await resposta.json();
    return dadosCDin;
});

export const adicionarDoacao = createAsyncThunk('doacao/adicionarDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
  
    const dadosCDin = await resposta.json()
    return {
        resposta : dadosCDin
    };
});

export const excluirDoacao = createAsyncThunk('doacao/excluirDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
    const dadosCDin = await resposta.json()
    return {
        doacao:doacao,
        resposta : dadosCDin
    };
});

const doacaoCDinSlice = createSlice({
    name:'doacaoCDin', 
    initialState:{
        statusCDin:STATUS.CARREGADO,
        dadosCDin:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarDoacao.pending,(state,action)=>{
            state.statusCDin= STATUS.OCIOSO;
        })
        .addCase(buscarDoacao.fulfilled,(state,action)=>{
            state.statusCDin= STATUS.CARREGADO;
            state.dadosCDin = action.payload;
        })
        .addCase(buscarDoacao.rejected,(state,action)=>{
            state.statusCDin= STATUS.ERRO;
        })
        .addCase(adicionarDoacao.pending,(state,action)=>{
            state.statusCDin= STATUS.OCIOSO;
        })
        .addCase(adicionarDoacao.fulfilled,(state,action)=>{

            if (action.payload.statusCDin ===  false) {
                state.statusCDin= STATUS.ERRO;
            } else {
                state.statusCDin= STATUS.CARREGADO;
                state.dadosCDin.push({...action.payload.doacao, doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(adicionarDoacao.rejected,(state,action)=>{
            state.statusCDin= STATUS.ERRO;
        })
        .addCase(excluirDoacao.pending,(state,action)=>{
            state.statusCDin= STATUS.OCIOSO;
        })
        .addCase(excluirDoacao.fulfilled,(state,action)=>{
            if (action.payload.statusCDin ===  false) {
                state.statusCDin= STATUS.ERRO;
            } else {
                state.statusCDin= STATUS.CARREGADO;
                state.dadosCDin.pop({...action.payload.doacao,doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(excluirDoacao.rejected,(state,action)=>{
            state.statusCDin= STATUS.ERRO;
        })
    }
});
export default doacaoCDinSlice.reducer;