
export default class Dao{
    constructor(){

    }
    async gravar(parm){
            const con = await conectar();//fazer conexao
            const resultado = await con.query(parm.sql, parm.dados);
            return resultado[0].insertId;
    }

    async atualizar(parm){
            const con = await conectar();
            await con.query(parm.sql, parm.dados);
    }

    async excluir(parm){
            const con = await conectar();
            await con.query(parm.sql,parm.dados);
    }

}