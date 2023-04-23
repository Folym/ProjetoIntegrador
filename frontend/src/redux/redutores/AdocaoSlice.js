
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/adocao'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarAdocoes = createAsyncThunk('adocao/buscarAdocoes', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dados = await resposta.json()
    console.log(dados);
    return dados;
});


export const adicionarAdocoes = createAsyncThunk('adocao/adicionarAdocoes', async(adocao)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(adocao)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const excluirAdocoes = createAsyncThunk('adocao/excluirAdocoes', async(adocao)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(adocao)
    })
    
    const dados = await resposta.json()
    return {
        adocao:adocao,
        resposta : dados
    };
});

const adocaoSlice = createSlice({
    name:'adocoes', 
    initialState:{
        status:STATUS.CARREGADO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarAdocoes.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarAdocoes.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;
        })
        .addCase(buscarAdocoes.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarAdocoes.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarAdocoes.fulfilled,(state,action)=>{
          
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.adocao, codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(adicionarAdocoes.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirAdocoes.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirAdocoes.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.adocao,codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(excluirAdocoes.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});

export default adocaoSlice.reducer;