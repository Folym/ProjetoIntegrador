import TipoDespesaDAO from "../Persistencia/TipoDespesaDAO.js";

export default class TipoDespesa{
    #codigo;
    #descricao;

    constructor(codigo=0, descricao=''){
        this.#codigo = codigo;
        this.#descricao = descricao;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
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
            descricao:this.#descricao
        }
    }

    async gravar(){
        const tipoDespDAO = new TipoDespesaDAO();
        const codigo = await tipoDespDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const tipoDespDAO = new TipoDespesaDAO();
        await tipoDespDAO.atualizar(this);
    }

    async excluir(){
        const tipoDespDAO = new TipoDespesaDAO();
        await tipoDespDAO.excluir(this);
    }

    async consultarTodos(){
        const tipoDespDAO = new TipoDespesaDAO();
        return await tipoDespDAO.consultarTodos();
    }

}