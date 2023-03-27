
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/pretendente'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarPretendentes = createAsyncThunk('pretendente/buscarPretendentes', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dados = await resposta.json()
    return dados;
});

export const adicionarPretendentes = createAsyncThunk('pretendente/adicionarPretendentes', async(pretendente)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(pretendente)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const excluirPretendentes = createAsyncThunk('pretendente/excluirPretendentes', async(pretendente)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(pretendente)
    })
    
    const dados = await resposta.json()
    return {
        pretendente:pretendente,
        resposta : dados
    };
});

const pretendenteSlice = createSlice({
    name:'pretendentes', 
    initialState:{
        status:STATUS.CARREGADO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarPretendentes.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarPretendentes.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;// aqii o esta os dados do return do buscarClientes
        })
        .addCase(buscarPretendentes.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarPretendentes.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarPretendentes.fulfilled,(state,action)=>{
            // lemabrando que o status do payload é aquele de origem do backend(Controle){
            //     status : true ou false
            //     id: ?
            //     mensagem: "Mensagem que vem de lá"
            // }
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.pretendente, codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(adicionarPretendentes.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirPretendentes.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirPretendentes.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.pretendente,codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(excluirPretendentes.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});// para criar uma fatia

//export const{adicionar,remover} = clientesSlice.actions;
export default pretendenteSlice.reducer;// exporta um redutor