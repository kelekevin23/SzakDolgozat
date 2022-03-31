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

    //rendelés opciók
    $(window).on("csomagolasraVar", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "rstatusz = 1",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        new RendszergazdaRendeles();
    });
    $(window).on("futarraVar", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "rstatusz = 2",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        new RendszergazdaRendeles();
    });
    $(window).on("kiszallitva", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "rstatusz = 4",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        new RendszergazdaRendeles();
    });
    $(window).on("torlesRendeles", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "rstatusz = 5",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        new RendszergazdaRendeles();
    });


    //felhasználó opciók
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

    //bőrönd opciók
    $(window).on("borondVeglegesites", (event) => {
        let ujAdatok = [];
        let rendben = true;
        for (var i = 0; i < 3; i++) {
            ujAdatok.push($(".adat" + i).val());
            if ($(".adat" + i).val() === "") {
                rendben = false;
            }
        }
        let data2 = {
            tablaNeve: "Cikk",
            ujErtekek:
                    "ar = '" + ujAdatok[1] + "'," +
                    "keszlet = '" + ujAdatok[2] + "'",
            where: "cikkszam = '" + ujAdatok[0] + "'"
        };
        if (rendben) {
            ajax.updateAjax("../api/Update.php", data2);
            new RendszergazdaBorond(data);
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
    $(window).on("borondTorles", (event) => {
        let data2 = {
            tablaNeve: "Cikk",
            where: "cikkszam = '" + event.detail + "'"
        };
        ajax.deleteAjax("../api/Delete.php", data2);
        new RendszergazdaBorond(data);
    });

    $("#ujTermek").click(function () {
        let ertekek = "'";
        let oszlopok = "(";
        let kepEleres = "/";
        let rendben = true;
        $('.borondForm :input').each(function (index, element) {
            let text = $("#" + element.id).val();
            if (index !== 9) {
                if (text !== "") {
                    if (index > 1 && index < 4) {
                        kepEleres += text + "-";
                    } else if (index === 4) {
                        kepEleres += text + "/'";
                    }
                    if (element.id === "keszlet") {
                        oszlopok += element.id;
                    } else {
                        oszlopok += element.id + ", ";
                    }
                    ertekek += text + "', '";
                } else {
                    rendben = false;
                }
            }
        });
        oszlopok += ", kepElerese)";
        ertekek += kepEleres;
        let data2 = {
            tablaNeve: "Cikk",
            oszlopok: oszlopok,
            ertekek: ertekek
        };

        if (rendben) {
            ajax.insertAjax("../api/Insert.php", data2);
            new RendszergazdaBorond(data);
        }
    });

});

