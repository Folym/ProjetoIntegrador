import mysql from 'mysql2/promise';
import  pkg from 'pg'; 
const {Pool, Client} = pkg;

export default async function conectar(){
    // if (global.conexao && global.conexao.state !== "disconnected"){
    //     return "AQUI :" +global.conexao;
    // }

   

    const conexao = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'Casa_Lar',
    password: 'postgres123',
    port: 5432
    });

    //global.conexao = conexao;
    conexao.query("SELECT * FROM Pretendente")
    .then(results =>{
        let resultado = results.rows;
     console.log(resultado);
 }).catch((erro)=>{console.log(erro)})
    return conexao;

}


