class Borond {
    constructor(elem, obj) {
        this.elem = elem;
        this.termekMarka = this.elem.children("#adatok_tarolo").children(".termek_marka");
        this.termekModell = this.elem.children("#adatok_tarolo").children(".termek_modell");
        this.termekMagassag = this.elem.children("#adatok_tarolo").children(".termek_magassag");
        this.termekSzelesseg = this.elem.children("#adatok_tarolo").children(".termek_szelesseg");
        this.termekMelyseg = this.elem.children("#adatok_tarolo").children(".termek_melyseg");
        this.termekUrmertek = this.elem.children("#adatok_tarolo").children(".termek_urmertek");
        this.termekKep = this.elem.children(".borond-kep").children(".termek_eleres");
        this.obj = obj;
        this.termekBeallit(this.obj);
    }
    termekBeallit(obj) {
        this.termekMarka.html(obj.marka);
        this.termekModell.html(obj.modell);
        this.termekMagassag.html(obj.magassag + " cm");
        this.termekSzelesseg.html(obj.szelesseg + " cm");
        this.termekMelyseg.html(obj.melyseg + " cm");
        this.termekUrmertek.html(obj.urmertek + " L");
        obj.szin = obj.szin.replace(new RegExp(/[û]/g), "ű");
        this.termekKep.attr("src", "../kepek/" + obj.marka.substring(0, 2) + '/' + obj.modell + obj.kepElerese + obj.szin + "1.jpg");
    }
}

class BorondVasarlo extends Borond {
    constructor(elem, obj) {
        super(elem, obj);
        this.kep = this.elem.children(".kep");

        this.gomb = this.elem.children(".kosarba");
        this.gomb.html("Kosárba");
        this.termekBeallit(this.elem);

        /*this.gomb.on("click", ()=>{
         this.kattintasTrigger();
         });*/
    }
    /*kattintasTrigger(){
     let esemeny = new CustomEvent("kosarKattintas", {detail:this.adat});
     window.dispatchEvent(esemeny);
     
     }*/
}
class BorondRendszergazda extends Borond {
    constructor(elem, obj) {
        super(elem, obj);

        this.beallit(this.adat);

        /*this.torlesElem = this.elem.children("td").children(".torol");
         this.modositElem = this.elem.children("td").children(".modosit");
         
         this.torlesElem.on("click", ()=>{
         this.torolTrigger();
         });
         
         this.modositElem.on("click", ()=>{
         this.modositTrigger();
         });*/
    }
    /*torolTrigger(){
     let esemeny = new CustomEvent("torles", {detail:this.adat});
     window.dispatchEvent(esemeny);
     
     }
     
     modositTrigger(){
     let esemeny = new CustomEvent("modositas", {detail:this.adat});
     window.dispatchEvent(esemeny);
     
     }*/
}
class BorondAdmin extends Borond {
    constructor(elem, obj) {
        super(elem, obj);

        this.beallit(this.adat);

        /* this.modositElem = this.elem.children("td").children(".modosit");
         
         this.modositElem.on("click", ()=>{
         this.modositTrigger();
         });*/
    }
    /* torolTrigger(){
     let esemeny = new CustomEvent("torles", {detail:this.adat});
     window.dispatchEvent(esemeny);
     
     }
     
     modositTrigger(){
     let esemeny = new CustomEvent("modositas", {detail:this.adat});
     window.dispatchEvent(esemeny);
     
     }*/
}