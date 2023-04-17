

import Login from "../Modelo/Login.js";
import Dao from "./Dao.js"
export default class LoginDAO{
    constructor(){}

    async  gravar(login) {
        if(login instanceof Login){
            const dao = new Dao();
            const sql = "INSERT INTO login (log_nome, log_senha, log_cpf, log_cel, log_email) VALUES ( '"+login.nome+"','"+login.senha+"','"+login.cpf+"','"+login.cel+"','" +pret.email+"');"
            return await dao.gravar(sql);
        }
    }

    async  atualizar(login) {
        if(login instanceof Login){
            const dao = new Dao();
            const sql = "UPDATE login SET log_nome ='"+login.nome+"',log_senha='"+login.senha+"',log_cpf= '"+login.cpf+"',log_cel=' "+login.cel+"',log_email= '"+login.email+"';";
             await dao.atualizar(sql);
        }   
    }
    
    async  excluir(login) {     
        if(login instanceof Login){           
            const dao = new Dao();            
            const sql = "DELETE FROM login WHERE log_codigo = "+login.codigo+";";         
            await dao.excluir(sql);
        }   
    }
    
    async  Listar() {
       
        const dao = new Dao();
        const sql = "SELECT * FROM login";
        return dao.consultar(sql);
        
    }

    
    async  consultarUsuario(nome,senha) {
         const dao = new Dao();
         const sql = "SELECT * FROM login WHERE log_nome like '%"+nome+"%' and log_senha like '"+senha+"';";
         return dao.consultar(sql);
    }


}


// TESTE(NÂO APAGA)
//     const conexao = await conectar(); // esta aguardanado a conexao 
    //     conexao.connect();
    //     //const sql ="";
    //     //const parametros =  [id];// consultar qualquer parte desse nome, nao importa a posição
    //    let [a] =await conexao.query("SELECT * FROM Pretendente  WHERE pret_codigo = 1")
    //    return [a];
