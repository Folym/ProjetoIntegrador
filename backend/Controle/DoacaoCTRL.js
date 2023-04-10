import Doacao from "../Modelo/Doacao.js";

export default class DoacaoCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {tipo,end,numend,cep,quant,data,desc} = req.body;
            console.log(data);
            if(tipo==undefined || tipo==""){
                resp.sendStatus(400);
            }
            const doacao = new Doacao(0,tipo,end,numend,cep,quant,data,desc);
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
            const {codigo,tipo,end,numend,cep,quant,data,desc} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const doacao = new Doacao(codigo,tipo,end,numend,cep,quant,data,desc);
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
            const doacao = new Doacao();
            console.log("consultarDesc ctrl");
            doacao.consultarDesc().then((lista)=>{
                resp.json(lista);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
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