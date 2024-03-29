
import Pretendentes from "../Modelo/Pretendentes.js";

export default class PretendentesCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {nome,cpf, cel,email,end,numend,cep,status} = req.body;
            console.log({nome,cpf,cel,email,end,numend,cep,status})
            if(nome==undefined || nome==""){
                 resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir pretendentes"
                });
            }
            const pret = new Pretendentes(0,nome,cpf, cel,email,end,numend,cep,status);
            pret.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Pretendentes excluido com sucesso"
                });
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir pretendentes"
                });
            });
        }
    }

    atualizar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo,nome,cpf,cel,email,end,numend,cep,status} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir pretendentes"
                });
            }
            const pret = new Pretendentes(codigo,nome,cpf, cel,email,end,numend,cep,status);
            pret.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Pretendentes excluido com sucesso"
                });
            }).catch((error)=>{
                console.log(error);
                 resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir pretendentes"
                });
            });
        }
    }

    excluir(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const dados = req.body;
            const codigo = dados["pret_codigo"];
            console.log(codigo)
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir pretendentes"
                });
            }
            const pret = new Pretendentes(codigo);
            pret.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Pretendentes excluido com sucesso"
                });
            }).catch((error)=>{
                console.log("ERRO");
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir pretendentes"
                });
            });
        }
    }

    consultarNome(req,resp){
        resp.setHeader("Content-Type","application/json");
        
            const pret = new Pretendentes();
            pret.consultarNome().then((lista)=>{
                resp.json(lista);
//              resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        
    }

    consultarCod(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo} = req.params;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const pret = new Pretendentes(codigo);
            pret.consultarCodigo(codigo).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }
}