$(function () {
    $("#menu").css("grid-template-columns", "repeat(" + $("nav li").length + ", 1fr)");
    for (var i = 0; i < $("nav li").length - 1; i++) {
        $("nav li").eq(i).css("border-right", "1px solid white");
        $("nav li").eq(i).css("border-bottom", "none");
    }
});
