import {Router} from 'express';
import JovensCTRL from '../Controle/JovensCTRL.js';

const rotaJovem= new Router();
const ctrlJovem = new JovensCTRL();
rotaJovem.get("/:desc", ctrlJovem.consultarNome)
rotaJovem.get("/codigo/:codg", ctrlJovem.consultarCod)
rotaJovem.post("/", ctrlJovem.gravar)
rotaJovem.put("/", ctrlJovem.atualizar)
rotaJovem.delete("/", ctrlJovem.excluir);

export default rotaJovem;
