import conectar from "./Conexao.js"

export default class Dao{
    constructor(){

    }
    async gravar(param){
        try{
            const con = await conectar();
            con.connect()
            const resultado = await con.query(param);
            console.log(resultado);
            return resultado.rowCount;
        }catch(error){
            console.log(error);
        }
    }

    async atualizar(param){
        try{
            const con = await conectar();
            con.connect()
            await con.query(param);
        }catch(error){
            console.log(error);
        }
    }

    async excluir(param){
        try{
            const con = await conectar();
            con.connect()
            await con.query(param);
        }catch(error){
            console.log(error);
        }
    }

    async consultar(param){
        console.log(param);
        try{
            try{
                const con = await conectar();
                con.connect()
                let rows = await con.query(param);
                return rows.rows;
            }catch(error){
                console.log(error);
            }
        }catch(error){
            console.log(error);
        }
    }
    

}