
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/doacao'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarDoacao = createAsyncThunk('doacao/buscarDoacao', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'});
    const dados = await resposta.json();
    return dados;
});

export const adicionarDoacao = createAsyncThunk('doacao/adicionarDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const excluirDoacao = createAsyncThunk('doacao/excluirDoacao', async(doacao)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(doacao)
    })
    const dados = await resposta.json()
    return {
        doacao:doacao,
        resposta : dados
    };
});

const doacaoCProdSlice = createSlice({
    name:'doacao', 
    initialState:{
        status:STATUS.CARREGADO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarDoacao.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarDoacao.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;
        })
        .addCase(buscarDoacao.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarDoacao.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarDoacao.fulfilled,(state,action)=>{

            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.doacao, doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(adicionarDoacao.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirDoacao.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirDoacao.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.doacao,doac_codigo : action.payload.resposta.doac_codigo});
            }
        })
        .addCase(excluirDoacao.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});
export default doacaoCProdSlice.reducer;