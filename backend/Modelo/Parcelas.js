import ParcelasDAO from "../Persistencia/ParcelasDAO.js";

export default class Parcelas{
    #codigo;
    #desp_codigo;
    #vencimento;
    #valor;

    constructor(codigo=0, desp_codigo=0, valor=0, vencimento=''){
        this.#codigo = codigo;
        this.#desp_codigo = desp_codigo;
        this.#vencimento = vencimento;
        this.#valor = valor;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
    }
    get desp_codigo(){
        return this.#desp_codigo;
    }
    set desp_codigo(desp_codigo){
        this.#desp_codigo = desp_codigo;
    }
    get vencimento(){
        return this.#vencimento;
    }
    set vencimento(vencimento){
        this.#vencimento = vencimento;
    }
    get valor(){
        return this.#valor;
    }
    set valor(valor){
        this.#valor=valor;
    }
    
    toJSON(){
        return{
            codigo:this.#codigo,
            desp_codigo:this.#desp_codigo,
            vencimento:this.#vencimento,
            valor:this.#valor
        }
    }

    async gravar(){
        const parcelasDAO = new ParcelasDAO();
        const codigo = await parcelasDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const parcelasDAO = new ParcelasDAO();
        await parcelasDAO.atualizar(this);
    }

    async excluir(){
        const parcelasDAO = new ParcelasDAO();
        await parcelasDAO.excluir(this);
    }
    
    async consultarVencimento(vencimento){
        const parcelasDAO = new ParcelasDAO();
        return await parcelasDAO.consultarVencimento(vencimento);
    }

    async consultarParcelas(desp_codigo){
        const parcelasDAO = new ParcelasDAO();
        return await parcelasDAO.consultarParcelas(desp_codigo);
    }
    async consultarTodos(){
        const parcelasDAO = new ParcelasDAO();
        return await parcelasDAO.consultarTodos();
    }

}