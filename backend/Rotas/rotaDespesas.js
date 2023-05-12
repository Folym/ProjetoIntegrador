import {Router} from 'express';
import DespesasCTRL from '../Controle/DespesasCTRL.js';

const rotaDesp = new Router();
const controleDesp = new DespesasCTRL();
rotaDesp.get("/", controleDesp.consultarTodos);
rotaDesp.get("/:data_venc", controleDesp.consultarVencimento);
rotaDesp.post("/", controleDesp.gravar);
rotaDesp.put("/", controleDesp.atualizar);
rotaDesp.delete("/", controleDesp.excluir);

export default rotaDesp;
