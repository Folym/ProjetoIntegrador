import Produto from "../Modelo/Produto.js";
import Dao from "./Dao.js"
export default class ProdutoDAO{
    constructor(){

    }

    async gravar(produto){
        if(produto instanceof Produto){
            const dao = new Dao();
            console.log(produto.codigo);            
            const sql = "INSERT INTO Produto (prod_nome) VALUES ('"+produto.nome+"')"
            console.log(sql);
            return await dao.gravar(sql);
        }
    }

    async atualizar(produto){
        if(produto instanceof Produto){
            const dao = new Dao();
            const sql = "UPDATE Produto SET prod_nome="+produto.nome+" WHERE prod_codigo='"+produto.codigo;
            await dao.atualizar(sql);
        }
    }

    async excluir(produto){
        if(produto instanceof Produto){
            const dao = new Dao();
            const sql = "DELETE FROM Produto WHERE prod_codigo="+produto.codigo;
            await dao.excluir(sql);
        }
    }

    async consultarDesc(){
            const dao = new Dao();
            const sql = "SELECT * FROM Produto";
            return await dao.consultar(sql);
    }

    async consultarCodg(codigo){
            const dao = new Dao();
            const sql = "SELECT * FROM Produto WHERE prod_codigo = "+ codigo;
            return await dao.consultar(sql);
    }
}