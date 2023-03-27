import Funcionarios from "../Modelo/Funcionarios.js";

export default class FuncionariosCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {nome, cpf, cel, email, end, numend, cep} = req.body;
            if(tipo==undefined || tipo==""){
                resp.sendStatus(400);
            }
            const funcionarios = new Funcionarios(nome, cpf, cel, email, end, numend, cep);
            funcionarios.gravar().then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    atualizar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo, nome, cpf, cel, email, end, numend, cep} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const funcionarios = new Funcionarios(codigo, nome, cpf, cel, email, end, numend, cep);
            funcionarios.atualizar().then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    excluir(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const funcionarios = new Funcionarios(codigo);
            funcionarios.excluir().then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    consultarNome(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {nome} = req.params;
            if(nome==undefined || nome==""){
                resp.sendStatus(400);
            }
            const funcionarios = new Funcionarios(nome);
            funcionarios.consultarNome(nome).then(()=>{
                resp.json(nome);
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    consultarCodg(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo} = req.params;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const funcionarios = new Funcionarios(codigo);
            funcionarios.consultarCodg(codigo).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }
}