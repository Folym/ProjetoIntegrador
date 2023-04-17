
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/produto'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarProduto = createAsyncThunk('produto/buscarProduto', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dados = await resposta.json();
    return dados;
});

export const adicionarProduto = createAsyncThunk('produto/adicionarProduto', async(produto)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(produto)
    })
    const dados = await resposta.json()
    return {
        resposta : dados
    }
});

export const excluirProduto = createAsyncThunk('produto/excluirProduto', async(produto)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(produto)
    })
    
    const dados = await resposta.json()
    console.log("EXCLUIR :" + dados);
    return {
        resposta : dados
    };
});

const produtoSlice = createSlice({
    name:'produto', 
    initialState:{
        status:STATUS.CARREGADO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarProduto.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarProduto.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;
        })
        .addCase(buscarProduto.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarProduto.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarProduto.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.produto, prod_codigo : action.payload.resposta.prod_codigo});
            }
           
        })
        .addCase(adicionarProduto.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirProduto.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirProduto.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.produto,prod_codigo : action.payload.resposta.prod_codigo});
            }
           
        })
        .addCase(excluirProduto.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});


export default produtoSlice.reducer;