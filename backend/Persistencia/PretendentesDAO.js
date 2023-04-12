

import Pretendentes from "../Modelo/Pretendentes.js";
import Dao from "./Dao.js"
export default class PretendentesDAO{
    constructor(){}

    async  gravar(pret) {
        if(pret instanceof Pretendentes){
            const dao = new Dao();
            const sql = "INSERT INTO Pretendente (pret_nome,pret_cpf,pret_cel,pret_email,pret_end,pret_numend,pret_cep,pret_status)  VALUES ( '"+pret.nome+"','"+pret.cpf+"','"+pret.cel+"','" +pret.email+"','"+pret.end+"',"+pret.numend+","+pret.cep+",'"+pret.status+"');"
            return await dao.gravar(sql);
        }
    }

    async  atualizar(pret) {
        if(pret instanceof Pretendentes){
            const dao = new Dao();
            const sql = "UPDATE Pretendente SET pret_nome = '"+pret.nome+"',pret_cpf= '"+pret.cpf+"',pret_cel=' "+pret.cel+"',pret_email= '"+pret.email+"',pret_end= '"+pret.end+"',pret_numend= "+pret.numend+",pret_cep= "+pret.cep+",pret_status='"+pret.status+"'WHERE pret_codigo = "+pret.codigo+";";
             await dao.atualizar(sql);
        }   
    }
    
    async  excluir(pret) {     
        if(pret instanceof Pretendentes){           
            const dao = new Dao();            
            const sql = "DELETE FROM Pretendente WHERE pret_codigo = "+pret.codigo+";";         
            await dao.excluir(sql);
        }   
    }
    
    async  consultarNome() {
       
        const dao = new Dao();
        const sql = "SELECT * FROM Pretendente";
        return dao.consultar(sql);
        
    }

    
    async  consultarCodigo(codigo) {
         const dao = new Dao();
         const sql = "SELECT * FROM Pretendente WHERE pret_codigo = ";
         const dados = [codigo];
         const parm = sql+""+dados;
         return dao.consultar(parm);
    }


}


// TESTE(NÂO APAGA)
//     const conexao = await conectar(); // esta aguardanado a conexao 
    //     conexao.connect();
    //     //const sql ="";
    //     //const parametros =  [id];// consultar qualquer parte desse nome, nao importa a posição
    //    let [a] =await conexao.query("SELECT * FROM Pretendente  WHERE pret_codigo = 1")
    //    return [a];
