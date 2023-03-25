import Doacao from "../Modelo/Doacao.js";

export default class DoacaoCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {tipo,end,numend,cep,quant,valor,data,desc} = req.body;
            if(doac_tipo==undefined || doac_tipo==""){
                resp.sendStatus(400);
            }
            const doacao = new Doacao(tipo,end,numend,cep,quant,valor,data,desc);
            doacao.gravar().then(()=>{
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
            const {codigo,tipo,end,numend,cep,quant,valor,data,desc} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const doacao = new Doacao(codigo,tipo,end,numend,cep,quant,valor,data,desc);
            doacao.atualizar().then(()=>{
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
            const doacao = new Doacao(codigo);
            doacao.excluir().then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    consultarDesc(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {desc} = req.params;
            if(desc==undefined || desc==""){
                resp.sendStatus(400);
            }
            const doacao = new Doacao(desc);
            doacao.consultarDesc(desc).then(()=>{
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
            const doacao = new Doacao(codigo);
            doacao.consultarCodg(codigo).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }
}