import express from "express";
import rotaDoacao from "./Rotas/rotaDoacao.js";
import rotaPret from "./Rotas/rotaPretendente.js";
import rotaJovem from "./Rotas/rotaJovem.js";
import rotaFunc from "./Rotas/rotaFuncionario.js";
import cors from "cors";


const app = express();

app.use(cors({
    origin:'*'
}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/doacao",rotaDoacao);
app.use("/pretendente",rotaPret);
app.use("/jovem",rotaJovem);
app.use("/funcionario",rotaFunc);
app.listen(8080,()=>{
    console.log("Executando");
});


// TESTE CONEXAO COM BANCO
// let pret = new Pretendentes(6,'Henrique','111111','22222','henrique@','rua moro',23,11111,'DEU');
// //let pret = new Pretendentes();


// console.log(pret.toString());
// console.log(JSON.stringify(pret));// stringify pega um objeto é tranforma em um JSON - precisa ter o toJSON laá em cliente

// pret.excluir(5).then((results)=>{
//      console.log(`Pretendente ${pret.codigo} gravado com sucesso !`);
//     // console.log(results)
     
// });

// import  pkg from 'pg'; 
// const {Client} = pkg;

// const conexao = new Client({
//     user: 'postgres',
//     host: '127.0.0.1',
//     database: 'Casa_Lar',
//     password: 'postgres123',
//     port: 5432
//     })
// conexao.connect();
// conexao.query("SELECT * FROM Pretendente")
// .then(results =>{
//     let resultado = results.rows;
//     console.log(resultado);
// })



