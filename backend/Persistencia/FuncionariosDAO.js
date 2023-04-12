import Funcionarios from "../Modelo/Funcionarios";
import Dao from "./Dao.js"
export default class FuncionariosDAO{
    constructor(){

    }

    async gravar(funcionarios){
        if(funcionarios instanceof Funcionarios){
            const dao = new Dao();
            const sql = "INSERT INTO Funcionario (func_nome, func_cpf, func_cel, func_email, func_end, func_numend, func_cep) VALUES ('"+funcionarios.nome+"','"+funcionarios.cpf+"',"+funcionarios.cel+","+funcionarios.email+","+funcionarios.end+","+funcionarios.numend+",'"+funcionarios.cep+"')"
            return await dao.gravar(sql);
        }
    }

    async atualizar(funcionarios){
        if(funcionarios instanceof Funcionarios){
            const dao = new Dao();
            const sql = "UPDATE Funcionario SET func_nome='"+funcionarios.nome+"',func_cpf='"+funcionarios.cpf+"',func_cel="+funcionarios.cel+",func_email="+funcionarios.email+",func_end="+funcionarios.end+",func_numend="+funcionarios.numend+",func_cep='"+funcionarios.cep+"' WHERE func_codigo='"+funcionarios.codigo;
            await dao.atualizar(sql);
        }
    }

    async excluir(funcionarios){
        if(funcionarios instanceof Funcionarios){
            const dao = new Dao();
            const sql = "DELETE FROM Funcionario WHERE func_codigo="+funcionarios.codigo;
            await dao.excluir(sql);
        }
    }

    async consultarNome(nome){
            const dao = new Dao();
            const sql = "SELECT * FROM Funcionario WHERE func_nome like '%'"+ nome+"'%'";
            return await dao.consultar(sql);
    }

    async consultarCpf(cpf){
            const dao = new Dao();
            const sql = "SELECT * FROM Funcionario WHERE func_cpf = "+ cpf;
            return await dao.consultar(sql);
    }
}