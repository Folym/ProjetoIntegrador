import Jovens from "../Modelo/Jovens.js";
import Dao from "./Dao.js"
export default class JovemDAO{
    constructor(){

    }

    async gravar(jovem){
        if(jovem instanceof Jovens){
            const dao = new Dao();
            const sql = "INSERT INTO Jovem (jov_nome,jov_cpf,jov_nomepai,jov_nomemae,jov_idade,jov_sexo,jov_status) VALUES ('"+jovem.nome+"','"+jovem.cpf+"','"+jovem.nomepai+"','"+jovem.nomemae+"',"+jovem.idade+",'"+jovem.sexo+"','"+jovem.status+"')"
            return await dao.gravar(sql);
        }
    }
    
    async  atualizar(jovem) {
        if(jovem instanceof Jovens){
            const dao = new Dao();
            const sql = "UPDATE Jovem SET jov_nome='"+jovem.nome+"',jov_cpf='"+jovem.cpf+"',jov_nomepai='"+jovem.nomepai+"',jov_nomemae='"+jovem.nomemae+"',jov_idade="+jovem.idade+",jov_sexo='"+jovem.sexo+"',jov_status='"+jovem.status+"' WHERE jov_codigo="+jovem.codigo;
             await dao.atualizar(sql);
        }   
    }


    async excluir(jovem){
        if(jovem instanceof Jovens){
            const dao = new Dao();
            const sql = "DELETE FROM Jovem WHERE jov_codigo="+jovem.codigo+";";
            await dao.excluir(sql);
        }   
    }


    async  consultarNome() {
        const dao = new Dao();
        const sql = "SELECT * FROM Jovem";
        return dao.consultar(sql);
        
    }

    async  consultarCodigo(codigo) {
        const dao = new Dao();
        const sql = "SELECT * FROM Jovem WHERE jov_codigo = ";
        const dados = [codigo];
        const parm = sql+""+dados;
        return dao.consultar(parm);
   }
}