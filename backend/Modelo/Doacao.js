import DoacaoDAO from "../Persistencia/DoacaoDAO.js";

export default class Doacao{
    #codigo;
    #prodcod;
    #tipo
    #end;
    #numend;
    #cep;
    #quant;
    #valor;
    #data;
    #desc;
    #campcod;
    constructor(codigo=0,prodcod=null,tipo ="",end="",numend=0,cep=0,quant=0,valor=0,data="",desc="",campcod = null){
        this.#codigo = codigo;
        this.#prodcod = prodcod;
        this.#tipo = tipo;
        this.#end = end;
        this.#numend = numend;
        this.#cep = cep;
        this.#quant = quant;
        this.#valor = valor;
        this.#data = data;
        this.#desc = desc;
        this.#campcod = campcod;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
    }

    get prodcod(){
        return this.#prodcod;
    }
    set prodcod(prodcod){
        this.prodcod = prodcod;
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
    
    get desc(){
        return this.#desc;
    }
    set desc(desc){
        this.#desc = desc;
    }
    
    get campcod(){
        return this.#campcod;
    }
    set campcod(campcod){
        this.#campcod = campcod;
    }

    toJSON(){
        return{
            codigo:this.#codigo,
            prodcod:this.#prodcod,
            tipo:this.#tipo,
            end:this.#end,
            numend:this.#numend,
            cep:this.#cep,
            quant:this.#quant,
            valor:this.#valor,
            data:this.#data,
            desc:this.#desc,
            campcod:this.#campcod
        }
    }

    toString(){
        return "Descricao: "+this.#prodcod;
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
    
    async consultarDesc(){
        const doacaoDAO = new DoacaoDAO();
        return await doacaoDAO.consultarDesc(this);
    } 

    async consultarCodg(codigo){
        const doacaoDAO = new DoacaoDAO();
        return await doacaoDAO.consultarCodg(codigo);
    }
}