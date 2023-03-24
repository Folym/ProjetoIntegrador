import Doacao from "../Modelo/Doacao";
import Dao from "./DAO";
export default class DoacaoDAO{
    constructor(){

    }
    async gravar(doacao){
        if(doacao instanceof Doacao){
            const dao = new Dao();
            const sql = "INSERT INTO DOACAO (doac_tipo,doac_end,doac_numend,doac_cep,doac_quantidade,doac_valor,doac_data) VALUES (?,?,?,?,?,?,?)"
            const dados = [doacao.tipo,doacao.descricao];
            const parm = { sql,dados };
            return await dao.gravar(parm);
        }
    }

    async atualizar(doacao){
        if(doacao instanceof Doacao){
            //fazer conexao
            
            const parm = [doacao.tipo,doacao.descricao];
            
            //return
        }
    }

    async excluir(doacao){
        if(doacao instanceof Doacao){
            //fazer conexao
            //fazer sql
            const parm = [doacao.codigo];
            //return
        }
    }

    async consultar(codigo){
            
    }
}