import Despesas from "../Modelo/Despesas.js";

export default class DespesasCTRL{
    gravar(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {codigo, vencimento, numparcelas, desconto, valor} = req.body;
            if(valor==undefined || valor=="" || valor<0)
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação cancelada"
                })
            }
            const despesas = new Despesas(0, vencimento, numparcelas, desconto, valor);

            despesas.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Despesa gravada"
                })
            }).catch((error)=>{
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação de despesa cancelada"
                })
            });
        }
    }

    atualizar(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {codigo, vencimento, numparcelas, desconto, valor} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number"))
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
                })
            }
            const despesas = new Despesas(codigo, vencimento, numparcelas, desconto, valor);

            despesas.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Despesa atualizada"
                })
            }).catch((error)=>{
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização de despesa cancelada"
                })
            });
        }
    }

    excluir(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const dados = req.body;
            const codigo = dados["desp_codigo"]
            if(codigo==undefined || !(typeof(codigo)=="number"))
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão cancelada"
                })
            }
            const despesas = new Despesas(codigo);
            despesas.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Despesa excluida"
                })
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão de despesa cancelada"
                })
            });
        }
    }

    consultarTodos(req,resp){
        resp.setHeader("Content-Type","application/json");
        
            const desp = new Despesas();
            desp.consultarTodos().then((lista)=>{
                resp.json(lista);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        
    }

    consultarVencimento(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {data_venc} = req.params;
            if(data_venc==undefined || data_venc=="")
            {
                resp.sendStatus(400);
            }
            const despesas = new Despesas(data_venc);

            despesas.consultarVencimento(data_venc).then(()=>{
                resp.json(data_venc);
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

}