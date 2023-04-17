import LoginDAO from "../Persistencia/LoginDAO"

export default class Login{
    #codigo 
    #nome 
    #senha
    #cpf 
    #cel 
    #email 

    constructor(codigo=0,nome="",senha="",cpf="", cel="",email=""){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#senha = senha
        this.#cpf = cpf;
        this.#cel = cel;
        this.#email = email;
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

    get senha(){
        return this.#senha;
    }
    set senha(senha){
        this.#senha = senha;
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

    toJSON(){
        return{
            codigo :this.#codigo ,
            nome:this.#nome ,
            cpf:this.#cpf ,
            cel:this.#cel,
            email:this.#email,
            end:this.#end,
            numend:this.#numend,
            cep: this.#cep,
            status : this.#status 
        }
    }

    toString(){
        return "NOME : "+this.#nome;
    }

    async gravar(){
        const logDAO = new LoginDAO();
        const codigo = await logDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const logDAO = new LoginDAO();
        await logDAO.atualizar(this);
    }

    async excluir(){
        const logDAO = new LoginDAO();
        await logDAO.excluir(this);
    }
    
    async consultarUsuario(usu,senha){
        const logDAO = new LoginDAO();
        return await logDAO.consultarUsuario(usu,senha);
    }

    async Listar(){
        const logDAO = new LoginDAO();
       return await logDAO.Listar();
        
    }

    
    


}