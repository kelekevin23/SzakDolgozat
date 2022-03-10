$(function () {
    
    
    let osszeg = localStorage.getItem("vegOsszeg");
    console.log(osszeg);
    
    

    $("#osszeg").html("Végösszeg: " + osszeg + " Forint");
   
});