import {Router} from 'express';
import CampanhaDoacaoCTRL from '../Controle/CampanhaDoacaoCTRL.js';
import upload from '../middlewares/uploadImage.js'
const uploadUser = upload;


const rotaCamp= new Router();
const ctrlCamp = new CampanhaDoacaoCTRL();
rotaCamp.get("/", ctrlCamp.consultar)
rotaCamp.get("/:cod", ctrlCamp.consultarCod)
rotaCamp.post("/", ctrlCamp.gravar)
rotaCamp.put("/", ctrlCamp.finalizar)
rotaCamp.delete("/", ctrlCamp.excluir);

//uploadUser.single('image')
rotaCamp.post("/upload-image",uploadUser.single('image'),ctrlCamp.gravarImg)

export default rotaCamp;
