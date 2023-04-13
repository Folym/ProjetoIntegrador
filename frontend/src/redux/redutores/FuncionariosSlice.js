
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const urlBase = 'http://localhost:8080/funcionario'

export const STATUS = Object.freeze({ 
    'OCIOSO': 'idle',
    'CARREGADO':'fulfilled',
    'ERRO':'reajected'
})

export const buscarFuncionarios = createAsyncThunk('funcionario/buscarFuncionarios', async ()=>{
    const resposta = await fetch(urlBase,{method :'GET'})
    const dados = await resposta.json()
    console.log(dados);
    return dados;
});

export const adicionarFuncionarios = createAsyncThunk('funcionario/adicionarFuncionarios', async(funcionario)=>{
    const resposta = await fetch(urlBase,{
        method :'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(funcionario)
    })
  
    const dados = await resposta.json()
    return {
        resposta : dados
    };
});

export const excluirFuncionarios = createAsyncThunk('funcionario/excluirFuncionarios', async(funcionario)=>{
    const resposta = await fetch(urlBase,{
        method :'DELETE',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(funcionario)
    })
    
    const dados = await resposta.json()
    return {
        funcionario:funcionario,
        resposta : dados
    };
});

const funcionarioSlice = createSlice({
    name:'funcionarios', 
    initialState:{
        status:STATUS.CARREGADO,
        dados:[]
    }, 

    reducers:{
    },
    extraReducers:(builder)=>  {
        builder.addCase(buscarFuncionarios.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(buscarFuncionarios.fulfilled,(state,action)=>{
            state.status= STATUS.CARREGADO;
            state.dados = action.payload;// aqii o esta os dados do return do buscar
        })
        .addCase(buscarFuncionarios.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(adicionarFuncionarios.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(adicionarFuncionarios.fulfilled,(state,action)=>{
            // lemabrando que o status do payload é aquele de origem do backend(Controle){
            //     status : true ou false
            //     id: ?
            //     mensagem: "Mensagem que vem de lá"
            // }
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.push({...action.payload.funcionario, codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(adicionarFuncionarios.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
        .addCase(excluirFuncionarios.pending,(state,action)=>{
            state.status= STATUS.OCIOSO;
        })
        .addCase(excluirFuncionarios.fulfilled,(state,action)=>{
            if (action.payload.status ===  false) {
                state.status= STATUS.ERRO;
            } else {
                state.status= STATUS.CARREGADO;
                state.dados.pop({...action.payload.funcionario,codigo : action.payload.resposta.codigo});// aqui espalha o objeto com os ... e depois redefine esse ojeot onde o id do cleinte recebe o id do payload
            }
           
        })
        .addCase(excluirFuncionarios.rejected,(state,action)=>{
            state.status= STATUS.ERRO;
        })
    }
});// para criar uma fatia

//export const{adicionar,remover} = clientesSlice.actions;
export default funcionarioSlice.reducer;// exporta um redutor