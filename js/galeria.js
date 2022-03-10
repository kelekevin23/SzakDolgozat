$(function () {

    const galeria = new Galeria();


});


class Galeria {
    constructor() {

        const ajax = new Ajax();
        let adatok = [];




        let data = {
            mit: "top 9 c.*, m.marka",
            tablaNeve: "Cikk",
            honnan: "Cikk c inner join Modell m on c.modell = m.modell",
            where: "order by keszlet desc",
            segedTabla: "Modell"
        };
        ajax.getAjax('php/feldolgoz.php', adatok, data, kepeketFelvesz);

        const sablonElem = $(".galeria");
        var index = 4;
        sablonElem.remove();

        const balKep = $("#balkep");
        const foKep = $("#fokep");
        const jobbKep = $("#jobbkep");

        function kepeketFelvesz(adatok) {
            const balElem = sablonElem.clone().appendTo(balKep);

            const foElem = sablonElem.clone().appendTo(foKep);

            const jobbElem = sablonElem.clone().appendTo(jobbKep);

            const balGaleria = new Kep(balElem, adatok[index - 1]);
            const jobbGaleria = new Kep(jobbElem, adatok[index + 1]);
            const foGaleria = new Kep(foElem, adatok[index]);
            foGaleria.tablazatKiir(adatok[index]);

            $("#jobb").on("click", function () {
                index++;

                if (index === 10) {
                    index = 1;
                }
                if (index === 9) {
                    index = 0;
                }

                if (index === 0) {
                    balGaleria.kepBeallit(adatok[8]);
                } else {
                    balGaleria.kepBeallit(adatok[index - 1]);
                }
                foGaleria.kepBeallit(adatok[index]);
                foGaleria.tablazatKiir(adatok[index]);

                if (index === 8) {
                    index = -1;
                    jobbGaleria.kepBeallit(adatok[index + 1]);
                } else {
                    jobbGaleria.kepBeallit(adatok[index + 1]);
                }

            });

            $("#bal").on("click", function () {
                index--;
                if (index === -2) {
                    index = 7;
                }
                if (index === -1) {
                    index = 8;
                }

                if (index === 8) {
                    jobbGaleria.kepBeallit(adatok[0]);
                } else {
                    jobbGaleria.kepBeallit(adatok[index + 1]);
                }
                foGaleria.kepBeallit(adatok[index]);
                foGaleria.tablazatKiir(adatok[index]);

                if (index === 0) {
                    balGaleria.kepBeallit(adatok[8]);
                    index = 9;
                } else {
                    balGaleria.kepBeallit(adatok[index - 1]);
                }
            });
        }


    }
}

class Kep {
    constructor(elem, obj) {
        this.elem = elem;
        this.kep = this.elem.children("img");
        this.marka = this.elem.children(".marka");
        this.modell = this.elem.children(".modell");

        this.obj = obj;
        this.kepBeallit(this.obj);



    }

    kepBeallit(obj) {
        this.marka.html(obj.marka);
        this.modell.html(obj.modell);

        obj.szin = obj.szin.replace(new RegExp(/[û]/g), "ű");
        this.kep.attr("src", "kepek/" + obj.marka.substring(0, 2) + '/' + obj.modell + obj.kepElerese + obj.szin + "1.jpg");

    }

    tablazatKiir(obj) {
        $("#adatok").empty();
        $("#adatok").append("<th>Méret:</th>");
        $("#adatok").append("<td>" + obj.magassag + " cm</td>");
        $("#adatok").append("<td>" + obj.szelesseg + " cm</td>");
        $("#adatok").append("<td>" + obj.melyseg + " cm</td>");
        $("#adatok").append("<td>" + obj.urmertek + " l</td>");
        //$("#adatok").append("<td>" + obj.szin + "</td>");

        $(".szinek").empty();


        let szinek = [];
        const ajax = new Ajax();

        let data = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "Cikk c inner join Szin sz on c.szin = sz.szin",
            //where: "where modell like 'AIRCONIC SPINNER' and kepElerese like '/67-44.5-26-67/'",
            where: "where modell like '" + obj.modell + "' and kepElerese like '" + obj.kepElerese + "'",
            segedTabla: "Szin"
        };
        ajax.getAjax('php/feldolgoz.php', szinek, data, this.szineketMegjelenit);




    }
    szineketMegjelenit(szin) {
        for (var i = 0; i < szin.length; i++) {
            $(".szinek").append("<button class=gombok id=" + i + "></button>");
            $(".szinek button").eq(i).css("background-color", szin[i].szinKod);
        }

        let marka = $(".galeria .marka").eq(1).text();

        $(".gombok").on("click", function () {
            szin[this.id].szin = szin[this.id].szin.replace(new RegExp(/[û]/g), "ű");
            $("#fokep img").attr("src", "kepek/" + marka.substring(0, 2) + '/' + szin[this.id].modell + szin[this.id].kepElerese + szin[this.id].szin + "1.jpg");
            console.log("kepek/" + marka.substring(0, 2) + '/' + szin[this.id].modell + szin[this.id].kepElerese + szin[this.id].szin + "1.jpg");
   
        });
    }
}