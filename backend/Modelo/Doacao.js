import DoacaoDAO from "../Persistencia/DoacaoDAO";
//Criação dos atributos da classe Tipo de Doação
export default class Doacao{
    #codigo;
    #tipo;

    constructor(codigo=0,tipo=""){
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


    toJSON(){
        return{
            codigo:this.#codigo,
            tipo:this.#tipo
        }
    }

    toString(){
        return "Tipo: "+this.#tipo;
    }

    async gravar(){
        const doacaoDAO = new DoacaoDAO();
        const codigo = await doacaoDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const doacaoDAO = new DoacaoDAO();
        await doacaoDAO.atualizar(this);
    }

    async excluir(){
        const doacaoDAO = new DoacaoDAO();
        await doacaoDAO.excluir(this);
    }
    
    async consultar(codigo){
        const doacaoDAO = new DoacaoDAO();
        return await doacaoDAO.consultar(codigo);
    }
}