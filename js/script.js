$(function () {




//nav li:nth-child(-n+3){
    //  border-right: 1px solid white;
//}


    for (var i = 0; i < $("nav li").length - 1; i++) {
        $("nav li").eq(i).css("border-right", "1px solid white");
    }

    $("#menu").css("grid-template-columns", "repeat(" + $("nav li").length + ", 1fr)");


    const galeria = new Galeria();

    $("#belepes").on("click", () => {
        hatterHomalyosit(".tarolo-div");
        hatterHomalyosit(".header-container");

        $(".kepTarolo-div").css("filter", "blur(2px)");
        $(".kepTarolo-div").css("mix-blend-mode", "multiply");

        panelDisplay("#bejelentkezoForm", "block");
        panelDisplay("#regisztracioForm", "none");

    });


    $(".btncancel").on("click", () => {
        hatterVisszaAllit(".tarolo-div");
        hatterVisszaAllit(".kepTarolo-div");
        hatterVisszaAllit(".header-container");

        panelDisplay("#bejelentkezoForm", "none");
        panelDisplay("#regisztracioForm", "none");
    });


    $("#regisztracio").on("click", () => {
        hatterHomalyosit(".tarolo-div");
        hatterHomalyosit(".header-container");


        $(".kepTarolo-div").css("filter", "blur(2px)");
        $(".kepTarolo-div").css("mix-blend-mode", "multiply");

        panelDisplay("#regisztracioForm", "block");
        panelDisplay("#bejelentkezoForm", "none");
    });

    function hatterVisszaAllit(helye) {
        $(helye).css("filter", "blur(0px)");
        $(helye).css("pointer-events", "auto");
    }

    function hatterHomalyosit(helye) {
        $(helye).css("filter", "blur(2px)");
        $(helye).css("pointer-events", "none");
    }

    function panelDisplay(mit, mire) {
        $(mit).css("display", mire);
    }





    










});
