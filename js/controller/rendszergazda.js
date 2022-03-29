$(function () {

    const ajax = new Ajax();

    let adatok = [];
    let indexLapozas = 0;
    let lapozId = 1;

    new RendszergazdaFelhasznalok();
    $(".rendszerGazdaRendelesek").hide();
    $(".rendszerGazdaBorondok").hide();

    $("#rendelesSzerk").on("click", function () {
        $(".rendszerGazdaBorondok").hide();
        $(".rendszerGazdaFelhasznalok").hide();
        $(".rendszerGazdaRendelesek").show();
        new RendszergazdaRendeles();
    });

    $("#borondokSzerk").on("click", function () {
        $(".rendszerGazdaRendelesek").hide();
        $(".rendszerGazdaFelhasznalok").hide();
        $(".rendszerGazdaBorondok").show();
        new RendszergazdaBorond();
    });
    $("#felhasznSzerk").on("click", function () {
        $(".rendszerGazdaRendelesek").hide();
        $(".rendszerGazdaBorondok").hide();
        $(".rendszerGazdaFelhasznalok").show();
        new RendszergazdaFelhasznalok();
    });
    $(window).on("torles", (event) => {
        console.log(event.detail);
        let data = {
            tablaNeve: "Felhasznalok",
            where: "felhasznalonev = '" + event.detail.felhasznalonev + "'"
        };
        ajax.deleteAjax("../api/Delete.php", data);
        new RendszergazdaFelhasznalok();
    });
    $(window).on("veglegesites", (event) => {
        let ujAdatok = [];
        let rendben = true;
        for (var i = 0; i < 6; i++) {
            ujAdatok.push($(".adat" + i).val());
            if ($(".adat" + i).val() === "") {
                rendben = false;
            }
        }
        if (ujAdatok[4].length === 32) {
            if (event.detail[4] !== ujAdatok[4]) {
                ujAdatok[4] = calcMD5(ujAdatok[4]);
            }
        } else {
            if (event.detail[4] !== calcMD5(ujAdatok[4])) {
                ujAdatok[4] = calcMD5(ujAdatok[4]);
            } else {
                ujAdatok[4] = event.detail[4];
            }
        }
        let data = {
            tablaNeve: "Felhasznalok",
            ujErtekek:
                    "vezeteknev = '" + ujAdatok[1] + "'," +
                    "keresztnev = '" + ujAdatok[2] + "', " +
                    "email = '" + ujAdatok[3] + "', " +
                    "jelszo = '" + ujAdatok[4] + "', " +
                    "fstatusz = '" + ujAdatok[5] + "'",
            where: "felhasznalonev = '" + ujAdatok[0] + "'"
        };
        if (rendben) {
            ajax.updateAjax("../api/Update.php", data);
            new RendszergazdaFelhasznalok();
        }
    });

    $("#keresCikk").keyup(function () {
        let szoveg = $("#keresCikk").val();
        adatok = [];
        let data = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "",
            where: "where cikkszam like '%" + szoveg + "%' and cikkszam not in (select cikkszam from Rend_tetel)",
            segedTabla: ""

        };
        ajax.selectAjax('../api/Select.php', adatok, data, borondokMegjelenites);
    });

    function borondokMegjelenites(adatok) {
        console.log(adatok);
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
                    tablazat += "<td><button class=modositas id=" + szamlalo + " onclick='return false'>Módosítás</button></td>";
                    tablazat += "<td><button type=submit name=torlesBorond class=torles value=" + index + " >Törlés</button></td>";
                    tablazat += "</tr>";
                }
                szamlalo++;
            }
            tablazat += "</table>";

            lapozasBorondok(adatok);
        }

        $("#borondok").append(tablazat);

        $(".borondokTablazat tr th").on("click", (event) => {
            let azon = parseInt(event.target.id);
            let rendez = "";
            if (azon === 0) {
                rendez = "order by cikkszam";
            } else if (azon === 2) {
                rendez = "order by ar";
            } else if (azon === 4) {
                rendez = "order by keszlet";
            }
            let szoveg = $("#keresCikk").val();
            let where = "";
            if (szoveg === "") {
                where = "where cikkszam not in (select cikkszam from Rend_tetel) " + rendez;
            } else {
                where = "where cikkszam like '%" + szoveg + "%' and cikkszam not in (select cikkszam from Rend_tetel) " + rendez;
            }
            adatok = [];
            let data = {
                mit: "*",
                tablaNeve: "Cikk",
                honnan: "",
                where: where,
                segedTabla: ""

            };
            ajax.selectAjax('../api/Select.php', adatok, data, borondokMegjelenites);
        });
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
                    modosit += "<td><input type=hidden name=adatNev" + i + " value=" + oszlopok[i] + "><input type=text id=" + oszlopok[i] + " name=adat" + i + " value=" + modositando[i] + " readonly></td>";
                } else {
                    modosit += "<td><input type=hidden name=adatNev" + i + " value=" + oszlopok[i] + "><input type=text id=" + oszlopok[i] + " name=adat" + i + " value=" + modositando[i] + "></td>";

                }
            }
            modosit += "<td><button type=submit name=veglegesitesBorond>Véglegesítés</button></td>";
            modosit += "<td><button class=megse onclick='return false'>Mégse</button></td>";

            $(".borondokTablazat tr:nth(" + index + ")").html(modosit);
            $(".borondokTablazat tr:nth(" + index + ")").css("background-color", "lightblue");

            $(".megse").on("click", (event) => {
                borondokMegjelenites(adatok);
            });
        });



    }

    function lapozasBorondok(adatok) {
        let szam = adatok.length / 15;
        let maradek = adatok.length % 10;
        let emeles = 1;

        if (maradek > 0) {
            emeles = 2;
        }
        $("#borondok").append("<div class=lapoz></div>");
        for (var i = 1; i < Math.trunc(szam) + emeles; i++) {
            $("#borondok .lapoz").append("<button class=lapozElem id=" + i + ">" + i + "</button>");
        }
        $('.lapozElem').eq(lapozId - 1).css("background-color", "white");
        $('.lapozElem').eq(lapozId - 1).css("color", "brown");

        $('.lapozElem').on('click', function () {
            let id = this.id;
            indexLapozas = (id * 15) - 15;
            borondokMegjelenites(adatok);

        });
        $(".lapozElem").click(function () {
            $('.lapozElem').eq(lapozId - 1).css("background-color", "brown");
            $('.lapozElem').eq(lapozId - 1).css("color", "white");
            lapozId = this.id;
            $('.lapozElem').eq(lapozId - 1).css("background-color", "white");
            $('.lapozElem').eq(lapozId - 1).css("color", "brown");
        });
    }

});

