class Galeria {
    constructor() {



        let adatok = [];
        $.ajax(
                {
                    url: "js/adatok.json",
                    success: function (result) {
                        result.borondok.forEach((value) => {
                            adatok.push(value);
                        });
                        kepeketFelvesz(adatok);
                    }
                }
        );


        const sablonElem = $(".galeria");

        var index = 4;
        console.log(index);
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

                if (index === 10){
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
                /*
                 if (index === -1) {
                 index = 8;
                 }
                 if (index === 0) {
                 index = 9;
                 }
                 console.log("index: " + index);
                 if (index === 9) {
                 balGaleria.kepBeallit(adatok[index]);
                 console.log(index);
                 } else {
                 balGaleria.kepBeallit(adatok[Math.abs(index - 10) - 1]);
                 console.log(Math.abs(index - 10) - 1);
                 }
                 
                 foGaleria.kepBeallit(adatok[Math.abs(index - 10)]);
                 console.log(Math.abs(index - 10));
                 
                 if (index === 1) {
                 jobbGaleria.kepBeallit(adatok[index]);
                 console.log(index);
                 index = 10;
                 } else {
                 jobbGaleria.kepBeallit(adatok[Math.abs(index - 10) + 1]);
                 console.log(Math.abs(index - 10) + 1);
                 }
                 */
            });

            $("#bal").on("click", function () {
                index--;
                if (index === -2){
                    index = 7;
                }
                if (index === -1){
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



                /*
                 if (index === 11) {
                 index = 2;
                 }
                 if (index === 10) {
                 index = 1;
                 }
                 console.log("index: " + index);
                 if (index === 1) {
                 jobbGaleria.kepBeallit(adatok[index]);
                 console.log(index);
                 } else {
                 jobbGaleria.kepBeallit(adatok[Math.abs(index - 10) + 1]);
                 console.log(Math.abs(index - 10) + 1);
                 }
                 
                 foGaleria.kepBeallit(adatok[Math.abs(index - 10)]);
                 console.log(Math.abs(index - 10));
                 
                 if (index === 9) {
                 balGaleria.kepBeallit(adatok[index]);
                 console.log(index);
                 index = 0;
                 } else {
                 balGaleria.kepBeallit(adatok[Math.abs(index - 10) - 1]);
                 console.log(Math.abs(index - 10) - 1);
                 }
                 */

            });
        }


    }
}


class Kep {
    constructor(elem, obj) {

        //console.log(obj);
        this.elem = elem;
        this.kep = this.elem.children("img");

        this.obj = obj;
        this.kepBeallit(this.obj);
       
        //console.log(obj.eleres);

    }

    kepBeallit(obj) {
        this.kep.attr("src", obj.eleres);
    }
    tablazatKiir(obj) {
        $("#adatok").empty();
        $("#adatok").append("<th>Méret:</th>");
        $("#adatok").append("<td>" + obj.magassag + " cm</td>");
        $("#adatok").append("<td>" + obj.szelesseg + " cm</td>");
        $("#adatok").append("<td>" + obj.melyseg + " cm</td>");
        $("#adatok").append("<td>" + obj.urmertek + " l</td>");
        
        $(".szinek").empty();
        for (var i = 0; i < obj.szinek; i++) {
            $(".szinek").append("<button id="+i+"></button>");
            $(".szinek button").eq(i).css("background-color", "blue")
            
        }
    }
}