class RendszergazdaRendeles {
    constructor() {

        const ajax = new Ajax();
        let adatok = [];
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "",
            segedTabla: "Cim"
        };
        ajax.selectAjax('../api/Select.php', adatok, data, this.rendelesMegjelenites);
    }
    rendelesMegjelenites() {

    }
}

class RendszergazdaBorond {
    constructor(data) {

        const ajax = new Ajax();
        let adatok = [];
        ajax.selectAjax('../api/Select.php', adatok, data, borondokMegjelenites);

        let indexLapozas = 0;

        function borondokMegjelenites(adatok) {
            console.log(adatok.length);
            $("#borondok").empty();
            let tablazat = "";
            let oszlopok = ["cikkszam", "ar", "keszlet"];
            let oszlopokSzoveg = ["Cikkszám", "", "Ár", " Forint", "Készlet", " darab"];

            if (adatok.length !== 0) {
                tablazat = "<form method=post><table class=borondokTablazat>";
                tablazat += "<tr>";
                for (var i = 0; i < oszlopokSzoveg.length; i += 2) {
                    tablazat += "<th id=" + i + ">" + oszlopokSzoveg[i] + "</th>";
                }
                tablazat += "</tr>";


                let szamlalo = 0;
                for (var index = indexLapozas; index < indexLapozas + 15; index++) {
                    if (index < adatok.length) {
                        tablazat += "<tr>";
                        for (var i = 0; i < oszlopok.length; i++) {
                            for (var item in adatok[index]) {
                                if (oszlopok[i] === item) {
                                    if (item === "cikkszam") {
                                        tablazat += "<td><input type=hidden name=cikkszam" + index + " value=" + adatok[index][item] + ">" + adatok[index][item] + oszlopokSzoveg[i * 2 + 1 ] + "</td>";
                                    } else {
                                        tablazat += "<td>" + adatok[index][item] + oszlopokSzoveg[i * 2 + 1 ] + "</td>";
                                    }
                                }
                            }
                        }
                        tablazat += "<td><button class=modositas id=" + szamlalo + ">Módosítás</button></td>";
                        tablazat += "<td><button class=torles id=" + szamlalo + ">Törlés</button></td>";
                        tablazat += "</tr>";
                    }
                    szamlalo++;
                }
                tablazat += "</table>";

                // lapozasBorondok(adatok);
            }

            $("#borondok").append(tablazat);
            $(".borondokTablazat").on('click', '.modositas', function () {
                borondokMegjelenites(adatok);
                $(".torles").attr('disabled', true);
                //$(".modositas").attr('disabled', true);
                let modositando = [];

                var jelenlegiSor = $(this).closest("tr");
                let index = parseInt(this.id) + 1;

                for (var i = 0; i < 3; i++) {
                    modositando.push(jelenlegiSor.find("td:eq(" + i + ")").text());
                }

                let modosit = "";
                for (var i = 0; i < modositando.length; i++) {
                    if (i === 0) {
                        modosit += "<td><input type=text id=" + oszlopok[i] + " name=adat" + i + " value=" + modositando[i] + " readonly></td>";
                    } else {
                        modosit += "<td><input type=text id=" + oszlopok[i] + " name=adat" + i + " value=" + modositando[i] + "></td>";

                    }
                }
                modosit += "<td><button class=veglegesites id=" + index + ">Véglegesítés</button></td>";
                modosit += "<td><button class=megse>Mégse</button></td>";

                $(".borondokTablazat tr:nth(" + index + ")").html(modosit);
                $(".borondokTablazat tr:nth(" + index + ")").css("background-color", "lightblue");

                $(".megse").on("click", function () {
                    borondokMegjelenites(adatok);
                });
                $(".veglegesites").on("click", (event) => {
                    let esemeny = new CustomEvent("felhasznVeglegesites", {detail: modositando});
                    window.dispatchEvent(esemeny);
                });
            });

            $(".borondokTablazat tr th").on("click", (event) => {
                let esemeny = new CustomEvent("borondRendezes", {detail: event.target.id});
                window.dispatchEvent(esemeny);
            });
        }
    }
}


class RendszergazdaFelhasznalok {
    constructor() {
        const ajax = new Ajax();
        let adatok = [];
        let data = {
            mit: "*",
            tablaNeve: "Felhasznalok",
            honnan: "",
            where: "",
            segedTabla: ""
        };
        ajax.selectAjax('../api/Select.php', adatok, data, felhasznalokMegjelenites);


        function felhasznalokMegjelenites(adatok) {
            let tablazat = "";
            let oszlopok = [
                "Felhasználónév", "felhasznalonev",
                "Vezetéknév", "vezeteknev",
                "Keresztnév", "keresztnev",
                "Email", "email",
                "Jelszó", "jelszo",
                "Státusz", "fstatusz"];
            if (adatok.length !== 0) {
                tablazat = "<table class=felhasznalokTablazat>";
                tablazat += "<tr>";
                for (var i = 0; i < oszlopok.length; i += 2) {
                    tablazat += "<th>" + oszlopok[i] + "</th>";
                }
                tablazat += "</tr>";
                for (var index = 0; index < adatok.length; index++) {
                    tablazat += "<tr>";
                    for (var i = 1; i < oszlopok.length; i += 2) {
                        for (var item in adatok[index]) {
                            if (oszlopok[i] === item) {
                                tablazat += "<td>" + adatok[index][item] + "</td>";

                            }
                        }
                    }
                    tablazat += "<td><button class=modositas id=" + index + " >Módosítás</button></td>";
                    tablazat += "<td><button class=torles id=" + index + " >Törlés</button></td>";
                    tablazat += "</tr>";
                }
                tablazat += "</table>";
            }
            $("#felhasznalok").html(tablazat);

            $(".torles").on("click", (event) => {
                let esemeny = new CustomEvent("felhasznTorles", {detail: adatok[event.target.id]});
                window.dispatchEvent(esemeny);
            });

            $(".felhasznalokTablazat").on('click', '.modositas', function () {
                felhasznalokMegjelenites(adatok);
                $(".torles").attr('disabled', true);
                //$(".modositas").attr('disabled', true);
                let modositando = [];
                let jelenlegiSor = $(this).closest("tr");
                let index = parseInt(this.id) + 1;

                for (var i = 0; i < 6; i++) {
                    modositando.push(jelenlegiSor.find("td:eq(" + i + ")").text());
                }

                let modosit = "";
                for (var i = 0; i < modositando.length; i++) {
                    if (i === 0) {
                        modosit += "<td><input type=text id=" + oszlopok[i * 2 + 1] + " class=adat" + i + " value=" + modositando[i] + " readonly></td>";
                    } else {
                        modosit += "<td><input type=text id=" + oszlopok[i * 2 + 1] + " class=adat" + i + " value=" + modositando[i] + "></td>";

                    }
                }
                modosit += "<td><button class=veglegesites id=" + index + ">Véglegesítés</button></td>";
                modosit += "<td><button class=megse>Mégse</button></td>";

                $(".felhasznalokTablazat tr:nth(" + index + ")").html(modosit);
                $(".felhasznalokTablazat tr:nth(" + index + ")").css("background-color", "lightblue");

                $(".megse").on("click", function () {
                    felhasznalokMegjelenites(adatok);
                });

                $(".veglegesites").on("click", (event) => {
                    let esemeny = new CustomEvent("felhasznVeglegesites", {detail: modositando});
                    window.dispatchEvent(esemeny);
                });

            });
        }
    }
}