import mysql from 'mysql2';

export async function conectar(){
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

/*export async function desconectar(){
    if (global.conexao && global.conexao.state !== "connected"){
        return global.conexao.end();
    }
}*/

