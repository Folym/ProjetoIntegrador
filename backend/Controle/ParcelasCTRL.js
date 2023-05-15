import Parcelas from "../Modelo/Parcelas.js"

export default class DespesasCTRL{
    gravar(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {codigo, desp_codigo, vencimento, valor} = req.body;
            if(valor==undefined || valor=="" || valor<0 || desp_codigo=="")
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação cancelada"
                })
            }
            const parcela = new Parcelas(0, desp_codigo, valor, vencimento);

            parcela.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Parcela gravada"
                })
            }).catch((error)=>{
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação de parcela cancelada"
                })
            });
        }
    }

    atualizar(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {codigo, desp_codigo, vencimento, valor} = req.body;
            if(desp_codigo==undefined || !(typeof(desp_codigo)=="number"))
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
                })
            }
            const parcela = new Parcelas(0, desp_codigo, valor, vencimento);

            parcela.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Parcela atualizada"
                })
            }).catch((error)=>{
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização de parcela cancelada"
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
            const codigo = dados["parc_codigo"]
            if(codigo==undefined || !(typeof(codigo)=="number"))
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão cancelada"
                })
            }
            const parcela = new Parcelas(codigo);
            parcela.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Parcela excluida"
                })
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão de parcela cancelada"
                })
            });
        }
    }

    consultarVencimento(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {parc_venc} = req.params;
            if(parc_venc==undefined || parc_venc=="")
            {
                resp.sendStatus(400);
            }
            const parcela = new Parcelas(parc_venc);

            parcela.consultarVencimento(parc_venc).then(()=>{
                resp.json(parc_venc);
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    consultarParcelas(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {desp_codigo} = req.params;
            if(desp_codigo==undefined || desp_codigo=="")
            {
                resp.sendStatus(400);
            }
            const parcela = new Parcelas(desp_codigo);

            parcela.consultarParcelas(desp_codigo).then(()=>{
                resp.json(desp_codigo);
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

}