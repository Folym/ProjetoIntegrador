import Doacao from "../Modelo/Doacao.js";
import Dao from "./Dao.js"
export default class DoacaoDAO{
    constructor(){

    }

    async gravar(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "INSERT INTO Doacao (doac_tipo,doac_end,doac_numend,doac_cep,doac_quantidade,doac_valor,doac_data,doac_desc) VALUES (?,?,?,?,?,?,?,?)"
            const dados = [doacao.tipo,doacao.end,doacao.numend,doacao.cep,doacao.quant,doacao.valor,doacao.data,doacao.desc];
            const parm = {sql,dados};
            return await dao.gravar(parm);
        }
    }

    async atualizar(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "UPDATE Doacao SET doac_tipo=?,doac_end=?,doac_numend=?,doac_cep=?,doac_quantidade=?,doac_valor=?,doac_data=?,doac_desc=? WHERE doac_codigo=?";
            const dados = [doacao.tipo,doacao.end,doacao.numend,doacao.cep,doacao.quant,doacao.valor,doacao.data,doacao.desc,doacao.codigo];
            const parm = {sql,dados};
            await dao.atualizar(parm);
        }
    }

    async excluir(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "DELETE FROM Cliente WHERE codigo=?";
            const dados = [doacao.codigo];
            const parm = {sql,dados};
            await dao.excluir(parm);
        }
    }

    async consultarDesc(desc){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "SELECT * FROM Doacao WHERE nome like ?";
            const dados = ['%'+ desc +'%'];
            return await dao.consultar(sql,dados);
        }
    }

    async consultarCodg(codigo){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "SELECT * FROM Doacao WHERE codigo = ?";
            const dados = [codigo];
            return await dao.consultar(sql,dados);
        }
    }
}