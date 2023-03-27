import {Router} from 'express';
import PretendentesCTRL from '../Controle/PretendentesCTRL.js';

const rotaPret= new Router();
const ctrlPret = new PretendentesCTRL();
rotaPret.get("/:desc", ctrlPret.consultarNome)
rotaPret.get("/codigo/:cod", ctrlPret.consultarCod)
rotaPret.post("/", ctrlPret.gravar)
rotaPret.put("/", ctrlPret.atualizar)
rotaPret.delete("/", ctrlPret.excluir);

export default rotaPret;
