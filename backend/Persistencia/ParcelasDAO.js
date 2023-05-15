import Parcelas from "../Modelo/Parcelas.js";
import Dao from "./Dao.js"
export default class ParcelasDAO{
    constructor(){

    }

    async gravar(parcela){
        if(parcela instanceof Parcelas){
            const dao = new Dao();
            const sql = `INSERT INTO Parcelas (desp_codigo, parc_valor, parc_vencimento) VALUES ('${parcela.desp_codigo}', ${parcela.valor}, ${parcela.vencimento});`
            return await dao.gravar(sql);
        }
    }

    async atualizar(parcela){
        if(parcela instanceof Parcelas){
            const dao = new Dao();
            const sql = `UPDATE Parcelas SET parc_vencimento=${parcela.vencimento}, parc_valor=${parcela.valor} WHERE parc_codigo = ${parcela.codigo}`
            await dao.atualizar(sql);
        }
    }

    async excluir(parcela){
        if(parcela instanceof Parcelas){
            const dao = new Dao();
            const sql = `DELETE FROM Parcelas WHERE parc_codigo = ${parcela.codigo}`;
            await dao.excluir(sql);
        }
    }

    async consultarVencimento(vencimento){
            const dao = new Dao();
            const sql = "SELECT * FROM Parcelas WHERE parc_vencimento like '%'"+vencimento+"'%'";
            return await dao.consultar(sql);
    }

    async consultarParcelas(parcela){
        const dao = new Dao();
        const sql = `SELECT * FROM Parcelas WHERE desp_codigo = ${parcela.desp_codigo}`;
        return await dao.consultar(sql);
}
}