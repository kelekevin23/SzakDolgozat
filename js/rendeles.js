$(function () {
    $("#szerkesztes").hide();
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

    $("#szerkesztes").on("click", (event) => {
        $("#szerkesztes").hide();
        $("#ellenorzes").show();
        $("#rendVeglegesites").attr('disabled', true);
        $(".rendAdatok").children("input").css("border", "hidden");
        $(".rendAdatok").children("input").attr("readonly", false);
        $("#szamlCim").prop("disabled", false);
        //$(".urlapRendeles").children("fieldset").prop("disabled", false);

    });
    $("#ellenorzes").on("click", (event) => {
        $("#ellenorzes").hide();
        $("#szerkesztes").show();
        $(".rendAdatok").children("input").css("border", "groove");
        $(".rendAdatok").children("input").attr("readonly", true);
        $("#szamlCim").prop("disabled", true);
       // $(".urlapRendeles").children("fieldset").prop("disabled", true);
        let rosszErtek = false;

        $('#vevoAdat :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id === "tszam") {
                let tszam = parseInt(text);
                if (text.charAt(0) === "0") {
                    if (tszam.toString().length !== 10) {
                        rosszErtek = true;
                        $("#tszam").css("border-color", "red");
                    }
                } else {
                    rosszErtek = true;
                    $("#tszam").css("border-color", "red");
                }
            }
            if (text === "") {

                $("#" + element.id).css("border-color", "red");
                rosszErtek = true;
            }
        });

        $('#szallitasi :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id !== "szamlCim") {
                if (element.id === "irany") {
                    let i2 = parseInt(text);
                    if (i2.toString().length !== 4) {
                        $("#irany").css("border-color", "red");
                        rosszErtek = true;
                    }
                }
                if (text === "") {
                    rosszErtek = true;
                    $("#" + element.id).css("border-color", "red");
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
                    $("#irany2").css("border-color", "red");
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
                $("#" + element.id).css("border-color", "red");
                rosszErtek = true;
            }

            if (cnev2 === "" && asz2 !== "" || cnev2 !== "" && asz2 === "") {
                $("#" + element.id).css("border-color", "red");
                rosszErtek = true;
            } else if (cnev2 !== "" && asz2 !== "") {
                if (asz2.toString().length !== 13) {
                    rosszErtek = true;
                    $("#" + element.id).css("border-color", "red");
                } else {
                    rosszErtek = false;
                }
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