import conectar from "./Conexao.js"

export default class Dao{
    constructor(){

    }
    async gravar(parm){
        console.log(parm)
        try{
            const con = await conectar();
            con.connect()
            const resultado = await con.query(parm);
            console.log(resultado);
            return resultado.rowCount;
        }catch(error){
            console.log(error);
            console.log("Passou 3")
        }
    }

    async atualizar(parm){
        try{
            const con = await conectar();
            con.connect()
            await con.query(parm);
        }catch(error){
            console.log(error);
        }
    }

    async excluir(parm){
        try{
            const con = await conectar();
            con.connect()
            await con.query(parm);
        }catch(error){
            console.log(error);
        }
    }

    async consultar(parm){
        console.log(parm);
        try{
            try{
                const con = await conectar();
                 con.connect()
                let rows = await con.query(parm);
                return rows.rows;
            }catch(error){
                console.log(error);
            }
        }catch(error){
            console.log(error);
        }
    }
    

}