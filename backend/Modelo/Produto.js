import ProdutoDAO from "../Persistencia/ProdutoDAO.js";
export default class Produto{
    #codigo;
    #nome;
    #desc;
    constructor(codigo=0,nome="",desc=""){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#desc = desc;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
    }

    get nome(){
        return this.#nome;
    }
    set nome(nome){
        this.#nome = nome;
    }
    
    get desc(){
        return this.#desc;
    }
    set desc(desc){
        this.#desc = desc;
    }

    toJSON(){
        return{
            codigo:this.#codigo,
            nome:this.#nome,
            desc:this.#desc
        }
    }

    toString(){
        return "Nome: "+this.#nome;
    }

    async gravar(){
        const produtoDAO = new ProdutoDAO();
        const codigo = await produtoDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const produtoDAO = new ProdutoDAO();
        await produtoDAO.atualizar(this);
    }

    async excluir(){
        const produtoDAO = new ProdutoDAO();
        await produtoDAO.excluir(this);
    }
    
    async consultarDesc(){
        const produtoDAO = new ProdutoDAO();
        return await produtoDAO.consultarDesc();
    }

    async consultarCodg(codigo){
        const produtoDAO = new ProdutoDAO();
        return await produtoDAO.consultarCodg(codigo);
    }
}