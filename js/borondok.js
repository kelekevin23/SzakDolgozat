$(function () {

    $('.slider').on('change', function () {
        let val = $(this).val();
        $('#slider_ertek').html("Jelenlegi érték: " + val);
    });



    const ajax = new Ajax();
    let adatok = [];




    let data = {
        mit: "*",
        tablaNeve: "Szin",
        honnan: "",
        where: "where besorolas is null",
        segedTabla: ""
    };
    ajax.getAjax('feldolgoz.php', adatok, data, radio);

    const szuloElem = $("section");
    const sablonElem = $(".termek");
    const termekek = [];



    function termeketFelvesz(adatok) {

        for (var index = 0; index < adatok.length; index++) {
            const ujElem = sablonElem.clone().appendTo(szuloElem);
            const termek = new Termek(ujElem, adatok[index]);
        }
        sablonElem.remove();

    }
    function radio(adatok) {
       
        for (var i = 0; i < adatok.length; i++) {
            $("#szinek_tarolo").append("<input type=checkbox id=szin" + i + "name=szin" + i + "value=" + adatok[i].szin + ">");
            $("#szinek_tarolo").append("<label for=szin" + i + ">" + adatok[i].szin + "</label><br>");
        }


    }
    class Termek
    {

        constructor(elem, obj) {
            this.elem = elem;
            this.termekMagassag = this.elem.children("#adatok_tarolo").children(".termek_magassag");
            this.termekSzelesseg = this.elem.children("#adatok_tarolo").children(".termek_szelesseg");
            this.termekMelyseg = this.elem.children("#adatok_tarolo").children(".termek_melyseg");
            this.termekUrmertek = this.elem.children("#adatok_tarolo").children(".termek_urmertek");
            this.termekKep = this.elem.children(".borond-kep").children(".termek_eleres");
            this.obj = obj;
            this.termekBeallit(this.obj);
        }
        termekBeallit(obj) {
            this.termekMagassag.html(obj.magassag + " cm");
            this.termekSzelesseg.html(obj.szelesseg + " cm");
            this.termekMelyseg.html(obj.melyseg + " cm");
            this.termekUrmertek.html(obj.urmertek + " L");
            this.termekKep.attr("src", "../" + obj.eleres);
        }

    }

});


