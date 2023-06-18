
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/doacao'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})


function buscarProdutoId(produtoId, produtos) {
    let pos = 0;
    while (pos < produtos.length && produtos[pos].prod_cod !== produtoId) {
      pos++;

    return produtos[pos].nome;
  }
}
  export const buscarDoacao = createAsyncThunk('doacao/buscarDoacao', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    .then(resposta => resposta.json())
    .then(dadosDoacao => {
      const urlDeBuscarProdutos = "http://localhost:8080/produto";
      fetch(urlDeBuscarProdutos,{method :'GET'})
      .then(resposta => resposta.json())
      .then(produtos => {
          dadosDoacao.map(doacao => {
            const nomeProduto = buscarProdutoId(doacao.prod_cod, produtos)
            doacao.produtoId = nomeProduto;
          })  
        }          
      )      
    })
    return resposta;
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