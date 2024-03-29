import Doacao from "../Modelo/Doacao.js";
import Dao from "./Dao.js"
export default class DoacaoDAO{
    constructor(){

    }

    async gravar(doacao){
        if(doacao instanceof Doacao){
            console.log(doacao.prodcod)
            const dao = new Dao();            
            const sql = "INSERT INTO Doacao (prod_codigo,doac_tipo,doac_end,doac_numend,doac_cep,doac_quant,doac_valor,doac_data,doac_desc,camp_codigo) VALUES ("+doacao.prodcod+",'"+doacao.tipo+"','"+doacao.end+"',"+doacao.numend+","+doacao.cep+","+doacao.quant+","+doacao.valor+",'"+doacao.data+"','"+doacao.desc+"',"+doacao.campcod+")"
            console.log(sql);
            return await dao.gravar(sql);
        }
    }

    async atualizar(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "UPDATE Doacao SET prod_codigo="+doacao.prodcod+",doac_tipo="+doacao.tipo+",doac_end='"+doacao.end+"',doac_numend="+doacao.numend+",doac_cep="+doacao.cep+",doac_quant="+doacao.quant+",doac_valor="+doacao.valor+",doac_data='"+doacao.data+"',doac_desc='"+doacao.desc+"',"+doacao.campcod+" WHERE doac_codigo='"+doacao.codigo;
            await dao.atualizar(sql);
        }
    }

    async excluir(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "DELETE FROM Doacao WHERE doac_codigo="+doacao.codigo;
            await dao.excluir(sql);
        }
    }

    async consultarDesc(doacao){
            const dao = new Dao();
            const sql = "SELECT * FROM Doacao";
            return await dao.consultar(sql);
    }

    async consultarCodg(codigo){
            const dao = new Dao();
            const sql = "SELECT * FROM Doacao WHERE doac_codigo = "+ codigo;
            return await dao.consultar(sql);
    }
}