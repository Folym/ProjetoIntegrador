import DoacaoDAO from "../Persistencia/DoacaoDAO.js";
export default class Doacao{
    #codigo;
    #prodcod;
    #campcod
    #end;
    #numend;
    #cep;
    #quant;
    #data;
    #desc;
    constructor(codigo=0,prodcod=0,campcod = 0,end="",numend=0,cep=0,quant=0,data="",desc=""){
        this.#codigo = codigo;
        this.#prodcod = prodcod;
        this.#campcod = campcod;
        this.#end = end;
        this.#numend = numend;
        this.#cep = cep;
        this.#quant = quant;
        this.#valor = valor;
        this.#data = data;
        this.#desc = desc;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
    }

    get prodcod(){
        return this.#codigo;
    }
    set prodcod(prodcod){
        this.prodcod = prodcod;
    }

    get campcod(){
        return this.#campcod;
    }
    set campcod(campcod){
        this.#campcod = campcod;
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
    
    get valor(){
        return this.#valor;
    }
    set valor(valor){
        this.#valor = valor;
    }

    toJSON(){
        return{
            codigo:this.#codigo,
            prodcod:this.#prodcod,
            campcod:this.#campcod,
            end:this.#end,
            numend:this.#numend,
            cep:this.#cep,
            quant:this.#quant,
            data:this.#data,
            valor:this.#valor,
            desc:this.#desc
        }
    }

    toString(){
        return "Descricao: "+this.#desc;
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
        return await doacaoDAO.consultarDesc();
    } 

    async consultarCodg(codigo){
        const doacaoDAO = new DoacaoDAO();
        return await doacaoDAO.consultarCodg(codigo);
    }
}