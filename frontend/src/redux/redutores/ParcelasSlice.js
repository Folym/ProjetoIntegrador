
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/parcelas'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarParcelas = createAsyncThunk('despesas/buscarParcelas', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dados = await resposta.json()
    /*console.log(dados);*/
    return dados;
});

export const adicionarParcelas = createAsyncThunk('despesas/adicionarParcelas', async(parcela)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(parcela)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const excluirParcelas = createAsyncThunk('despesas/excluirParcelas', async(parcela)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(parcela)
    })
    
    const dados = await resposta.json()
    return {
        parcela:parcela,
        resposta : dados
    };
});

const parcelaSlice = createSlice({
    name:'parcelas', 
    initialState:{
        status:STATUS.CARREGADO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarParcelas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarParcelas.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;
        })
        .addCase(buscarParcelas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarParcelas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarParcelas.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.parcela, codigo : action.payload.resposta.codigo});
            }
           
        })
        .addCase(adicionarParcelas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirParcelas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirParcelas.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.parcela,codigo : action.payload.resposta.parcela});
            }
           
        })
        .addCase(excluirParcelas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});
export default parcelaSlice.reducer;