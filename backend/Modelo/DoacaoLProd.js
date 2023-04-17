import DoacaoDAO from "../Persistencia/DoacaoLProdDAO.js";

export default class Doacao{
    #codigo;
    #prodcod;
    #campcod
    #end;
    #numend;
    #cep;
    #data;
    #desc;
    constructor(codigo=0,prodcod=0,campcod = 0,end="",numend=0,cep=0,data="",desc=""){
        this.#codigo = codigo;
        this.#prodcod = prodcod;
        this.#campcod = campcod;
        this.#end = end;
        this.#numend = numend;
        this.#cep = cep;
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
    
    toJSON(){
        return{
            codigo:this.#codigo,
            prodcod:this.#prodcod,
            campcod:this.#campcod,
            end:this.#end,
            numend:this.#numend,
            cep:this.#cep,
            data:this.#data,
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