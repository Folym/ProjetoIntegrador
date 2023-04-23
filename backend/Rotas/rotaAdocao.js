import {Router} from 'express';
import AdocoesCTRL from '../Controle/AdocaoCTRL.js';

const rotaAdocao = new Router();
const ctrlAdocao = new AdocoesCTRL();

rotaAdocao.get("/", ctrlAdocao.consultarNome)
rotaAdocao.get("/:cod", ctrlAdocao.consultarCod)
rotaAdocao.post("/", ctrlAdocao.gravar)
rotaAdocao.put("/", ctrlAdocao.atualizar)
rotaAdocao.delete("/", ctrlAdocao.excluir);

export default rotaAdocao;
