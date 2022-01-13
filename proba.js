$(function () {
    
    var phpadd= "<?php proba?>";
    $("#kattint").on("click", function(){
        //php kapcsolat kialakítása
        $.ajax({
            url: "proba2.php",
            type: "post",
            data: {functionname: 'proba'},
                success: function (result) {
                    console.log(result);
                },
        });
            


    })

});