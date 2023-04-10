import {Router} from 'express';
import DoacaoCTRL from '../Controle/DoacaoCTRL.js';

const rotaDoacao = new Router();
const controleDoacao = new DoacaoCTRL();
rotaDoacao.get("/", controleDoacao.consultarDesc);
rotaDoacao.get("/:codg", controleDoacao.consultarCodg);
rotaDoacao.post("/", controleDoacao.gravar);
rotaDoacao.put("/", controleDoacao.atualizar);
rotaDoacao.delete("/", controleDoacao.excluir);

export default rotaDoacao;
