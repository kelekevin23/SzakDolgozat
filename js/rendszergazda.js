$(function () {

    const ajax = new Ajax();

    let adatok = [];
    let indexLapozas = 0;
    let lapozId = 1;
    let kezdes = localStorage.getItem("allapot");

    if (kezdes === "rendelesek") {
        rendelesek();
    } else if (kezdes === "borondok") {
        borondok();
    } else if (kezdes === "felhasznalok") {
        felhasznalok();
    } else {
        borondok();
    }

    $("#rendelesSzerk").on("click", (event) => {
        rendelesek();
    });

    $("#borondokSzerk").on("click", (event) => {
        borondok();
    });
    $("#felhasznSzerk").on("click", (event) => {
        felhasznalok();
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
        ajax.getAjax('../feldolgoz.php', adatok, data, borondokMegjelenites);
    });


    function rendelesek() {
        $(".rendszerGazdaBorondok").hide();
        $(".rendszerGazdaFelhasznalok").hide();
        $(".rendszerGazdaRendelesek").show();

        localStorage.setItem("allapot", "rendelesek");
        adatok = [];
        let data = {
            mit: "*",
            tablaNeve: "Rendeles",
            honnan: " Rendeles r inner join Cim c on r.szamlcim = c.id",
            where: "",
            segedTabla: "Cim"
        };
        ajax.getAjax('../feldolgoz.php', adatok, data, rendelesMegjelenites);
    }
    function borondok() {
        $(".rendszerGazdaRendelesek").hide();
        $(".rendszerGazdaFelhasznalok").hide();
        $(".rendszerGazdaBorondok").show();

        localStorage.setItem("allapot", "borondok");
        adatok = [];
        let data = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "",
            where: "where cikkszam not in (select cikkszam from Rend_tetel)",
            segedTabla: ""

        };
        ajax.getAjax('../feldolgoz.php', adatok, data, borondokMegjelenites);
    }
    
    function felhasznalok() {
        $(".rendszerGazdaRendelesek").hide();
        $(".rendszerGazdaBorondok").hide();
        $(".rendszerGazdaFelhasznalok").show();

        localStorage.setItem("allapot", "felhasznalok");
        adatok = [];
        let data = {
            mit: "*",
            tablaNeve: "Felhasznalok",
            honnan: "",
            where: "",
            segedTabla: ""
        };
        ajax.getAjax('../feldolgoz.php', adatok, data, felhasznalokMegjelenites);
    }

    function rendelesMegjelenites(adatok) {
        // console.log(adatok);
    }

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
            ajax.getAjax('../feldolgoz.php', adatok, data, borondokMegjelenites);
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

    function felhasznalokMegjelenites(adatok) {
        let tablazat = "";

        let oszlopok = ["felhasznalonev", "vezeteknev", "keresztnev", "email", "jelszo", "fstatusz"];
        let oszlopokSzoveg = ["Felhasználónév", "Vezetéknév", "Keresztnév", "Email", "Jelszó", "Státusz"];

        if (adatok.length !== 0) {
            tablazat = "<form method=post><table class=felhasznalokTablazat>";
            tablazat += "<tr>";
            for (var i = 0; i < oszlopokSzoveg.length; i++) {
                tablazat += "<th>" + oszlopokSzoveg[i] + "</th>";
            }
            tablazat += "</tr>";
            for (var index = 0; index < adatok.length; index++) {
                tablazat += "<tr>";
                for (var i = 0; i < oszlopok.length; i++) {
                    for (var item in adatok[index]) {
                        if (oszlopok[i] === item) {
                            if (item === "felhasznalonev") {
                                tablazat += "<td><input type=hidden name=fnev" + index + " value=" + adatok[index][item] + ">" + adatok[index][item] + "</td>";
                            } else {
                                tablazat += "<td>" + adatok[index][item] + "</td>";
                            }
                        }
                    }
                }
                tablazat += "<td><button class=modositas id=" + index + " onclick='return false'>Módosítás</button></td>";
                tablazat += "<td><button type=submit name=torles class=torles value=" + index + " >Törlés</button></td>";
                tablazat += "</tr>";
            }
            tablazat += "</table>";
        }

        $("#felhasznalok").html(tablazat);
        $(".felhasznalokTablazat").on('click', '.modositas', function () {
            felhasznalokMegjelenites(adatok);
            $(".torles").attr('disabled', true);
            //$(".modositas").attr('disabled', true);
            let modositando = [];

            var jelenlegiSor = $(this).closest("tr");
            let index = parseInt(this.id) + 1;

            for (var i = 0; i < 6; i++) {
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
            modosit += "<td><button type=submit name=veglegesites>Véglegesítés</button></td>";
            modosit += "<td><button class=megse onclick='return false'>Mégse</button></td>";

            $(".felhasznalokTablazat tr:nth(" + index + ")").html(modosit);
            $(".felhasznalokTablazat tr:nth(" + index + ")").css("background-color", "lightblue");

            $(".megse").on("click", (event) => {
                felhasznalokMegjelenites(adatok);
            });
        });
    }


});

