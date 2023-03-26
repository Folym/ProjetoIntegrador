import Doacao from "../Modelo/Doacao.js";
import Dao from "./Dao.js"
export default class DoacaoDAO{
    constructor(){

    }

    async gravar(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "INSERT INTO Doacao (doac_tipo,doac_end,doac_numend,doac_cep,doac_quantidade,doac_valor,doac_data,doac_desc) VALUES ('"+doacao.tipo+"','"+doacao.end+"',"+doacao.numend+","+doacao.cep+","+doacao.quant+","+doacao.valor+",'"+doacao.data+"','"+doacao.desc+"')"
            return await dao.gravar(sql);
        }
    }

    async atualizar(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "UPDATE Doacao SET doac_tipo='"+doacao.tipo+"',doac_end='"+doacao.end+"',doac_numend="+doacao.numend+",doac_cep="+doacao.cep+",doac_quantidade="+doacao.quant+",doac_valor="+doacao.valor+",doac_data='"+doacao.data+"',doac_desc='"+doacao.desc+"' WHERE doac_codigo='"+doacao.codigo;
            await dao.atualizar(sql);
        }
    }

    async excluir(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "DELETE FROM Doacao WHERE codigo="+doacao.codigo;
            await dao.excluir(sql);
        }
    }

    async consultarDesc(desc){
            const dao = new Dao();
            const sql = "SELECT * FROM Doacao WHERE nome like '%'"+ desc+"'%'";
            return await dao.consultar(sql);
    }

    async consultarCodg(codigo){
            const dao = new Dao();
            const sql = "SELECT * FROM Doacao WHERE codigo = "+ codigo;
            return await dao.consultar(sql);
    }
}