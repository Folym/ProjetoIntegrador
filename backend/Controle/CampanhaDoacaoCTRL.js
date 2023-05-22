
import CampanhaDoacao from "../Modelo/CampanhaDoacao.js";


export default class CampanhaDoacaoCTRL{
    gravar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {nome,descri,dtInicio,dtFim,local,finalizado,img} = req.body;
            if(nome==undefined || nome==""){
                 resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao gravar a campanha"
                });
            }
            console.log({nome,descri,dtInicio,dtFim,local,finalizado,img})
            const camp = new CampanhaDoacao(0,nome,descri,dtInicio,dtFim,local,finalizado,img);
            camp.gravar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": " Campanha gravada com sucesso"
                });
            }).catch((error)=>{
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao gravar a campanha"
                });
            });
        }
    }

    finalizar(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const dados = req.body;
            const codigo = dados["camp_codigo"];
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao atualizar Campanha"
                });
            }
            const camp = new CampanhaDoacao(codigo);
            camp.finalizar().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Campanha atualizado com sucesso"
                });
            }).catch((error)=>{
                console.log(error);
                 resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir Campanha"
                });
            });
        }
    }

    excluir(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const dados = req.body;
            const codigo = dados["camp_codigo"];
           // console.log(codigo)
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir pretendentes"
                });
            }
            const camp = new CampanhaDoacao(codigo);
            camp.excluir().then(()=>{
                resp.statusCode = 200;
                resp.json({
                    "status": true,
                    "mensagem": "Pretendentes excluido com sucesso"
                });
            }).catch((error)=>{
                console.log("ERRO");
                console.log(error);
                resp.statusCode = 400;
                resp.json({
                    "status":false,
                    "Mensagem":"Erro ao excluir pretendentes"
                });
            });
        }
    }

    consultar(req,resp){
        resp.setHeader("Content-Type","application/json");
        
            const camp = new CampanhaDoacao();
            camp.Listar().then((lista)=>{
                resp.json(lista);
//              resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        
    }

    consultarCod(req,resp){
        resp.setHeader("Content-Type","application/json");
        if(req.is("application/json")){
            const {codigo} = req.params;
            if(codigo==undefined || !(typeof(codigo)=="number")){
                resp.sendStatus(400);
            }
            const pret = new Pretendentes(codigo);
            pret.consultarCodigo(codigo).then(()=>{
                resp.sendStatus(200);
            }).catch((error)=>{
                console.log(error);
                resp.sendStatus(400);
            });
        }
    }

    gravarImg(req,res){
        if (req.file) {
            console.log(req.file);
            return res.json({
                erro: false,
                mensagem: "Upload realizado com sucesso!"
            });
        }
      
    
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
        });
    }
}