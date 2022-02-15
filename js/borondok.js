$(function () {
    const szuloElem = $("section");
    const sablonElem = $(".termek");
    const termekek = [];
    $.ajax(
            {
                url: "../js/adatok.json",
                success: function (result)
                {
                    result.borondok.forEach((value) => {
                        termekek.push(value);
                    });
                    termeketFelvesz(termekek);
                }
            }
    );


    function termeketFelvesz(adatok) {

        for (var index = 0; index < adatok.length; index++) {
            const ujElem = sablonElem.clone().appendTo(szuloElem);
            const termek = new Termek(ujElem, adatok[index]);
        }
        sablonElem.remove();



    }
    class Termek {

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


