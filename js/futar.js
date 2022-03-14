$(function () {


    const ajax = new Ajax();

    let rendelesek = [];
    let data = {
        mit: "*",
        tablaNeve: "Rendeles",
        honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
        where: "where r.rstatusz=2",
        segedTabla: "Cim"
    };
    ajax.getAjax('../feldolgoz.php', rendelesek, data, megjelenites);

    $("#elerhetoRendelesek").empty();

    function megjelenites(rendelesek) {
        let tablazat = "";
        let oszlopok = ["felhasznalonev", "rend_szam", "varos", "fizetesiosszeg", "fizetesimod", "telefonszam"];

        tablazat += "<table class=rendelesekTablazat>";
        tablazat += "<tr>";
        for (var i = 0; i < oszlopok.length; i++) {
            tablazat += "<th>" + oszlopok[i] + "</th>";
        }
        tablazat += "</tr>";

        for (var index = 0; index < rendelesek.length; index++) {
            tablazat += "<tr>";
            for (var i = 0; i < oszlopok.length; i++) {
                for (var item in rendelesek[index]) {
                    if (oszlopok[i] === item) {
                        // console.log(rendelesek[index][item]);
                        tablazat += "<td>" + rendelesek[index][item] + "</td>";
                    }
                }
            }
            tablazat += "<td><button class=kivalasztasGomb id=" + index + ">Kiválasztás</button></td>";
            tablazat += "</tr>";
        }
        tablazat += "</table>";

        $("#elerhetoRendelesek").html(tablazat);

        $(".kivalasztasGomb").on("click", (event) => {
            let id = $(event.target).attr("id");
            let rendszam = rendelesek[id].rend_szam;
            $("#rendszam").val(rendszam);
        });
    }




});