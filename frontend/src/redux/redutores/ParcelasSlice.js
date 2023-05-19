
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/parcelas'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarParcelas = createAsyncThunk('parcelas/buscarParcelas', async (parcela)=>{
    const resposta = await fetch(urlBase+"/"+parcela,{method :'GET'})
    console.log('CHAMOU SLICE')
    const dados = await resposta.json()
    return dados;
});

export const adicionarParcelas = createAsyncThunk('parcelas/adicionarParcelas', async(parcela)=>{
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

export const excluirParcelas = createAsyncThunk('parcelas/excluirParcelas', async(parcela)=>{
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
        status_parcela:STATUS.CARREGADO,
        dados_parcela:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarParcelas.pending,(state,action)=>{
            state.status_parcela= STATUS.OCIOSO;
        })
        .addCase(buscarParcelas.fulfilled,(state,action)=>{
            state.status_parcela= STATUS.CARREGADO;
            state.dados_parcela = action.payload;
        })
        .addCase(buscarParcelas.rejected,(state,action)=>{
            state.status_parcela= STATUS.ERRO;
        })
        .addCase(adicionarParcelas.pending,(state,action)=>{
            state.status_parcela= STATUS.OCIOSO;
        })
        .addCase(adicionarParcelas.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados_parcela.push({...action.payload.parcela, codigo : action.payload.resposta.codigo});
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