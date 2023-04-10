
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/jovem'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarJovens = createAsyncThunk('jovem/buscarJovens', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dados = await resposta.json()
    console.log(dados);
    return dados;
});


export const adicionarJovens = createAsyncThunk('jovem/adicionarJovens', async(jovem)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(jovem)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const excluirJovens = createAsyncThunk('jovem/excluirJovens', async(jovem)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(jovem)
    })
    
    const dados = await resposta.json()
    return {
        jovem:jovem,
        resposta : dados
    };
});

const jovemSlice = createSlice({
    name:'jovens', 
    initialState:{
        status:STATUS.CARREGADO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarJovens.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarJovens.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;// aqii o esta os dados do return do buscarClientes
        })
        .addCase(buscarJovens.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarJovens.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarJovens.fulfilled,(state,action)=>{
          
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.jovem, codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(adicionarJovens.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirJovens.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirJovens.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.jovem,codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(excluirJovens.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});

export default jovemSlice.reducer;