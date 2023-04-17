import CampanhaDoacaoDAO from "../Persistencia/CampanhaDoacaoDAO.js"
export default class CampanhaDoacao{
    #codigo 
    #nome 
    #descri
    #finalizado 
   

    constructor(codigo=0,nome="",descri="",finalizado=""){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#descri = descri
        this.#finalizado = finalizado;
        
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

    get descri(){
        return this.#descri;
    }
    set descri(descri){
        this.#descri = descri;
    }

    get finalizado(){
        return this.#finalizado;
    }
    set findalizao(finalizado){
        this.#finalizado = finalizado;
    }
    
  

    toJSON(){
        return{
            codigo :this.#codigo ,
            nome:this.#nome ,
            descri:this.#descri ,
            finalizado:this.#finalizado, 
        }
    }

    toString(){
        return "NOME : "+this.#nome;
    }

    async gravar(){
        const campDAO = new CampanhaDoacaoDAO();
        const codigo = await campDAO.gravar(this);
        this.#codigo = codigo;
    }

    async atualizar(){
        const campDAO = new CampanhaDoacaoDAO();
        await campDAO.atualizar(this);
    }

    async excluir(){
        const campDAO = new CampanhaDoacaoDAO();
        await campDAO.excluir(this);
    }
    
    // async consultarUsuario(usu,senha){
    //     const campDAO = new LoginDAO();
    //     return await campDAO.consultarUsuario(usu,senha);
    // }

    async Listar(){
        const campDAO = new CampanhaDoacaoDAO();
       return await campDAO.Listar();
        
    }

    
    

}