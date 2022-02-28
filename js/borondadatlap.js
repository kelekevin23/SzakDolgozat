$(function () {

    let tomb = localStorage.getItem("adatlap");
    console.log(tomb);
    let data = JSON.parse(tomb);

    const szuloElem = $(".borondKepek");
    const sablonElem = $(".galeria");

    let galeria;
    for (let index = 1; index < 5; index++) {
        const ujElem = sablonElem.clone().appendTo(szuloElem);
        galeria = new BorondAdatlap(ujElem, data, index);
    }
    sablonElem.remove();
    
    const szuloElem2 = $("#kezdoKep");
    const ujElem2 = sablonElem.clone().appendTo(szuloElem2);
    const nagyGaleria = new BorondAdatlap(ujElem2, data, 1);


$(window).on("kepKattintas", (event)=>{
        nagyGaleria.termekBeallit(data, event.detail);
    });
});


