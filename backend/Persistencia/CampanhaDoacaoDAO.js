

import CampanhaDoacao from "../Modelo/CampanhaDoacao.js";
import Dao from "./Dao.js"
export default class LoginDAO{
    constructor(){}

    async  gravar(camp) {
        if(camp instanceof CampanhaDoacao){
            const dao = new Dao();
            const sql = "INSERT INTO campanhadoacao(camp_nome, camp_desc,camp_dtInicio,camp_dtFim,camp_local,camp_finalizado)  VALUES ('"+camp.nome+"','"+camp.descri+"','"+ camp.dtInicio+"','"+ camp.dtFim+"','"+ camp.local+"','"+camp.finalizado+"');"
            return await dao.gravar(sql);
        }
    }

    async  finalizar(camp) {
        if(camp instanceof CampanhaDoacao){
            const dao = new Dao();
            const sql = "UPDATE campanhadoacao SET camp_finalizado = 'S' where camp_codigo="+ camp.codigo+";";
             await dao.atualizar(sql);
        }   
    }
    
    async  excluir(camp) {     
        if(camp instanceof CampanhaDoacao){           
            const dao = new Dao();            
            const sql = "DELETE FROM campanhadoacao WHERE camp_codigo = "+camp.codigo+";";         
            await dao.excluir(sql);
        }   
    }
    
    async  Listar() {
       
        const dao = new Dao();
        const sql = "SELECT * FROM campanhadoacao";
        return dao.consultar(sql);
        
    }

    
    // async  consultarUsuario(nome,senha) {
    //      const dao = new Dao();
    //      const sql = "SELECT * FROM login WHERE log_nome like '%"+nome+"%' and log_senha like '"+senha+"';";
    //      return dao.consultar(sql);
    // }


}


// TESTE(NÂO APAGA)
//     const conexao = await conectar(); // esta aguardanado a conexao 
    //     conexao.connect();
    //     //const sql ="";
    //     //const parametros =  [id];// consultar qualquer parte desse nome, nao importa a posição
    //    let [a] =await conexao.query("SELECT * FROM Pretendente  WHERE pret_codigo = 1")
    //    return [a];
