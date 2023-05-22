
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/doacao'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarDoacao = createAsyncThunk('doacao/buscarDoacao', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'});
    const dadosLDin = await resposta.json();
    return dadosLDin;
});

export const adicionarDoacao = createAsyncThunk('doacao/adicionarDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
  
    const dadosLDin = await resposta.json()
    return {
        resposta : dadosLDin
    };
});

export const excluirDoacao = createAsyncThunk('doacao/excluirDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
    const dadosLDin = await resposta.json()
    return {
        doacao:doacao,
        resposta : dadosLDin
    };
});

const doacaoLDinSlice = createSlice({
    name:'doacaoLDin', 
    initialState:{
        statusLDin:STATUS.CARREGADO,
        dadosLDin:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarDoacao.pending,(state,action)=>{
            state.statusLDin= STATUS.OCIOSO;
        })
        .addCase(buscarDoacao.fulfilled,(state,action)=>{
            state.statusLDin= STATUS.CARREGADO;
            state.dadosLDin = action.payload;
        })
        .addCase(buscarDoacao.rejected,(state,action)=>{
            state.statusLDin= STATUS.ERRO;
        })
        .addCase(adicionarDoacao.pending,(state,action)=>{
            state.statusLDin= STATUS.OCIOSO;
        })
        .addCase(adicionarDoacao.fulfilled,(state,action)=>{

            if (action.payload.statusLDin ===  false) {
                state.statusLDin= STATUS.ERRO;
            } else {
                state.statusLDin= STATUS.CARREGADO;
                state.dadosLDin.push({...action.payload.doacao, doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(adicionarDoacao.rejected,(state,action)=>{
            state.statusLDin= STATUS.ERRO;
        })
        .addCase(excluirDoacao.pending,(state,action)=>{
            state.statusLDin= STATUS.OCIOSO;
        })
        .addCase(excluirDoacao.fulfilled,(state,action)=>{
            if (action.payload.statusLDin ===  false) {
                state.statusLDin= STATUS.ERRO;
            } else {
                state.statusLDin= STATUS.CARREGADO;
                state.dadosLDin.pop({...action.payload.doacao,doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(excluirDoacao.rejected,(state,action)=>{
            state.statusLDin= STATUS.ERRO;
        })
    }
});
export default doacaoLDinSlice.reducer;