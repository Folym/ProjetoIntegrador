import Doacao from "../Modelo/Doacao.js";

export default class DoacaoCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {prodcod,end,numend,cep,quant,valor,data,desc,campcod} = req.body;
            if(desc==undefined || desc==""){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Doação cancelada"
                })
            }
            const doacao = new Doacao(0,prodcod,end,numend,cep,quant,valor,data,desc,campcod);
            doacao.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Doação concluída"
                })
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Doação cancelada"
                })
            });
        }
    }

    atualizar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo,prodcod,end,numend,cep,quant,valor,data,desc,campcod} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
                })
            }
            const doacao = new Doacao(codigo,prodcod,end,numend,cep,quant,valor,data,desc,campcod);
            doacao.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Doação atualizada"
                })
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
                })
            });
        }
    }

    excluir(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const dados = req.body;
            const codigo = dados["doac_codigo"];
            console.log(dados);
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode= 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão cancelada"
                })
            }
            const doacao = new Doacao(codigo);
            doacao.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem": "Doacao excluida"
                });
            }).catch((error)=>{
                console.log(error);
                resp.statusCode= 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão cancelada"
                })
            });
        }
    }

    consultarDesc(req,resp){
        resp.setHeader("Content-Type","application/json");
            const doacao = new Doacao();
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