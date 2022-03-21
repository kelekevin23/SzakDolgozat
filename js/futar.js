$(function () {

    const ajax = new Ajax();
    let rendelesek = [];
    let tablazat = "";
    elerhetoRendeles();

    let szoveg = $("#panel p").html();
    let nev = "";
    let most = false;

    for (var i = 0; i < szoveg.length; i++) {
        if (most) {
            nev += szoveg[i];
        }
        if (szoveg[i] === " ") {
            most = true;
        }
    }

    $("#elerRend").on("click", (event) => {
        elerhetoRendeles();
    });

    $("#sajatRend").on("click", (event) => {
        sajatRendeles();
    });

    function elerhetoRendeles() {
        rendelesek = [];
        tablazat = "<p>Jelenleg nincs elérhető rendelés!</p>";
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "where r.rstatusz=2",
            segedTabla: "Cim"
        };
        ajax.getAjax('../feldolgoz.php', rendelesek, data, megjelenites);
    }

    function sajatRendeles() {
        rendelesek = [];
        tablazat = "<p>Jelenleg nincs saját rendelésed!</p>";
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "where r.kiszallito like '" + nev + "' and rstatusz = 3",
            segedTabla: "Cim"
        };
        ajax.getAjax('../feldolgoz.php', rendelesek, data, megjelenites);
    }

    function megjelenites(rendelesek) {

        let nincsGomb = false;
        let oszlopok = ["felhasznalonev", "rend_szam", "varos", "fizetesiosszeg", "fizetesimod", "telefonszam"];
        let oszlopokSzoveg = ["Felhasználónév", "Rendelési szám", "Város", "Fizetési összeg (forint)", "Fizetési mód", "Telefonszám"];

        if (rendelesek.length !== 0) {


            tablazat = "<table class=rendelesekTablazat>";
            tablazat += "<tr>";
            for (var i = 0; i < oszlopokSzoveg.length; i++) {
                tablazat += "<th>" + oszlopokSzoveg[i] + "</th>";
            }
            tablazat += "</tr>";
            for (var index = 0; index < rendelesek.length; index++) {
                if (rendelesek[index].kiszallito !== "") {
                    nincsGomb = true;
                }
                tablazat += "<tr>";
                for (var i = 0; i < oszlopok.length; i++) {
                    for (var item in rendelesek[index]) {
                        if (oszlopok[i] === item) {
                            tablazat += "<td>" + rendelesek[index][item] + "</td>";
                        }
                    }
                }
                if (!nincsGomb) {
                    $("#kivalasztott").show();
                    tablazat += "<td><button class=kivalasztasGomb id=" + index + ">Kiválasztás</button></td>";
                } else {
                    $("#kivalasztott").hide();
                }
                tablazat += "</tr>";
            }
            tablazat += "</table>";
        } else{
            nincsGomb = true;
        }

        $("#adottRendelesek").html(tablazat);
        if (nincsGomb) {
            $("#kivalasztott").hide();
        }
        $(".kivalasztasGomb").on("click", (event) => {
            let id = $(event.target).attr("id");
            let rendszam = rendelesek[id].rend_szam;
            $("#rendszam").val(rendszam);
        });
    }
});