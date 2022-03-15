$(function () {
    
    let rendelesek = [];
    adminRendeles();
    
    
    
    
    
    $("#rendelesSzerk").on("click", (event) => {
        adminRendeles();
    });

    $("#borondokSzerk").on("click", (event) => {
        console.log("asd");
    });
    
    
    
    
   function adminRendeles() {
        const ajax = new Ajax();

        rendelesek = [];
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "where r.rstatusz=1",
            segedTabla: "Cim"
        };
        ajax.getAjax('../feldolgoz.php', rendelesek, data, megjelenites);
        $("#adottRendelesek").empty();
    };
    
    
    function megjelenites(rendelesek) {

        let nincsGomb = false;
        let tablazat = "";
        let oszlopok = ["felhasznalonev", "rend_szam", "varos", "fizetesiosszeg", "fizetesimod", "telefonszam"];

        tablazat += "<table class=rendelesekTablazat>";
        tablazat += "<tr>";
        for (var i = 0; i < oszlopok.length; i++) {
            tablazat += "<th>" + oszlopok[i] + "</th>";
        }
        tablazat += "</tr>";
        if (rendelesek.length === 0) {
            nincsGomb = true;
        }
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
    