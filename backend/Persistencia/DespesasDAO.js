import Despesas from "../Modelo/Despesas.js";
import Dao from "./Dao.js"
export default class DespesasDAO{
    constructor(){

    }

    async gravar(despesa){
        if(despesa instanceof Despesas){
            const dao = new Dao();
            const sql = `INSERT INTO Despesas (desp_vencimento, desp_valor, desp_numparcelas, desp_desconto) VALUES ('${despesa.vencimento}', ${despesa.valor}, ${despesas.numparcelas}, ${despesas.desconto});`
            return await dao.gravar(sql);
        }
    }

    async atualizar(despesa){
        if(despesa instanceof Despesas){
            const dao = new Dao();
            const sql = `UPDATE Despesas SET desp_vencimento=${desp.vencimento}, desp_valor=${desp.valor}, desp_numparcelas=${desp.numparcelas}, desp_desconto=${desp.desconto} WHERE desp_codigo = ${desp.codigo}`
            await dao.atualizar(sql);
        }
    }

    async excluir(despesa){
        if(despesa instanceof Despesas){
            const dao = new Dao();
            const sql = `DELETE FROM Despesas WHERE desp_codigo = ${desp.codigo}`;
            await dao.excluir(sql);
        }
    }

    async consultarTodos(){
        const dao = new Dao();
        const sql = "SELECT * FROM Despesas"
        return dao.consultar(sql);
}

    async consultarVencimento(vencimento){
            const dao = new Dao();
            const sql = "SELECT * FROM Despesas WHERE desp_vencimento like '%'"+vencimento+"'%'";
            return await dao.consultar(sql);
    }

    async consultarParcelas(codigo){
        const dao = new Dao();
        const sql = `SELECT * FROM Parcelas WHERE desp_codigo = ${desp.codigo}`;
        return await dao.consultar(sql);
}
}