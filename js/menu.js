$(function () {

    allit();

    $(window).resize(function () {
        allit();
    });

    function allit() {
       /* if ($(window).width() < 800) {
            $("#menu").css("grid-template-columns", "repeat(1, 1fr)");
             for (var i = 0; i < $("nav li").length - 1; i++) {
             $("nav li").eq(i).css("border-right", "none");
             $("nav li").eq(i).css("border-bottom", "1px solid white");
             }
        } else {
            $("#menu").css("grid-template-columns", "repeat(" + $("nav li").length + ", 1fr)");
            for (var i = 0; i < $("nav li").length - 1; i++) {
                $("nav li").eq(i).css("border-right", "1px solid white");
                $("nav li").eq(i).css("border-bottom", "none");
            }

        }*/
        $("#menu").css("grid-template-columns", "repeat(" + $("nav li").length + ", 1fr)");
        for (var i = 0; i < $("nav li").length - 1; i++) {
            $("nav li").eq(i).css("border-right", "1px solid white");
            $("nav li").eq(i).css("border-bottom", "none");
        }
    }

});
