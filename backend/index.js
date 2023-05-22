import express from "express";
import rotaDoacao from "./Rotas/rotaDoacao.js";
import rotaPret from "./Rotas/rotaPretendente.js";
import rotaJovem from "./Rotas/rotaJovem.js";
import rotaFunc from "./Rotas/rotaFuncionario.js";
import rotaProd from "./Rotas/rotaProduto.js";
import rotaCamp from "./Rotas/rotaCampanhaDoacao.js";
import rotaTipoDesp from "./Rotas/rotaTipoDespesa.js";
import rotaParcelas from "./Rotas/rotaParcelas.js";

import cors from "cors";

//import path1 from 'path'
//const path = path1;
// const path = require(path1);
import path from 'path';




const app = express();

app.use('/files', express.static(path.resolve("","public", "upload")));

app.use(cors({
    origin:'*'
}));


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/doacao",rotaDoacao);
app.use("/pretendente",rotaPret);
app.use("/jovem",rotaJovem);
app.use("/funcionario",rotaFunc);
app.use("/produto",rotaProd);
app.use("/campanhas",rotaCamp);
app.use("/tipodespesa", rotaTipoDesp);
app.use("/parcelas", rotaParcelas);

app.listen(8080,()=>{
    console.log("Executando");
});


