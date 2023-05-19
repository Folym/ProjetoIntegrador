import {Router} from 'express';
import ParcelasCTRL from '../Controle/ParcelasCTRL.js';

const rotaParc = new Router();
const controleParc = new ParcelasCTRL();
rotaParc.get("/:cod", controleParc.consultarParcelas);
rotaParc.get("/", controleParc.consultarTodos); //isso aki é teste
//rotaParc.get("/:vencimento", controleParc.consultarVencimento);
rotaParc.post("/", controleParc.gravar);
rotaParc.put("/", controleParc.atualizar);
rotaParc.delete("/", controleParc.excluir);

export default rotaParc;
