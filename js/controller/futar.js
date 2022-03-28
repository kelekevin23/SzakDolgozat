$(function () {

    const ajax = new Ajax();
    new FutarElerheto();

    let szoveg = $("#panel p").html();
    let nev = "";
    let most = false;

    for (var i = 0; i < szoveg.length; i++) {
        if (most) {
            nev += szoveg[i];
        }
        if (szoveg[i] === " ") {
            most = true;
        }
    }

    $("#elerRend").on("click", (event) => {
        new FutarElerheto();
        $("#kivalasztott").hide();
    });

    $("#sajatRend").on("click", (event) => {
        new FutarSajat(nev);
        $("#kivalasztott").hide();
    });

    $(window).on("atVetel", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "kiszallito = '" + nev + "', rstatusz = 3",
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        
        new FutarElerheto();
    });
});