
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/campanhas'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarCampanhas = createAsyncThunk('campanhas/buscarCampanhas', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dadosCamp = await resposta.json()
    //console.log(dados);
    return dadosCamp;
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
        statusCamp:STATUS.OCIOSO,
        dadosCamp:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarCampanhas.pending,(state,action)=>{
            state.statusCamp= STATUS.OCIOSO;
        })
        .addCase(buscarCampanhas.fulfilled,(state,action)=>{
            state.statusCamp= STATUS.CARREGADO;
            state.dadosCamp = action.payload;// aqii o esta os dados do return do buscarClientes
        })
        .addCase(buscarCampanhas.rejected,(state,action)=>{
            state.statusCamp= STATUS.ERRO;
        })
        .addCase(adicionarCampanhas.pending,(state,action)=>{
            state.statusCamp= STATUS.OCIOSO;
        })
        .addCase(adicionarCampanhas.fulfilled,(state,action)=>{
            // lemabrando que o status do payload é aquele de origem do backend(Controle){
            //     status : true ou false
            //     id: ?
            //     mensagem: "Mensagem que vem de lá"
            // }
            if (action.payload.status ===  false) {
                state.statusCamp= STATUS.ERRO;
            } else {
                state.statusCamp= STATUS.CARREGADO;
                state.dadosCamp.push({...action.payload.campanhas, codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(adicionarCampanhas.rejected,(state,action)=>{
            state.statusCamp= STATUS.ERRO;
        })
        .addCase(excluirCampanhas.pending,(state,action)=>{
            state.statusCamp= STATUS.OCIOSO;
        })
        .addCase(excluirCampanhas.fulfilled,(state,action)=>{
        console.log("AQUI1")
            if (action.payload.status ===  false) {
                state.statusCamp= STATUS.ERRO;
            } else {
                state.statusCamp= STATUS.CARREGADO;
                state.dadosCamp.pop({...action.payload.campanhas,codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(excluirCampanhas.rejected,(state,action)=>{
            state.statusCamp= STATUS.ERRO;
        })
    }
});// para criar uma fatia

//export const{adicionar,remover} = clientesSlice.actions;
export default campanhasSlice.reducer;// exporta um redutor