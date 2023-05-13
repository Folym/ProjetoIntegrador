
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/despesas'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarDespesas = createAsyncThunk('despesas/buscarDespesas', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dados = await resposta.json()
    /*console.log(dados);*/
    return dados;
});

export const adicionarDespesas = createAsyncThunk('despesas/adicionarDespesas', async(despesa)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(despesa)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const excluirDespesas = createAsyncThunk('despesas/excluirDespesas', async(despesa)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(despesa)
    })
    
    const dados = await resposta.json()
    return {
        despesa:despesa,
        resposta : dados
    };
});

const despesaSlice = createSlice({
    name:'despesas', 
    initialState:{
        status:STATUS.CARREGADO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarDespesas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarDespesas.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;
        })
        .addCase(buscarDespesas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarDespesas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarDespesas.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.despesa, codigo : action.payload.resposta.codigo});
            }
           
        })
        .addCase(adicionarDespesas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirDespesas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirDespesas.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.despesa,codigo : action.payload.resposta.despesa});
            }
           
        })
        .addCase(excluirDespesas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});
export default despesaSlice.reducer;