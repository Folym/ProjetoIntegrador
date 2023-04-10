import {Router} from 'express';
import JovensCTRL from '../Controle/JovensCTRL.js';

const rotaJovem= new Router();
const ctrlJovem = new JovensCTRL();
rotaJovem.get("/", ctrlJovem.consultarNome)
rotaJovem.get("/:cod", ctrlJovem.consultarCod)
rotaJovem.post("/", ctrlJovem.gravar)
rotaJovem.put("/", ctrlJovem.atualizar)
rotaJovem.delete("/", ctrlJovem.excluir);

export default rotaJovem;
