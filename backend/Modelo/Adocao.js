import AdocaoDAO from "../Persistencia/AdocaoDAO.js"
export default class Adocoes{
    #codigo 
    #pret_cod1
    #pret_cod2
    #jov_cod
    #status

    constructor(codigo=0,pret_cod1=0,pret_cod2=0,jov_cod=0,status=""){
        this.#codigo = codigo;
        this.#pret_cod1 = pret_cod1;
        this.#pret_cod2 = pret_cod2;
        this.#jov_cod = jov_cod;
        this.#status = status;
    }
    
    get codigo(){
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
    }

    get pret_cod1(){
        return this.#pret_cod1;
    }
    set pret_cod1(pret_cod1){
        this.#pret_cod1 = pret_cod1;
    }

    get pret_cod2(){
        return this.#pret_cod2;
    }
    set pret_cod2(pret_cod2){
        this.#pret_cod2 = pret_cod2;
    }
    
    get jov_cod(){
        return this.#jov_cod;
    }
    set jov_cod(jov_cod){
        this.#jov_cod = jov_cod;
    }


    get status(){
        return this.#status;
    }
    set status(status){
        this.#status = status;
    }

    toJSON(){
        return{
            codigo :this.#codigo ,
            pret_cod1:this.#pret_cod1 ,
            pret_cod2:this.#pret_cod2 ,
            jov_cod:this.#jov_cod,
            status : this.#status 
        }
    }

    toString(){
        return "NOME : "+this.#pret_cod1;
    }

    async gravar(){
        const adocaoDAO = new AdocaoDAO();
        const codigo = await adocaoDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const adocaoDAO = new AdocaoDAO();
        await adocaoDAO.atualizar(this);
    }

    async excluir(){
        const adocaoDAO = new AdocaoDAO();
        await adocaoDAO.excluir(this);
    }
    
    async consultarCodigo(codigo){
        const adocaoDAO = new AdocaoDAO();
        return await adocaoDAO.consultarCodigo(codigo);
    }

    async consultarNome(){
        const adocaoDAO = new AdocaoDAO();
       return await adocaoDAO.consultarNome();
        
    }

}