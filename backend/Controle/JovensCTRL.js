
import Jovens from "../Modelo/Jovens.js";

export default class JovensCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {nome,cpf, nomepai, nomemae, idade, sexo, status} = req.body;
            if(nome==undefined || nome==""){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir jovem"
                });
            }
            const jovem = new Jovens(0,nome,cpf, nomepai, nomemae, idade, sexo, status);
            jovem.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Jovem excluido com sucesso"
                });
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir jovem"
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
                    "Mensagem":"Erro ao excluir jovem"
                });
            }
            const jovem = new Jovens(codigo,nome,cpf, nomepai, nomemae, idade, sexo, status);
            jovem.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Jovem excluido com sucesso"
                });
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir jovem"
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
            const jovem = new Jovens(codigo);
            jovem.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Jovem excluido com sucesso"
                });
            }).catch((error)=>{
                console.log("ERRO");
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir jovem"
                });
            });
        }
    }

    consultarNome(req,resp){
        resp.setHeader("Content-Type","application/json");
        
            const jovem = new Jovens();
            jovem.consultarNome().then((lista)=>{
                resp.json(lista);
//              resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir jovem"
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
                    "Mensagem":"Erro ao excluir jovem"
                });
            }
            const jovem = new Jovens(codigo);
            jovem.consultarCodigo(codigo).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir jovem"
                });
            });
        }
    }
}