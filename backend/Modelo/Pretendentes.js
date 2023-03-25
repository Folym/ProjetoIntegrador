import PretendentesDAO from "../Persistencia/PretendentesDAO.js"
export default class Pretendentes{
    #codigo 
    #nome 
    #cpf 
    #cel 
    #email 
    #end
    #numend 
    #cep
    #status 

    constructor(codigo=0,nome="",cpf="", cel="",email="",end="",numend=0,cep=0,status=""){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#cel = cel;
        this.#email = email;
        this.#end = end;
        this.#numend = numend;
        this.#cep = cep;
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
        const pretDAO = new PretendentesDAO();
        const codigo = await pretDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const pretDAO = new PretendentesDAO();
        await pretDAO.atualizar(this);
    }

    async excluir(){
        const pretDAO = new PretendentesDAO();
        await pretDAO.excluir(this);
    }
    
    async consultar(codigo){
        const pretDAO = new PretendentesDAO();
        return await pretDAO.consultar(codigo);
    }

    async consultar(nome){
        const pretDAO = new PretendentesDAO();
        return await pretDAO.consultarNome(nome);
    }


    


}