import TpDoacao from "../Modelo/TpDoacao";

export default class TpDoacaoDAO{
    constructor(){

    }
    async gravar(tpDoacao){
        if(tpDoacao instanceof TpDoacao){
            //fazer conexao
            //fazer sql
            const parm = [tpDoacao.tipo,tpDoacao.descricao];
            //resultado
            //return
        }
    }

    async atualizar(tpDoacao){
        if(tpDoacao instanceof TpDoacao){
            //fazer conexao
            //fazer sql
            const parm = [tpDoacao.tipo,tpDoacao.descricao];
            //resultado
            //return
        }
    }

    async excluir(tpDoacao){
        if(tpDoacao instanceof TpDoacao){
            //fazer conexao
            //fazer sql
            const parm = [tpDoacao.codigo];
            //return
        }
    }

    async consultar(codigo){
            
    }
}