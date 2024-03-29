import FuncionariosDAO from "../Persistencia/FuncionariosDAO.js";

export default class Funcionarios{
    #codigo;
    #nome;
    #cpf;
    #cel;
    #email;
    #end;
    #numend;
    #cep;

    constructor(codigo=0,nome="",cpf="",cel="",email="",end="",numend=0,cep=""){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#cel = cel;
        this.#email = email;
        this.#end = end;
        this.#numend = numend;
        this.#cep = cep;
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
    get cpf(){
        return this.#cpf;
    }
    set cpf(cpf){
        this.#cpf = cpf;
    }
    get cel(){
        return this.#cel;
    }
    set cel(cel){
        this.#cel = cel;
    }
    get email(){
        return this.#email;
    }
    set email(email){
        this.#email = email;
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


    toJSON(){
        return{
            codigo:this.#codigo,
            nome:this.#nome,
            end:this.#end,
            numend:this.#numend,
            cep:this.#cep,
            cpf:this.#cpf,
            cel:this.#cel,
            email:this.#email,
        }
    }

    async gravar(){
        const funcionariosDAO = new FuncionariosDAO();
        const codigo = await funcionariosDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const funcionariosDAO = new FuncionariosDAO();
        await funcionariosDAO.atualizar(this);
    }

    async excluir(){
        const funcionariosDAO = new FuncionariosDAO();
        await funcionariosDAO.excluir(this);
    }

    async consultarTodos(){
        const funcionariosDAO = new FuncionariosDAO();
        return await funcionariosDAO.consultarTodos();
    }
    
    async consultarNome(nome){
        const funcionariosDAO = new FuncionariosDAO();
        return await funcionariosDAO.consultarNome(nome);
    }

    async consultarCpf(cpf){
        const funcionariosDAO = new FuncionariosDAO();
        return await funcionariosDAO.consultarCodg(cpf);
    }
}