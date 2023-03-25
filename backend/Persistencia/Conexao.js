import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.conexao && global.conexao.state !== "disconnected"){
        return global.conexao;
    }

    const conexao = await mysql.createConnection({
        host:"localhost",
        port:3306,
        user:"root",
        password:"",
        database:"backend"
    });
    global.conexao = conexao;
    return conexao;
}


