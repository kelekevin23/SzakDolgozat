$(function () {

    $('.slider').on('change', function () {
        let val = $(this).val();
        $('#slider_ertek').html("Jelenlegi érték: " + val);
    });



    const ajax = new Ajax();
    let adatok = [];

    let data = {
        mit: "*",
        tablaNeve: "Szin",
        honnan: "",
        where: "where besorolas is null",
        segedTabla: ""
    };
     ajax.getAjax('feldolgoz.php', adatok, data, radio);


    const szuloElem = $(".adatFeltolt");
    const sablonElem = $(".termek");
    var termekek = [];
    let data2 = {
        mit: "*",
        tablaNeve: "Cikk",
        honnan: "(select row_number() OVER (order by modell, magassag) AS ROWINDEX,* from Cikk ) c inner join Modell m on c.modell = m.modell",
        //where: "WHERE c.ROWINDEX between "+ (id*10)-9 + " and "+ id*10,
        where: "WHERE c.ROWINDEX between 1 and 10",
        segedTabla: "Modell"
    };
    ajax.getAjax('feldolgoz.php', termekek, data2, termeketFelvesz);


    for (var i = 1, max = 10; i < 24; i++) {
        $(".lapoz").append("<button class=lapozElem id=" + i + ">" + i + "</button>");
    }
    $('.lapozElem').on('click', function () {
        let id = this.id;

        let min = (id * 10) - 9;
        let max = id * 10;
        let data2 = {
            mit: "*",
            tablaNeve: "Cikk",
            honnan: "(select row_number() OVER (order by modell, magassag) AS ROWINDEX,* from Cikk ) c inner join Modell m on c.modell = m.modell",
            where: "WHERE c.ROWINDEX between " + min + " and " + max,
            segedTabla: "Modell"
        };
        termekek = [];
        ajax.getAjax('feldolgoz.php', termekek, data2, termeketFelvesz);
    });

    function termeketFelvesz(adatok) {

        $(".adatFeltolt").empty();
        for (var index = 0; index < adatok.length; index++) {
            const ujElem = sablonElem.clone().appendTo(szuloElem);
            const termek = new Borond(ujElem, adatok[index]);
        }
        sablonElem.remove();
    }

    function radio(adatok) {

        for (var i = 0; i < adatok.length; i++) {
            $("#szinek_tarolo").append("<input type=checkbox id=szin" + i + "name=szin" + i + "value=" + adatok[i].szin + ">");
            $("#szinek_tarolo").append("<label for=szin" + i + ">" + adatok[i].szin + "</label><br>");
        }


    }



});


