import DoacaoDAO from "../Persistencia/DoacaoDAO.js";
//Criação dos atributos da classe Tipo de Doação
export default class Doacao{
    #codigo;
    #tipo;
    #end;
    #numend;
    #cep;
    #quant;
    #valor;
    #data;
    constructor(codigo=0,tipo="",end="",numend=0,cep=0,quant=0,valor=0,data=""){
        this.#codigo = codigo;
        this.#tipo = tipo;
        this.#end = end;
        this.#numend = numend;
        this.#cep = cep;
        this.#quant = quant;
        this.#valor = valor;
        this.#data = data;
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

    get end(){
        return this.#end;
    }
    set end(end){
        this.#end = end;
    }

    get numend(){
        return this.#numend;
    }
    set numend(numend){
        this.#numend = numend;
    }

    get cep(){
        return this.#cep;
    }
    set cep(cep){
        this.#cep = cep;
    }

    get quant(){
        return this.#quant;
    }
    set quant(quant){
        this.#quant = quant;
    }

    get valor(){
        return this.#valor;
    }
    set valor(valor){
        this.#valor = valor;
    }

    get data(){
        return this.#data;
    }
    set data(data){
        this.#data = data;
    }
    
    toJSON(){
        return{
            codigo:this.#codigo,
            tipo:this.#tipo,
            end:this.#end,
            numend:this.#numend,
            cep:this.#cep,
            quant:this.#quant,
            valor:this.#valor,
            data:this.#data
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