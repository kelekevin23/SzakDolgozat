$(function () {

    let nagyGaleria;
    let tomb = localStorage.getItem("adatlap");
    let data = JSON.parse(tomb);

    let marka = JSON.stringify(data.marka);
    localStorage.setItem("adatlap_marka", marka);


    const szuloElem = $(".borondKepek");
    const sablonElem = $(".galeria");


    for (let index = 1; index < 5; index++) {
        const ujElem = sablonElem.clone().appendTo(szuloElem);
        let galeria = new BorondAdatlapKep(ujElem, data, index);
    }
    sablonElem.remove();

    const szuloElem2 = $("#kezdoKep");
    const ujElem2 = sablonElem.clone().appendTo(szuloElem2);
    nagyGaleria = new BorondAdatlapKep(ujElem2, data, 1);


    let adatokLerias = new BorondAdatlap(data);

    $(window).on("kepKattintas", (event) => {
        nagyGaleria.termekBeallit(event.detail.data2, event.detail.data);
    });

    $(window).on("szinKattintas", (event) => {
        $(".borondKepek").empty();

        const szuloElem = $(".borondKepek");
        const sablonElem = $(".galeria");

        for (let index = 1; index < 5; index++) {
            const ujElem = sablonElem.clone().appendTo(szuloElem);
            let galeria = new BorondAdatlapKep(ujElem, event.detail.data, index);
        }
        sablonElem.remove();

        const szuloElem2 = $("#kezdoKep");
        const ujElem2 = sablonElem.clone().appendTo(szuloElem2);
        nagyGaleria = new BorondAdatlapKep(ujElem2, event.detail.data, 1);

        let adatokLerias = new BorondAdatlap(event.detail.data);
    });


    const ujTermek = new Kosar();
    this.kosarba = $(".kosarba");
    this.kosarba.html("Kosárba");

    $(".kosarba").on("click", function () {
        let obj = JSON.parse(localStorage.getItem("aktualisObj"));
        let darab = JSON.parse(localStorage.getItem("aktualisDarab"));
        let marka = localStorage.getItem("aktualisMarka");

        if (darab !== null) {

            if (darab > obj.keszlet) {
                console.log("Jeleneleg nincs ennyi darab készleten.");
            } else {
                ujTermek.setAdatok(obj, darab, marka);
            }
        }
    });
});