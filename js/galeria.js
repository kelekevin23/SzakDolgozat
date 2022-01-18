class Galeria{
    constructor(elem, index){

        this.elem = elem;
        this.kep = this.elem.children("img");
        this.kepBeallit(index);
    }

    kepBeallit(index){  
        this.kep.attr("src", "kepek/"+index+".jpg");
    }
}


class Kep{
    
}