class FutarElerheto {
    constructor() {
        const ajax = new Ajax();
        let futarElerheto = [];
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "where r.rstatusz=2",
            segedTabla: "Cim"
        };
        ajax.selectAjax('../api/Select.php', futarElerheto, data, megjelenit);
    }
}

class FutarSajat {
    constructor(nev) {
        const ajax = new Ajax();
        let futarSajat = [];
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "where r.kiszallito like '" + nev + "' and rstatusz = 3",
            segedTabla: "Cim"
        };
        ajax.selectAjax('../api/Select.php', futarSajat, data, megjelenit);

    }
}


function megjelenit(rendelesek) {
    let nincsGomb = false;
    let tablazat = "";
    let oszlopok = [
        "Felhasználónév", "felhasznalonev",
        "Rendelési szám", "rend_szam",
        "Város", "varos",
        "Fizetési összeg (forint)", "fizetesiosszeg",
        "Fizetési mód", "fizetesimod",
        "Telefonszám", "telefonszam"];

    if (rendelesek.length !== 0) {
        tablazat = "<table class=rendelesekTablazat>";
        tablazat += "<tr>";
        for (var i = 0; i < oszlopok.length; i += 2) {
            tablazat += "<th>" + oszlopok[i] + "</th>";
        }
        tablazat += "</tr>";
        for (var index = 0; index < rendelesek.length; index++) {
            if (rendelesek[index].kiszallito !== "") {
                nincsGomb = true;
            }
            tablazat += "<tr>";
            for (var i = 1; i < oszlopok.length; i += 2) {
                for (var item in rendelesek[index]) {
                    if (oszlopok[i] === item) {
                        tablazat += "<td>" + rendelesek[index][item] + "</td>";
                    }
                }
            }

            if (!nincsGomb) {
                $("#kivalasztott").show();
                tablazat += "<td><button class=kivalasztGomb id=" + index + ">Kiválasztás</button></td>";
            } else {
                $("#kivalasztott").hide();
            }
            tablazat += "</tr>";
        }
        tablazat += "</table>";

    } else {
        nincsGomb = true;
    }
    $("#adottRendelesek").html(tablazat);
    let kivalasztasKiir = "";
    
    kivalasztasKiir += "<div id=kivalasztott>";
    kivalasztasKiir += "<p id=kivRendszam>Kiválasztott rendszám:</p>";
    kivalasztasKiir += "<button class=magamhozVeszem>Magamhoz veszem!</button>";
    kivalasztasKiir += "</div>";
    $("#adottRendelesek").append(kivalasztasKiir);

    if (nincsGomb) {
        $("#kivalasztott").hide();
    }

    $(".magamhozVeszem").attr("disabled", true);
    let id = 0;
    $(".kivalasztGomb").on("click", (event) => {
        id = event.target.id;
        $(".magamhozVeszem").attr("disabled", false);
        $("#kivRendszam").html("Kiválasztott rendszám: " + rendelesek[id].rend_szam);
    });

    $(".magamhozVeszem").on("click", (event) => {
        let esemeny = new CustomEvent("atVetel", {detail: rendelesek[id].rend_szam});
        window.dispatchEvent(esemeny);
    });

}