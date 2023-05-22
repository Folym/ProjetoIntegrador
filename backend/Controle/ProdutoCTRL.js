import Produto from "../Modelo/Produto.js";

export default class ProdutoCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {nome,desc} = req.body;
            if(nome==undefined || nome==""){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Produto cancelado"
                })
            }
            const produto = new Produto(0,nome,desc);
            produto.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Produto cadastrado"
                })
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Cadastro cancelado"
                })
            });
        }
    }

    atualizar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo,nome,desc} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
                })
            }
            const produto = new Produto(codigo,nome,desc);
            produto.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Produto atualizado"
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
            const codigo = dados["prod_codigo"];
            console.log(dados);
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode= 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão cancelada"
                })
            }
            const produto = new Produto(codigo);
            produto.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem": "Produto excluido"
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
            const produto = new Produto();
            produto.consultarDesc().then((lista)=>{
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
            const produto = new Produto(codigo);
            produto.consultarCodg(codigo).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }
}