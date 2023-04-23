import Adocoes from "../Modelo/Adocao.js";
import Dao from "./Dao.js";
export default class AdocaoDAO{
    constructor(){

    }

    async gravar(adocao){
        if(adocao instanceof Adocoes){
            const dao = new Dao();
            const sql = "INSERT INTO Adocao (adoc_codigo, pret_codigo1, pret_codigo2, jov_codigo, adoc_status) VALUES ('"+adocao.codigo+"','"+adocao.pret_cod1+"','"+adocao.pret_cod2+"','"+adocao.jov_cod+"','"+adocao.status+"')";
            return await dao.gravar(sql);
        }
    }
    
    async  atualizar(adocao) {
        if(adocao instanceof Adocoes){
            const dao = new Dao();
            const sql = "UPDATE Adocao SET pret_codigo1='"+adocao.pret_cod1+"',pret_codigo2='"+adocao.pret_cod2+"',jov_codigo='"+adocao.jov_cod+"', adoc_status='"+adocao.status+"' WHERE adoc_codigo="+adocao.codigo;
             await dao.atualizar(sql);
        }   
    }


    async excluir(adocao){
        if(adocao instanceof Adocoes){
            const dao = new Dao();
            const sql = "DELETE FROM Adocao WHERE adoc_codigo=" + adocao.codigo + ";";
            await dao.excluir(sql);
        }   
    }


    async  consultarNome() {
        const dao = new Dao();
        const sql = "SELECT * FROM Adocao";
        return dao.consultar(sql);
        
    }

    async  consultarCodigo(codigo) {
        const dao = new Dao();
        const sql = "SELECT * FROM Adocao WHERE adoc_codigo = ";
        const dados = [codigo];
        const parm = sql+""+dados;
        return dao.consultar(parm);
   }
}