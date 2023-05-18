import {Router} from 'express';
import TipoDespesaCTRL from '../Controle/TipoDespesaCTRL.js';

const rotaTipoDesp = new Router();
const controleTipoDesp = new TipoDespesaCTRL();
rotaTipoDesp.get("/", controleTipoDesp.consultarTodos);
rotaTipoDesp.post("/", controleTipoDesp.gravar);
rotaTipoDesp.put("/", controleTipoDesp.atualizar);
rotaTipoDesp.delete("/", controleTipoDesp.excluir);

export default rotaTipoDesp;
