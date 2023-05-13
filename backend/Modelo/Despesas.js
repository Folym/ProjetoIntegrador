import DespesasDAO from "../Persistencia/DespesasDAO.js";

export default class Despesas{
    #codigo;
    #vencimento;
    #valor;
    #numparcelas;
    #desconto

    constructor(codigo=0,vencimento="",numparcelas=1,desconto=0, valor=0){
        this.#codigo = codigo;
        this.#vencimento = vencimento;
        this.#numparcelas = numparcelas;
        this.#desconto = desconto;
        this.#valor = valor;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(codigo){
        this.#codigo = codigo;
    }
    get vencimento(){
        return this.#vencimento;
    }
    set vencimento(vencimento){
        this.#vencimento = vencimento;
    }
    get numparcelas(){
        return this.#numparcelas;
    }
    set numparcelas(numparcelas){
        this.#numparcelas = numparcelas;
    }
    get desconto(){
        return this.#desconto;
    }
    set desconto(desconto){
        this.#desconto = desconto;
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
            vencimento:this.#vencimento,
            numparcelas:this.#numparcelas,
            desconto:this.#desconto,
            valor:this.#valor
        }
    }

    async gravar(){
        const despesasDAO = new DespesasDAO();
        const codigo = await despesasDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const despesasDAO = new DespesasDAO();
        await despesasDAO.atualizar(this);
    }

    async excluir(){
        const despesasDAO = new DespesasDAO();
        await despesasDAO.excluir(this);
    }

    async consultarTodos(){
        const despesasDAO = new DespesasDAO();
        return await despesasDAO.consultarTodos();
    }
    
    async consultarVencimento(vencimento){
        const despesasDAO = new DespesasDAO();
        return await despesasDAO.consultarVencimento(vencimento);
    }

    async consultarParcelas(codigo){
        const despesasDAO = new DespesasDAO();
        return await despesasDAO.consultarParcelas(codigo);
    }

}