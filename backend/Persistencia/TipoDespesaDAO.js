import TipoDespesa from "../Modelo/TipoDespesa.js";
import Dao from "./Dao.js"
export default class TipoDespesaDAO{
    constructor(){

    }

    async gravar(tipoDespesa){
        if(tipoDespesa instanceof TipoDespesa){
            const dao = new Dao();
            const sql = `INSERT INTO tipodespesas (tipo_desp_descricao) VALUES ('${tipoDespesa.descricao}');`
            return await dao.gravar(sql);
        }
    }

    async atualizar(tipoDespesa){
        if(tipoDespesa instanceof TipoDespesa){
            const dao = new Dao();
            const sql = `UPDATE tipodespesas SET tipo_desp_descricao=${tipoDespesa.descricao} WHERE tipo_desp_codigo = ${tipoDespesa.codigo}`
            await dao.atualizar(sql);
        }
    }

    async excluir(tipoDespesa){
        if(tipoDespesa instanceof TipoDespesa){
            const dao = new Dao();
            const sql = `DELETE FROM tipodespesas WHERE tipo_desp_codigo = ${tipoDespesa.codigo}`;
            await dao.excluir(sql);
        }
    }

    async consultarTodos(){
        const dao = new Dao();
        const sql = "SELECT * FROM tipodespesas"
        return dao.consultar(sql);
}

}