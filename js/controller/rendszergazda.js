$(function () {

    const ajax = new Ajax();
    let lapozId = 1;

    let data = {
        mit: "*",
        tablaNeve: "Cikk",
        honnan: "",
        where: "where cikkszam not in (select cikkszam from Rend_tetel)",
        segedTabla: ""

    };
    new RendszergazdaBorond(data);
    $(".rendszerGazdaRendelesek").hide();
    $(".rendszerGazdaFelhasznalok").hide();

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

        new RendszergazdaBorond(data);
    });
    $("#felhasznSzerk").on("click", function () {
        $(".rendszerGazdaRendelesek").hide();
        $(".rendszerGazdaBorondok").hide();
        $(".rendszerGazdaFelhasznalok").show();
        new RendszergazdaFelhasznalok();
    });

    $(window).on("felhasznTorles", (event) => {
        let data = {
            tablaNeve: "Felhasznalok",
            where: "felhasznalonev = '" + event.detail.felhasznalonev + "'"
        };
        ajax.deleteAjax("../api/Delete.php", data);
        new RendszergazdaFelhasznalok();
    });
    $(window).on("felhasznVeglegesites", (event) => {
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


    $(window).on("borondRendezes", (event) => {
        let rendez = "";
        let azon = parseInt(event.detail);

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

        let data = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "",
            where: where,
            segedTabla: ""

        };
        new RendszergazdaBorond(data);
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

