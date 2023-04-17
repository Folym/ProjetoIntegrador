
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/campanhas'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarCampanhas = createAsyncThunk('campanhas/buscarCampanhas', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dados = await resposta.json()
    //console.log(dados);
    return dados;
});

export const adicionarCampanhas = createAsyncThunk('campanhas/adicionarCampanhas', async(campanhas)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(campanhas)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const atualizarCampanhas = createAsyncThunk('campanhas/atualizarCampanhas', async(campanhas)=>{
    const resposta = await fetch(urlBase,{
        method :'PUT',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(campanhas)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const excluirCampanhas = createAsyncThunk('campanhas/excluirCampanhas', async(campanhas)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(campanhas)
    })
    
    const dados = await resposta.json()
    console.log("EXCLUIR :" + dados);
    return {
       // pretendente:pretendente,
        resposta : dados
    };
    //return dados;
});

const campanhasSlice = createSlice({
    name:'campanhas', 
    initialState:{
        status:STATUS.OCIOSO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarCampanhas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarCampanhas.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;// aqii o esta os dados do return do buscarClientes
        })
        .addCase(buscarCampanhas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarCampanhas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarCampanhas.fulfilled,(state,action)=>{
            // lemabrando que o status do payload é aquele de origem do backend(Controle){
            //     status : true ou false
            //     id: ?
            //     mensagem: "Mensagem que vem de lá"
            // }
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.campanhas, codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(adicionarCampanhas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirCampanhas.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirCampanhas.fulfilled,(state,action)=>{
        console.log("AQUI1")
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.campanhas,codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(excluirCampanhas.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});// para criar uma fatia

//export const{adicionar,remover} = clientesSlice.actions;
export default campanhasSlice.reducer;// exporta um redutor