$(function () {


    const ajax = new Ajax();

    let adatok = [];
    let data = {
        //mit: "rend_szam, megrendelo, fizetesimod, szallcim, fizetesiosszeg",
        mit: "*",
        tablaNeve: "Rendeles",
        honnan: "",
        where: "where rstatusz=2",
        segedTabla: ""
    };
    ajax.getAjax('../feldolgoz.php', adatok, data, megjelenites);

    function megjelenites(adatok) {
        console.log(adatok);
    }



});