import JovemDAO from "../Persistencia/JovensDAO.js"
export default class Jovens{
    #codigo 
    #nome 
    #cpf 
    #nomepai 
    #nomemae 
    #idade
    #sexo
    #status 

    constructor(codigo=0,nome="",cpf="", nomepai="",nomemae="",idade=0,sexo="",status=""){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#nomepai = nomepai;
        this.#nomemae = nomemae;
        this.#idade = idade;
        this.#sexo = sexo;
        this.#status = status;
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
    
    get nomepai(){
        return this.#nomepai;
    }
    set nomepai(nomepai){
        this.#nomepai = nomepai;
    }

    get nomemae(){
        return this.#nomemae;
    }
    set nomemae(nomemae){
        this.#nomemae = nomemae;
    }

    get idade(){
        return this.#idade;
    }
    set idade(idade){
        this.#idade = idade;
    }

    get sexo(){
        return this.#sexo;
    }
    set sexo(sexo){
        this.#sexo = sexo;
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
            nome:this.#nome ,
            cpf:this.#cpf ,
            nomepai:this.#nomepai,
            nomemae:this.#nomemae,
            idade:this.#idade,
            sexo: this.#sexo,
            status : this.#status 
        }
    }

    toString(){
        return "NOME : "+this.#nome;
    }

    async gravar(){
        const jovemDAO = new JovemDAO();
        const codigo = await jovemDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const jovemDAO = new JovemDAO();
        await jovemDAO.atualizar(this);
    }

    async excluir(){
        const jovemDAO = new JovemDAO();
        await jovemDAO.excluir(this);
    }
    
    async consultar(codigo){
        const jovemDAO = new JovemDAO();
        return await jovemDAO.consultar(codigo);
    }

    async consultar(nome){
        const jovemDAO = new JovemDAO();
        return await jovemDAO.consultarNome(nome);
    }


    


}