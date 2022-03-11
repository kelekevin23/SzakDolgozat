$(function () {

    let osszeg = localStorage.getItem("vegOsszeg");
    $("#osszeg").html("Végösszeg: " + osszeg + " Forint");

    $("#rendVeglegesites").attr('disabled', true);

    $("#ellenorzes").on("click", (event) => {
        let rosszErtek = false;

        $('#vevoAdat :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id === "tszam") {
                let szam = parseInt(text);

                if (text.toString().length !== 11) {
                    rosszErtek = true;
                }
                /* if (text.charAt(0) === "0"){
                 console.log("nulla");
                 }*/

                if (!$.isNumeric(szam)) {
                    rosszErtek = true;
                }
            }
            if (text === "") {
                rosszErtek = true;
            }
        });

        $('#szallitasi :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id === "irany1") {
                let szam = parseInt(text);
                if (szam.toString().length !== 4) {
                    rosszErtek = true;
                }
            }
            if (text === "") {
                rosszErtek = true;
            }
        });

        $('#szamlazasi :input').each(function (index, element) {
            var text = $("#" + element.id).val();
            if (element.id === "irany2") {
                let szam = parseInt(text);
                if (szam.toString().length !== 4) {
                    rosszErtek = true;
                }
            }

            if (text === "") {
                rosszErtek = true;
            }
        });

        if (!rosszErtek) {
            $("#rendVeglegesites").attr('disabled', false);
        } else {
            $("#rendVeglegesites").attr('disabled', true);

        }
    });


});