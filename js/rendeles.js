$(function () {

    let osszeg = localStorage.getItem("vegOsszeg");
    let rendelesTomb = JSON.parse(localStorage.getItem("rendeleshez"));


    let adatKiir = "";
    $(".rendelesBetolt").empty();

    $("#termekDarab").val(rendelesTomb.length);
    adatKiir += "<table class=rendelesTablazat>";
    adatKiir += "<tr>";
    adatKiir += "<th>Cikkszám</th>";
    adatKiir += "<th>Darabszám</th>";
    adatKiir += "<th>Összeg</th>";
    adatKiir += "</tr>";

    for (var i = 0; i < rendelesTomb.length; i++) {
        adatKiir += "<tr>";
        adatKiir += "<td><input type=hidden name=cikk" + i + " value=" + rendelesTomb[i].cikkszam + ">" + rendelesTomb[i].cikkszam + "</td>";
        adatKiir += "<td><input type=hidden name=darab" + i + " value=" + rendelesTomb[i].darab + ">" + rendelesTomb[i].darab + "</td>";
        adatKiir += "<td><input type=hidden name=osszeg" + i + " value=" + rendelesTomb[i].reszOsszeg + ">" + rendelesTomb[i].reszOsszeg + " Forint</td>";
        adatKiir += "</tr>";
    }

    $("#rendelesBetolt").html(adatKiir);

    $("#osszeg").html("Végösszeg: " + osszeg + " Forint");
    $("#rendVeglegesites").attr('disabled', true);

    $("#szamlCim").on("click", (event) => {
        $('#szallitasi :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id !== "szamlCim") {
                $("#" + element.id + "2").val(text);
            }
        });
    });


    $("#ellenorzes").on("click", (event) => {
        let rosszErtek = false;

        $('#vevoAdat :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id === "tszam") {
                let tszam = parseInt(text);
                if (text.charAt(0) === "0") {
                    if (tszam.toString().length !== 10) {
                        rosszErtek = true;
                    }
                } else {
                    if (tszam.toString().length !== 11) {
                        rosszErtek = true;
                    }
                }
            }
            if (text === "") {
                rosszErtek = true;
            }
        });

        $('#szallitasi :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id !== "szamlCim") {
                if (element.id === "irany") {
                    let i2 = parseInt(text);
                    if (i2.toString().length !== 4) {
                        rosszErtek = true;
                    }
                }
                if (text === "") {
                    rosszErtek = true;
                }
            }
        });

        let cnev2 = "";
        let asz2 = "";
        $('#szamlazasi :input').each(function (index, element) {
            var text = $("#" + element.id).val();

            if (element.id === "irany2") {
                let i2 = parseInt(text);
                if (i2.toString().length !== 4) {
                    rosszErtek = true;
                }
            }
            if (element.id === "cnev2") {
                cnev2 = text;
            }
            if (element.id === "asz2") {
                asz2 = text;
            }

            if (text === "" && element.id !== "cnev2" && element.id !== "asz2") {
                rosszErtek = true;
            }

            if (cnev2 === "" && asz2 !== "" || cnev2 !== "" && asz2 === "") {
                rosszErtek = true;
            } else if (cnev2 !== "" && asz2 !== "") {
                /*if (asz2.toString().length !== 13) {
                 rosszErtek = true;
                 } else {
                 rosszErtek = false;
                 }*/
                console.log("ha");
                rosszErtek = false;
            }



        });

        if (!rosszErtek) {
            $("#rendVeglegesites").attr('disabled', false);
        } else {
            $("#rendVeglegesites").attr('disabled', true);

        }
    });


});