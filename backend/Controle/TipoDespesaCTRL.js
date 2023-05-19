import TipoDespesa from "../Modelo/TipoDespesa.js";

export default class TipoDespesaCTRL{
    gravar(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {codigo, descricao} = req.body;
            if(descricao==undefined || descricao=="")
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação cancelada"
                })
            }
            const tipoDespesa = new TipoDespesa(0, descricao);

            tipoDespesa.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Tipo gravado"
                })
            }).catch((error)=>{
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação de tipo cancelada"
                })
            });
        }
    }

    atualizar(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {codigo, descricao} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number"))
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
                })
            }
            const tipoDespesa = new TipoDespesa(codigo, descricao);

            tipoDespesa.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Tipo atualizado"
                })
            }).catch((error)=>{
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização de tipo cancelada"
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
            const codigo = dados["tipo_desp_codigo"]
            if(codigo==undefined || !(typeof(codigo)=="number"))
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão cancelada"
                })
            }
            const tipoDespesa = new TipoDespesa(codigo);
            tipoDespesa.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Tipo excluido"
                })
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão de tipo cancelada"
                })
            });
        }
    }

    consultarTodos(req,resp){
        resp.setHeader("Content-Type","application/json");
            const tipoDespesa = new TipoDespesa();
            tipoDespesa.consultarTodos().then((lista)=>{
                
                resp.json(lista);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
    }
}