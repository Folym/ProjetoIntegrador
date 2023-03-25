import conectar from "./Conexao.js"

export default class Dao{
    constructor(){

    }
    async gravar(parm){
        try{
            const con = await conectar();
            const resultado = await con.query(parm.sql, parm.dados);
            return resultado[0].insertId;
        }catch(error){
            console.log(error);
        }
    }

    async atualizar(parm){
        try{
            const con = await conectar();
            await con.query(parm.sql, parm.dados);
        }catch(error){
            console.log(error);
        }
    }

    async excluir(parm){
        try{
            const con = await conectar();
            await con.query(parm.sql,parm.dados);
        }catch(error){
            console.log(error);
        }
    }

    async consultar(parm){
        try{
            const con = await conectar();
            try{
                const [rows] = await conexao.query(parm.sql,parm.dados);
                return [rows];
            }catch(error){
                console.log(error);
            }
        }catch(error){
            console.log(error);
        }
    }
    

}