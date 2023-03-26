import Jovens from "../Modelo/Jovens.js";
import Dao from "./Dao.js"
export default class JovemDAO{
    constructor(){

    }

    async gravar(jovem){
        if(jovem instanceof Jovens){
            const dao = new Dao();
            const conexao = await conectar(); // esta aguardanado a conexao  (pret_nome,pret_cpf,pret_cel,pret_email,pret_end,pret_numend,pret_cep,pret_status)
            conexao.connect();
            const sql = "INSERT INTO Jovem (jov_nome,jov_cpf,jov_nomepai,jov_nomemae,jov_idade,jov_sexo,jov_status) VALUES (?,?,?,?,?,?,?)"
            return await dao.gravar(sql);
        }
    }
    
    async  atualizar(jovem) {
        if(jovem instanceof Jovens){
            const dao = new Dao();
            const sql = "UPDATE Jovem SET jov_nome=?,jov_cpf=?,jov_nomepai=?,jov_nomemae=?,jov_idade=?,jov_sexo=?,jov_status=? WHERE jov_codigo=?";
             await dao.atualizar(sql);
        }   
    }


    async excluir(jovem){
        if(jovem instanceof Jovens){
            const dao = new Dao();
            const sql = "DELETE FROM Jovem WHERE jov_codigo=?";
            await dao.gravar(sql);
        }   
    }


    async  consultarNome(nome) {
       
        const dao = new Dao();
        const sql = "SELECT * FROM Jovem WHERE jov_nome like '%"+nome+"%'";
        return dao.consultar(sql);;
        
    }

    async  consultarCodigo(codigo) {
        const dao = new Dao();
        const sql = "SELECT * FROM Jovem WHERE jov_codigo = ?";
        const dados = [codigo];
        const parm = sql+""+dados;
        return dao.consultar(parm);
   }
}