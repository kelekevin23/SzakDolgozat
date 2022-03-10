$(function () {

    const ajax = new Ajax();
    let indexLapozas = 0;

    let adatok = [];
    let data = {
        mit: "*",
        tablaNeve: "Szin",
        honnan: "",
        where: "where besorolas is null",
        segedTabla: ""
    };
    ajax.getAjax('feldolgoz.php', adatok, data, checkbox);


    let termekek = [];
    let data2 = {
        mit: "*",
        tablaNeve: "Cikk",
        honnan: "Cikk c inner join Modell m on c.modell = m.modell",
        where: "order by c.modell, c.magassag",
        segedTabla: "Modell"

    };
    ajax.getAjax('feldolgoz.php', termekek, data2, termeketFelvesz);


    $('#szures-gomb').on('click', function () {
        indexLapozas = 0;

        let checked = [];
        $("input[name='szin']:checked").each(function () {
            checked.push(this.id);
        });

        let whereSzin = "";
        if (checked.length > 0) {

            for (var i = 0; i < checked.length; i++) {
                checked[i] = checked[i].replace(new RegExp(/[áéöóí]/g), "%");
            }

            for (var i = 0; i < checked.length; i++) {
                if (i === (checked.length) - 1) {
                    whereSzin += " s.szin like '" + checked[i] + "'";
                } else {
                    whereSzin += " s.szin like '" + checked[i] + "' or ";
                }
            }
            whereSzin += " or ";
            for (var i = 0; i < checked.length; i++) {
                if (i === (checked.length) - 1) {
                    whereSzin += " s.besorolas like '" + checked[i] + "'";
                } else {

                    whereSzin += " s.besorolas like '" + checked[i] + "' or ";
                }
            }
        }
        let rendezes = " order by c.modell, c.magassag";
        let radioValue = $("input[name='marka']:checked").val();
        let where = "";
        let meret = $("input[name='meret']:checked").val();
        if (radioValue === undefined) {
            if (meret === undefined) {
                if (whereSzin === "") {
                    where += rendezes;
                } else {
                    where += "where (" + whereSzin + " ) " + rendezes;
                }
            } else {
                if (whereSzin === "") {
                    where += "where c.urmertek " + meret + rendezes;
                } else {
                    where += "where (" + whereSzin + ") and c.urmertek " + meret + rendezes;
                }
            }
        } else {
            if (meret === undefined) {
                if (whereSzin === "") {
                    where += "where m.marka like '" + radioValue + "'" + rendezes;
                } else {
                    where += "where m.marka like '" + radioValue + "' and (" + whereSzin + ")" + rendezes;
                }
            } else {
                if (whereSzin === "") {
                    where += "where m.marka like '" + radioValue + "' " + " and c.urmertek " + meret + rendezes;
                } else {
                    where += "where m.marka like '" + radioValue + "' " + " and c.urmertek " + meret + " and (" + whereSzin + ")" + rendezes;
                }
            }
        }

        console.log(where);

        let data2 = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "Cikk c inner join Modell m on c.modell = m.modell inner join Szin s on c.szin = s.szin",
            where: where,
            segedTabla: "Modell"
        };
        termekek = [];
        ajax.getAjax('feldolgoz.php', termekek, data2, termeketFelvesz);
    });


    const szuloElem = $(".adatFeltolt");
    const sablonElem = $(".termek");
    function termeketFelvesz(adatok) {
        console.log(adatok.length);
        $(".adatFeltolt").empty();
        if (adatok.length === 0) {
            $(".adatFeltolt").append("<h3>Sajnos nincs ilyen fajta bőrönd!</h3>");
            $(".adatFeltolt").css("text-align", "center");
            $(".adatFeltolt h3").css("color", "brown");
        } else {
            for (var index = indexLapozas; index < indexLapozas + 10; index++) {
                if (index < adatok.length) {
                    const ujElem = sablonElem.clone().appendTo(szuloElem);
                    const termek = new Borond(ujElem, adatok[index]);
                }
            }
        }
        lapozas(adatok);
        sablonElem.remove();
    }

    function checkbox(adatok) {
        for (var i = 0; i < adatok.length; i++) {
            $("#szinek_tarolo").append("<input type=checkbox id=" + adatok[i].szin + " name=szin " + i + "value=" + adatok[i].szin + ">");
            $("#szinek_tarolo").append("<label for=szin" + i + ">" + adatok[i].szin + "</label><br>");
        }
    }

    function lapozas(adatok) {
        let szam = adatok.length / 10;
        let maradek = adatok.length % 10;
        let emeles = 1;

        if (maradek > 0) {
            emeles = 2;
        }
        $(".lapoz").empty();
        for (var i = 1; i < Math.trunc(szam) + emeles; i++) {
            $(".lapoz").append("<button class=lapozElem id=" + i + ">" + i + "</button>");
        }

        $('.lapozElem').eq(0).css("background-color", "white");
        $('.lapozElem').eq(0).css("color", "brown");

        $('.lapozElem').on('click', function () {
            let id = this.id;
            indexLapozas = (id * 10) - 10;
            termeketFelvesz(termekek);

        });
        $(".lapozElem").click(function () {
            let id = this.id;
            $('.lapozElem').eq(0).css("background-color", "brown");
            $('.lapozElem').eq(0).css("color", "white");
            $('.lapozElem').eq(id - 1).css("background-color", "white");
            $('.lapozElem').eq(id - 1).css("color", "brown");
        });
    }

    $(window).on("gombKattintas", (event) => {
        let adathalmaz = JSON.stringify(event.detail);
        localStorage.setItem("adatlap", adathalmaz);
    });

});


