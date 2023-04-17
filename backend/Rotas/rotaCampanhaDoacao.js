import {Router} from 'express';
import CampanhaDoacaoCTRL from '../Controle/CampanhaDoacaoCTRL.js';

const rotaCamp= new Router();
const ctrlCamp = new CampanhaDoacaoCTRL();
rotaCamp.get("/", ctrlCamp.consultar)
rotaCamp.get("/:cod", ctrlCamp.consultarCod)
rotaCamp.post("/", ctrlCamp.gravar)
rotaCamp.put("/", ctrlCamp.atualizar)
rotaCamp.delete("/", ctrlCamp.excluir);

export default rotaCamp;
