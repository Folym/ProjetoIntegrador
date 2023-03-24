import TpDoacaoDAO from "../Persistencia/TpDoacaoDAO";

export default class TpDoacao{
    #codigo;
    #tipo;
    #descricao;

    constructor(codigo=0,tipo="",descricao=""){
        this.#codigo = codigo;
        this.#tipo = tipo;
        this.#descricao = descricao;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
    }

    get tipo(){
        return this.#tipo;
    }
    set tipo(tipo){
        this.#tipo = tipo;
    }

    get descricao(){
        return this.#descricao;
    }
    set descricao(descricao){
        this.#descricao = descricao;
    }

    toJSON(){
        return{
            codigo:this.#codigo,
            tipo:this.#tipo,
            descricao:this.#descricao
        }
    }

    toString(){
        return "Tipo: "+this.#tipo;
    }

    async gravar(){
        const tpDoacaoDAO = new TpDoacaoDAO();
        const codigo = await tpDoacaoDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const tpDoacaoDAO = new TpDoacaoDAO();
        await tpDoacaoDAO.atualizar(this);
    }

    async excluir(){
        const tpDoacaoDAO = new TpDoacaoDAO();
        await tpDoacaoDAO.excluir(this);
    }
    
    async consultar(codigo){
        const tpDoacaoDAO = new TpDoacaoDAO();
        return await tpDoacaoDAO.consultar(codigo);
    }
}