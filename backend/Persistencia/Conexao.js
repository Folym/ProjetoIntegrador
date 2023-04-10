import mysql from 'mysql2/promise';
import  pkg from 'pg'; 
const {Pool, Client} = mysql;

export default async function conectar(){
    // if (global.conexao && global.conexao.state !== "disconnected"){
    //     return "AQUI :" +global.conexao;
    // }

   

    const conexao = new Client({
    user: 'root',
    host: '127.0.0.1',
    database: 'pi',
    password: 'fred10',
    port: 3306
    });

    //global.conexao = conexao;
    return conexao;

}


