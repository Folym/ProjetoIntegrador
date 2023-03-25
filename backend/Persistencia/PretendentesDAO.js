

import Pretendentes from "../Modelo/Pretendentes.js";
import Dao from "./Dao.js"
export default class PretendentesDAO{
    constructor(){}

    async  gravar(pret) {
        if(pret instanceof Pretendentes){
            const dao = new Dao();
            const sql = "INSERT INTO Pretendente (pret_nome,pret_cpf,pret_cel,pret_email,pret_end,pret_numend,pret_cep,pret_status) VALUES (?,?,?,?,?,?,?,?)"
            const dados = [pret.nome,pret.cpf,pret.cel,pret.email,pret.end,pret.numend,pret.cep,pret.status];
            const parm = {sql,dados};
            return await dao.gravar(parm);
        }
    }


    
    async  atualizar(pret) {
        if(pret instanceof Pretendentes){
            const dao = new Dao();
            const sql = "UPDATE Pretendente SET pret_nome = ?,pret_cpf= ?,pret_cel= ?,pret_email= ?,pret_end= ?,pret_numend= ?,pret_cep= ?,pret_status= ? WHERE pret_codigo = ?"
            const dados = [pret.nome,pret.cpf,pret.cel,pret.email,pret.end,pret.numend,pret.cep,pret.status,pret.codigo];
            const parm = {sql,dados};
            await dao.atualizar(parm);
        }   
    }
    
    async  excluir(pret) {
        if(pret instanceof Pretendentes){
            const dao = new Dao();
            const sql = "DELETE FROM Pretendente WHERE codigo=?";
            const dados = [pret.codigo];
            const parm = {sql,dados};
            await dao.gravar(parm);
        }   
    }
    
    async  consultarNome(nome) {
       
        const dao = new Dao();
        const sql = "SELECT * FROM Pretendente WHERE pret_nome like ?";
        const dados = ['%'+ nome +'%'];
        const rows = dao.consultar(sql,dados);
        let lista = [];
        for(const reg of rows){
            const preten = new Pretendentes(reg['pret_codigo'],reg['pret_nome'],reg['pret_cpf'],
                reg['pret_cel'],reg['pret_email'],reg['pret_end'],reg['pret_numend'],reg['pret_cep'],reg["pret_status"]);
                lista.push(preten);
        }
        return lista;
        
    }

    
    async  consultarID(codigo) {
        
        const dao = new Dao();
        const sql = "SELECT * FROM Pretendente WHERE pret_codigo = ?";
        const dados = [codigo];
        const rows = dao.consultar(sql,dados);
        let lista = [];
        for(const reg of rows){
            const preten = new Pretendentes(reg['pret_codigo'],reg['pret_nome'],reg['pret_cpf'],
                reg['pret_cel'],reg['pret_email'],reg['pret_end'],reg['pret_numend'],reg['pret_cep'],reg["pret_status"]);
                lista.push(preten);
        }
        return lista;
        
    }


}
