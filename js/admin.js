$(function () {

//location.reload();
    const ajax = new Ajax();

    new AdminRendeles();
    $(".borondBeszerzes").hide();

    $("#rendelesSzerk").on("click", (event) => {
        $(".borondBeszerzes").hide();
        $(".rendelesStatusz").show();
        new AdminRendeles();
    });

    $("#borondokSzerk").on("click", (event) => {
        $(".rendelesStatusz").hide();
        $(".borondBeszerzes").show();
        new AdminBeszerzes();
    });

    $(window).on("jovahagyas", (event) => {
        let data = {
            tablaNeve: "Cikk",
            ujErtekek: "keszlet += " + event.detail.darabszam,
            where: "cikkszam like '" + event.detail.cikkszam + "'"
        };
        ajax.updateAjax("../api/Update.php", data);
        
        let data2 = {
            tablaNeve: "Beszerzes",
            where: "id like " + event.detail.id 
        };
        ajax.deleteAjax("../api/Delete.php", data2);
        
        new AdminBeszerzes();
    });
    
    $(window).on("csomagol", (event) => {
        let data = {
            tablaNeve: "Rendeles",
            ujErtekek: "rstatusz = 2" ,
            where: "rend_szam = " + event.detail
        };
        ajax.updateAjax("../api/Update.php", data);
        
        new AdminRendeles();
    });


});
    