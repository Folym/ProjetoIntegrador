import express from "express";
import rotaDoacao from "./Rotas/rotaDoacao.js";


const app = express();

app.use(cors({
    origin:'*'
}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(rotaDoacao);
app.listen(8080,()=>{
    console.log("Executando");
});
