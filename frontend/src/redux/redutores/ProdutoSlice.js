
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/produto'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarProduto = createAsyncThunk('produto/buscarProduto', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dadosPr = await resposta.json();
    return dadosPr;
});

export const adicionarProduto = createAsyncThunk('produto/adicionarProduto', async(produto)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(produto)
    })
    const dadosPr = await resposta.json()
    return {
        resposta : dadosPr
    }
});

export const excluirProduto = createAsyncThunk('produto/excluirProduto', async(produto)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(produto)
    })
    
    const dadosPr = await resposta.json()
    console.log("EXCLUIR :" + dadosPr);
    return {
        resposta : dadosPr
    };
});

const produtoSlice = createSlice({
    name:'produto', 
    initialState:{
        statusPr:STATUS.CARREGADO,
        dadosPr:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarProduto.pending,(state,action)=>{
            state.statusPr= STATUS.OCIOSO;
        })
        .addCase(buscarProduto.fulfilled,(state,action)=>{
            state.statusPr= STATUS.CARREGADO;
            state.dadosPr = action.payload;
        })
        .addCase(buscarProduto.rejected,(state,action)=>{
            state.statusPr= STATUS.ERRO;
        })
        .addCase(adicionarProduto.pending,(state,action)=>{
            state.statusPr= STATUS.OCIOSO;
        })
        .addCase(adicionarProduto.fulfilled,(state,action)=>{
            if (action.payload.statusPr ===  false) {
                state.statusPr= STATUS.ERRO;
            } else {
                state.statusPr= STATUS.CARREGADO;
                state.dadosPr.push({...action.payload.produto, prod_codigo : action.payload.resposta.prod_codigo});
            }
           
        })
        .addCase(adicionarProduto.rejected,(state,action)=>{
            state.statusPr= STATUS.ERRO;
        })
        .addCase(excluirProduto.pending,(state,action)=>{
            state.statusPr= STATUS.OCIOSO;
        })
        .addCase(excluirProduto.fulfilled,(state,action)=>{
            if (action.payload.statusPr ===  false) {
                state.statusPr= STATUS.ERRO;
            } else {
                state.statusPr= STATUS.CARREGADO;
                state.dadosPr.pop({...action.payload.produto,prod_codigo : action.payload.resposta.prod_codigo});
            }
           
        })
        .addCase(excluirProduto.rejected,(state,action)=>{
            state.statusPr= STATUS.ERRO;
        })
    }
});


export default produtoSlice.reducer;