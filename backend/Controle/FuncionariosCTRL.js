import Funcionarios from "../Modelo/Funcionarios.js";

export default class FuncionariosCTRL{
    gravar(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {nome, cpf, cel, email, end, numend, cep} = req.body;
            if(nome==undefined || nome=="")
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação cancelada"
                })
            }
            const funcionarios = new Funcionarios(0,nome, cpf, cel, email, end, numend, cep);

            funcionarios.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Funcionario gravado"
                })
            }).catch((error)=>{
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Gravação cancelada"
                })
            });
        }
    }

    atualizar(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {codigo, nome, cpf, cel, email, end, numend, cep} = req.body;
            if(codigo==undefined || !(typeof(codigo)=="number"))
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
                })
            }
            const funcionarios = new Funcionarios(codigo, nome, cpf, cel, email, end, numend, cep);

            funcionarios.atualizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Funcionario atualizado"
                })
            }).catch((error)=>{
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Atualização cancelada"
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
            const codigo = dados["func_codigo"]
            if(codigo==undefined || !(typeof(codigo)=="number"))
            {
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão cancelada"
                })
            }
            const funcionarios = new Funcionarios(codigo);
            funcionarios.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status":true,
                    "mensagem":"Funcionario excluido"
                })
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "mensagem":"Exclusão cancelada"
                })
            });
        }
    }

    consultarTodos(req,resp){
        resp.setHeader("Content-Type","application/json");
        
            const func = new Funcionarios();
            func.consultarTodos().then((lista)=>{
                resp.json(lista);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        
    }

    consultarNome(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {nome} = req.params;
            if(nome==undefined || nome=="")
            {
                resp.sendStatus(400);
            }
            const funcionarios = new Funcionarios(nome);

            funcionarios.consultarNome(nome).then(()=>{
                resp.json(nome);
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    consultarCpf(req,resp)
    {
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json"))
        {
            const {cpf} = req.params;
            if(cpf==undefined || !(typeof(cpf)=="number"))
            {
                resp.sendStatus(400);
            }
            const funcionarios = new Funcionarios(cpf);
            
            funcionarios.consultarCpf(cpf).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }
}