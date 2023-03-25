import express from "express";
import Doacao from "./Modelo/Doacao.js";


//TESTES DOAÇÃO
// const app = express();
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());
// app.get("/",(req,resp)=>{
//     resp.send("Testando tela");
// })
// app.post("/",(req,resp)=>{
//   const {doac_tipo,doac_end,doac_numend,doac_cep,doac_quantidade,doac_valor,doac_data} = req.body;
//     const doacao = new Doacao(doac_tipo,doac_end,doac_numend,doac_cep,doac_quantidade,doac_valor,doac_data);
//     doacao.gravar().then((data)=>{
//         resp.json(doacao);
//     }).catch((error)=>{
//         console.log(error);
//     });
//     console.log("Testando post");
// })
// app.listen(8080,()=>{
//     console.log("Rodando o programa");
// });

//TESTE PRETENDENTES
import Pretendentes from "./Modelo/Pretendentes.js";
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.get("/",(req,resp)=>{
    resp.send("Testando tela Pretendentes");
})
app.post("/",(req,resp)=>{
    console.log(req.body);
    const {pret_nome,pret_cpf,pret_cel,pret_email,pret_end,pret_numend,pret_cep,pret_status} = req.body;
    console.log({pret_nome,pret_cpf,pret_cel,pret_email,pret_end,pret_numend,pret_cep,pret_status});
    const preten = new Pretendentes(0,pret_nome,pret_cpf,pret_cel,pret_email,pret_end,pret_numend,pret_cep,pret_status);
    preten.gravar().then((data)=>{
        resp.json(preten);
    }).catch((error)=>{
        console.log(error);
    });
    console.log("Testando post");
})
app.listen(8080,()=>{
    console.log("Rodando o programa");
});


