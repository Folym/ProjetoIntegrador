import Doacao from "../Modelo/Doacao";
import Dao from "./DAO";
export default class DoacaoDAO{
    constructor(){

    }

    async gravar(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "INSERT INTO Doacao (doac_tipo,doac_end,doac_numend,doac_cep,doac_quantidade,doac_valor,doac_data) VALUES (?,?,?,?,?,?,?)"
            const dados = [doacao.tipo,doacao.end,doacao.numend,doacao.quant,doacao.valor,doacao.data];
            const parm = {sql,dados};
            return await dao.gravar(parm);
        }
    }

    async atualizar(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            dao.conectar();
            const sql = "UPDATE Doacao SET doac_tipo=?,doac_end=?,doac_numend=?,doac_cep=?,doac_quantidade=?,doac_valor=?,doac_data=? WHERE doac_codigo=?";
            const dados = [doacao.tipo,doacao.end,doacao.numend,doacao.quant,doacao.valor,doacao.data,doacao.codigo];
            const parm = {sql,dados};
            dao.desconectar();
            await dao.atualizar(parm);
        }
    }

    async excluir(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "DELETE FROM Cliente WHERE codigo=?";
            const parm = [doacao.codigo];
            await dao.excluir(parm);
        }
    }

    async consultarNome(nome){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "SELECT * FROM Doacao WHERE codigo like ?";
            const dados = ['%'+ nome +'%'];
            const rows = dao.consultar(sql,dados);
            let lista = [];
            for(const reg of rows){
                const doacao = new Doacao(reg['doac_codigo'],reg['doac_tipo'],reg['doac_end'],
                    reg['doac_numend'],reg['doac_cep'],reg['doac_quantidade'],reg['doac_valor'],reg['doac_data']);
                    lista.push(doacao);
            }
        }
        return lista;
    }
}