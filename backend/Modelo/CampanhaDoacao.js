import CampanhaDoacaoDAO from "../Persistencia/CampanhaDoacaoDAO.js"
export default class CampanhaDoacao{
    #codigo 
    #nome 
    #descri
    #dtInicio
    #dtFim
    #local
    #finalizado 
    #img
   

    constructor(codigo=0,nome="",descri="",dtInicio="",dtFim="",local="",finalizado="",img=""){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#descri = descri
        this.#finalizado = finalizado;
        this.#dtInicio = dtInicio;
        this.#dtFim = dtFim;
        this.#local = local;
        this.#img = img
        
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
    set finalizado(finalizado){
        this.#finalizado = finalizado;
    }

    get dtInicio (){
        return this.#dtInicio;
    }
    set dtInicio(dtInicio){
        this.#dtInicio = dtInicio;
    }

    get dtFim(){
        return this.#dtFim;
    }
    set dtFim(dtFim){
        this.#dtFim = dtFim;
    }
    get local(){
        return this.#local;
    }
    set local(local){
        this.#local = local;
    }

    get img(){
        return this.#img;
    }
    set img(img){
        this.#img = img;
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

    async finalizar(){
        const campDAO = new CampanhaDoacaoDAO();
        await campDAO.finalizar(this);
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