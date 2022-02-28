$(function () {

    let nagyGaleria;
    let tomb = localStorage.getItem("adatlap");
    let data = JSON.parse(tomb);

    let marka = JSON.stringify(data.marka);
    localStorage.setItem("adatlap_marka", marka);


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
    nagyGaleria = new BorondAdatlap(ujElem2, data, 1);


    $(window).on("kosarKattintas", (event) => {
        let adat = JSON.stringify(event.detail);
        localStorage.setItem("kosar", adat);
    });
    $(window).on("kepKattintas", (event) => {
        nagyGaleria.termekBeallit(event.detail.data2, event.detail.data);
    });

    $(window).on("szinKattintas", (event) => {
        $(".borondKepek").empty();
        const szuloElem = $(".borondKepek");
        const sablonElem = $(".galeria");

        let galeria;
        for (let index = 1; index < 5; index++) {
            const ujElem = sablonElem.clone().appendTo(szuloElem);
            galeria = new BorondAdatlap(ujElem, event.detail.data, index);
        }
        sablonElem.remove();

        const szuloElem2 = $("#kezdoKep");
        const ujElem2 = sablonElem.clone().appendTo(szuloElem2);
        nagyGaleria = new BorondAdatlap(ujElem2, event.detail.data, 1);
    });
});


