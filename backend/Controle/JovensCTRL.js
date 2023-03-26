
import Jovens from "../Modelo/Jovens.js";

export default class JovensCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {nome,cpf, nomepai, nomemae, idade, sexo, status} = req.body;
            if(tipo==undefined || tipo==""){
                resp.sendStatus(400);
            }
            const jovem = new Jovens(0,nome,cpf, nomepai, nomemae, idade, sexo, status);
            jovem.gravar().then(()=>{
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
            const {codigo,nome,cpf, nomepai, nomemae, idade, sexo, status} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const jovem = new Jovens(codigo,nome,cpf, nomepai, nomemae, idade, sexo, status);
            jovem.atualizar().then(()=>{
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
            const jovem = new Jovens(codigo);
            jovem.excluir().then(()=>{
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
            if(desc==undefined || desc==""){
                resp.sendStatus(400);
            }
            const jovem = new Jovens(0,nome);
            jovem.consultarNome(nome).then(()=>{
                resp.json(nome);
//              resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    consultarCod(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo} = req.params;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const jovem = new Jovens(codigo);
            jovem.consultarCodigo(codigo).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }
}