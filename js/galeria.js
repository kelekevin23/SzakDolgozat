class Galeria {
    constructor() {

        let adatok = [];

        $.ajax(
                {
                    url: "top10.json",
                    success: function (result) {

                        result.forEach((value) => {
                            adatok.push(value);
                        });
                        console.log(adatok);
                        kepeketFelvesz(adatok);
                    }
                }
        );

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

        this.obj = obj;
        this.kepBeallit(this.obj);

    }

    kepBeallit(obj) {
        this.marka.html(obj.marka);

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
        for (var i = 0; i < obj.szinek; i++) {
            $(".szinek").append("<button id=" + i + "></button>");
            $(".szinek button").eq(i).css("background-color", "blue");
        }
    }
}