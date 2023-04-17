import {Router} from 'express';
import ProdutoCTRL from '../Controle/ProdutoCTRL.js';

const rotaProd = new Router();
const controleProduto = new ProdutoCTRL();
rotaProd.get("/", controleProduto.consultarDesc);
rotaProd.get("/:codg", controleProduto.consultarCodg);
rotaProd.post("/", controleProduto.gravar);
rotaProd.put("/", controleProduto.atualizar);
rotaProd.delete("/", controleProduto.excluir);

export default rotaProd;
