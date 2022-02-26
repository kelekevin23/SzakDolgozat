$(function () {

    const ajax = new Ajax();
    let indexLapozas = 0;


    $('.slider').on('change', function () {
        let val = $(this).val();
        $('#slider_ertek').html("Jelenlegi érték: " + val);
    });





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
//        mit: "*",
//        tablaNeve: "Cikk",
//        honnan: "(select row_number() OVER (order by modell, magassag) AS ROWINDEX,* from Cikk ) c inner join Modell m on c.modell = m.modell",
//        where: "WHERE c.ROWINDEX between 1 and 10",
//        segedTabla: "Modell"
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
        console.log(whereSzin);
        let radioValue = $("input[name='marka']:checked").val();
        let where = "";

        if (radioValue === undefined) {
            if (whereSzin === "") {
                where += "order by c.modell, c.magassag";
            } else {
                where += "where" + whereSzin + " order by c.modell, c.magassag";
            }
        } else {
            if (whereSzin === "") {
                where += "where m.marka like '" + radioValue + "' order by c.modell, c.magassag";
            } else {
                where += "where m.marka like '" + radioValue + "' and" + whereSzin + " order by c.modell, c.magassag";
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
        console.log(adatok);
        $(".adatFeltolt").empty();
        for (var index = indexLapozas; index < indexLapozas + 10; index++) {
            if (index < adatok.length) {
                const ujElem = sablonElem.clone().appendTo(szuloElem);
                const termek = new Borond(ujElem, adatok[index]);
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

        $('.lapozElem').on('click', function () {
            let id = this.id;
            indexLapozas = (id * 10) - 10;
            termeketFelvesz(termekek);

        });
    }

});


