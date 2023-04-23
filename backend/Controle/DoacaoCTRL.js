import Doacao from "../Modelo/Doacao.js";

export default class DoacaoCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {tipo,end,numend,cep,quant,data,desc} = req.body;
            console.log(data);
            if(desc==undefined || desc==""){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação cancelada"
                })
            }
            const doacao = new Doacao(0,tipo,end,numend,cep,quant,data,desc);
            //criar a DAo generica, conectar com o banco, abrir uma transação
            doacao.gravar().then(()=>{
                resp.statusCode = 200;
                //comitt e desconecta
                resp.json({
                    "status":true,
                    "mensagem":"Doação gravada"
                })
            }).catch((error)=>{
                //rollback e desconecta
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação cancelada"
                })

            });
        }
    }

    atualizar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo,tipo,end,numend,cep,quant,data,desc} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
                })
            }
            const doacao = new Doacao(codigo,tipo,end,numend,cep,quant,data,desc);
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