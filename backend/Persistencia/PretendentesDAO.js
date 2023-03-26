

import Pretendentes from "../Modelo/Pretendentes.js";
import conectar from "./Conexao.js";
import Dao from "./Dao.js"
export default class PretendentesDAO{
    constructor(){}

    async  gravar(pret) {
        if(pret instanceof Pretendentes){
            const dao = new Dao();
            const conexao = await conectar(); // esta aguardanado a conexao  (pret_nome,pret_cpf,pret_cel,pret_email,pret_end,pret_numend,pret_cep,pret_status)
            conexao.connect();
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
            const sql = "DELETE FROM Pretendente WHERE pret_codigo = "+pret.codigo;
            await dao.gravar(sql);
        }   
    }
    
    async  consultarNome(nome) {
       
        const dao = new Dao();
        const sql = "SELECT * FROM Pretendente WHERE pret_nome like '%"+nome+"%'";
        //const rows = dao.consultar(sql,dados);
        // let lista = [];
        // for(const reg of rows){
        //     const preten = new Pretendentes(reg['pret_codigo'],reg['pret_nome'],reg['pret_cpf'],
        //         reg['pret_cel'],reg['pret_email'],reg['pret_end'],reg['pret_numend'],reg['pret_cep'],reg["pret_status"]);
        //         lista.push(preten);
        // }
        return dao.consultar(sql);;
        
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
