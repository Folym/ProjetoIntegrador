
import Adocoes from "../Modelo/Adocao.js";

export default class AdocoesCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {pret_cod1, pret_cod2, jov_cod, status} = req.body;
            if(pret_cod1==undefined || pret_cod1==""){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir adocao"
                });
            }
            const adocao = new Adocoes(0,pret_cod1, pret_cod2, jov_cod, status);
            adocao.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Adocao excluida com sucesso"
                });
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir adocao"
                });
            });
        }
    }

    atualizar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo,nome,cpf, nomepai, nomemae, idade, sexo, status} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir adocao"
                });
            }
            const adocao = new Adocoes(codigo,nome,cpf, nomepai, nomemae, idade, sexo, status);
            adocao.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Adocao excluida com sucesso"
                });
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir adocao"
                });
            });
        }
    }


    excluir(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const dados = req.body;
            const codigo = dados["jov_codigo"];
            console.log(codigo)
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const adocao = new Adocoes(codigo);
            adocao.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Adocao excluida com sucesso"
                });
            }).catch((error)=>{
                console.log("ERRO");
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir adocao"
                });
            });
        }
    }

    consultarNome(req,resp){
        resp.setHeader("Content-Type","application/json");
            const adocao = new Adocoes();
            adocao.consultarNome().then((lista)=>{
                resp.json(lista);
//              resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir adocao"
                });
            });
        
    }

    consultarCod(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo} = req.params;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir adocao"
                });
            }
            const adocao = new Adocoes(codigo);
            adocao.consultarCodigo(codigo).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir adocao"
                });
            });
        }
    }
}