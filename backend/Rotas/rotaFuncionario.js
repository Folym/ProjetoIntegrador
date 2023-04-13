import {Router} from 'express';
import FuncionariosCTRL from '../Controle/FuncionariosCTRL.js';

const rotaFunc = new Router();
const controleFunc = new FuncionariosCTRL();
rotaFunc.get("/", controleFunc.consultarTodos);
rotaFunc.get("/:nome", controleFunc.consultarNome);
rotaFunc.get("/:cpf", controleFunc.consultarCpf);
rotaFunc.post("/", controleFunc.gravar);
rotaFunc.put("/", controleFunc.atualizar);
rotaFunc.delete("/", controleFunc.excluir);

export default rotaFunc;
