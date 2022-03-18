$(function () {

    let rendelesek = [];
    let beszerzes = [];
    const ajax = new Ajax();

    let kezdes = localStorage.getItem("allapot");

    if (kezdes === "adminRendeles") {
        adminRendeles();
    } else if (kezdes === "adminBorondok") {
        adminBorondok();
    } else {
        adminRendeles();
    }


    $("#rendelesSzerk").on("click", (event) => {

        adminRendeles();
    });

    $("#borondokSzerk").on("click", (event) => {

        adminBorondok();
    });

    function adminRendeles() {
        $(".borondBeszerzes").hide();
        $(".rendelesStatusz").show();

        localStorage.setItem("allapot", "adminRendeles");
        rendelesek = [];
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "where r.rstatusz=1",
            segedTabla: "Cim"
        };
        ajax.getAjax('../feldolgoz.php', rendelesek, data, rendelesMegjelenites);
    }

    function adminBorondok() {
        $(".rendelesStatusz").hide();
        $(".borondBeszerzes").show();

        localStorage.setItem("allapot", "adminBorondok");
        beszerzes = [];
        let data = {
            mit: "*",
            tablaNeve: "Beszerzes",
            honnan: "",
            where: "",
            segedTabla: ""
        };
        ajax.getAjax('../feldolgoz.php', beszerzes, data, beszerzesMegjelenites);
    }
    function beszerzesMegjelenites(beszerzes) {
        console.log(beszerzes);
        let tablazat = "";
        let oszlopokSzoveg = ["Id", "Cikkszám", "Darabszám"];

        tablazat += "<form method=post><table class=beszerzesekTablazat>";
        tablazat += "<tr>";
        for (var i = 0; i < oszlopokSzoveg.length; i++) {
            tablazat += "<th>" + oszlopokSzoveg[i] + "</th>";
        }
        tablazat += "</tr>";
        for (var index = 0; index < beszerzes.length; index++) {
            tablazat += "<tr>";
            tablazat += "<td><input type=hidden name=id" + index + " value=" + beszerzes[index].id + ">" + beszerzes[index].id + "</td>";
            tablazat += "<td><input type=hidden name=cikkszam" + index + " value=" + beszerzes[index].cikkszam + ">" + beszerzes[index].cikkszam + "</td>";
            tablazat += "<td><input type=hidden name=darabszam" + index + " value=" + beszerzes[index].darabszam + ">" + beszerzes[index].darabszam + "</td>";
            tablazat += "<td><button type=submit name=szerkesztes value=" + index + ">Jóváhagyás</button></td>";
            tablazat += "</tr>";
        }
        tablazat += "</table>";


        $("#borondSzerkesztes").html(tablazat);
    }





    function rendelesMegjelenites(rendelesek) {
        console.log(rendelesek);
        let tablazat = "";
        let oszlopok = ["felhasznalonev", "rend_szam", "varos", "fizetesiosszeg", "fizetesimod", "telefonszam"];
        let oszlopokSzoveg = ["Felhasználónév", "Rendelési szám", "Város", "Fizetési összeg (forint)", "Fizetési mód", "Telefonszám"];

        tablazat += "<table class=rendelesekTablazat>";
        tablazat += "<tr>";
        for (var i = 0; i < oszlopokSzoveg.length; i++) {
            tablazat += "<th>" + oszlopokSzoveg[i] + "</th>";
        }
        tablazat += "</tr>";
        for (var index = 0; index < rendelesek.length; index++) {
            tablazat += "<tr>";
            for (var i = 0; i < oszlopok.length; i++) {
                for (var item in rendelesek[index]) {
                    if (oszlopok[i] === item) {
                        tablazat += "<td>" + rendelesek[index][item] + "</td>";
                    }
                }
            }
            tablazat += "<td><button class=kivalasztasGomb id=" + index + ">Kiválasztás</button></td>";

            tablazat += "</tr>";
        }
        tablazat += "</table>";


        $("#csomagRendelesek").html(tablazat);

        $(".kivalasztasGomb").on("click", (event) => {
            let id = $(event.target).attr("id");
            let rendszam = rendelesek[id].rend_szam;
            $("#rendszam").val(rendszam);
        });
    }
});
    