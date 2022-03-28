class AdminBeszerzes {
    constructor() {

        const ajax = new Ajax();
        let beszerzes = [];
        let data = {
            mit: "*",
            tablaNeve: "Beszerzes",
            honnan: "",
            where: "",
            segedTabla: ""
        };
        ajax.selectAjax('../api/Select.php', beszerzes, data, this.megjelenit);


    }

    megjelenit(beszerzes) {
        let tablazat = "<p>Jelenleg nincs visszaküldött bőrönd!</p>";
        if (beszerzes.length !== 0) {
            tablazat = "<table class=beszerzesekTablazat>";
            tablazat += "<tr><th>Cikkszám</th>";
            tablazat += "<th>Darabszám</th></tr>";
            for (var i = 0; i < beszerzes.length; i++) {
                tablazat += "<tr>";
                tablazat += "<td>" + beszerzes[i].cikkszam + "</td>";
                tablazat += "<td>" + beszerzes[i].darabszam + "</td>";
                tablazat += "<td><button class=jovahagyas id=" + i + ">Jóváhagyás</button></td>";
                tablazat += "</tr>";
            }
            tablazat += "</table>";
        }

        $("#borondSzerkesztes").html(tablazat);

        $(".jovahagyas").on("click", (event) => {
            let esemeny = new CustomEvent("jovahagyas", {detail: beszerzes[event.target.id]});
            window.dispatchEvent(esemeny);
        });
    }
}
class AdminRendeles {
    constructor() {
        const ajax = new Ajax();

        let rendelesek = [];
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: "Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "where r.rstatusz=1",
            segedTabla: "Cim"
        };
        ajax.selectAjax('../api/Select.php', rendelesek, data, this.megjelenit);

    }

    megjelenit(rendelesek) {
        let tablazat = "<p>Jelenleg nincs beérkezett rendelés!</p>";
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
                tablazat += "<tr>";
                for (var i = 1; i < oszlopok.length; i += 2) {
                    for (var item in rendelesek[index]) {
                        if (oszlopok[i] === item) {
                            tablazat += "<td>" + rendelesek[index][item] + "</td>";
                        }
                    }
                }
                tablazat += "<td><button class=kivalasztGomb id=" + index + ">Kiválasztás</button></td>";
                tablazat += "</tr>";
            }
            tablazat += "</table>";
        }

        $("#csomagRendelesek").html(tablazat);
        
        let kivalasztasKiir = "";
        kivalasztasKiir += "<div id=kivalasztott>";
        kivalasztasKiir += "<p id=kivRendszam>Kiválasztott rendszám:</p>";
        kivalasztasKiir += "<button class=osszecsomagol>Összecsomagolva!</button>";
        kivalasztasKiir += "</div>";
        $("#csomagRendelesek").append(kivalasztasKiir);
        $(".osszecsomagol").attr("disabled", true);
        let id = 0;
        
        $(".kivalasztGomb").on("click", (event) => {
            id = event.target.id;
            $(".osszecsomagol").attr("disabled", false);
            $("#kivRendszam").html("Kiválasztott rendszám: " + rendelesek[id].rend_szam);
        });
        
        $(".osszecsomagol").on("click", (event) => {
            let esemeny = new CustomEvent("csomagol", {detail: rendelesek[id].rend_szam});
            window.dispatchEvent(esemeny);
        });
        
    }
}