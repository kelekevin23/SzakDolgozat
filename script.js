$(function () {

    const sablonElem = $(".galeria");

    var index = 5;
    sablonElem.remove();



    /*const szuloElem = $("aside");
    for (let index = 1; index < 10; index++) {
        const ujElem = sablonElem.clone().appendTo(szuloElem);
        const galeria = new Galeria(ujElem, index);
    }*/



    const balKep = $("#balkep");
    const balElem = sablonElem.clone().appendTo(balKep);

    const foKep = $("#fokep");
    const foElem = sablonElem.clone().appendTo(foKep);

    const jobbKep = $("#jobbkep");
    const jobbElem = sablonElem.clone().appendTo(jobbKep);

    const balGaleria = new Galeria(balElem, index - 1);
    const foGaleria = new Galeria(foElem, index);
    const jobbGaleria = new Galeria(jobbElem, index + 1);


    $("#jobb").on("click", function () {
        index--;
        console.log("index: " + index);
        
        
        if (index === 0) {
            index = 9;
        }

        if (index === 9) {
            balGaleria.kepBeallit(index);
            console.log(index);
        } else {
            balGaleria.kepBeallit(Math.abs(index - 10) - 1);
            console.log(Math.abs(index - 10) - 1);
        }

        foGaleria.kepBeallit(Math.abs(index - 10));
        console.log(Math.abs(index - 10));

        if (index === 1) {
            jobbGaleria.kepBeallit(index);
            console.log(index);
            index = 10;
        } else {
            jobbGaleria.kepBeallit(Math.abs(index - 10) + 1);
            console.log(Math.abs(index - 10) + 1);
        }
    });

    $("#bal").on("click", function () {
        index++;
        console.log("index: " + index);
        
        console.log(index-10);
        
        if (index === 10) {
            index = 1;
        }

        if (index === 1) {
            jobbGaleria.kepBeallit(index);
            console.log(index);
        } else {
            jobbGaleria.kepBeallit(Math.abs(index - 10) + 1);
            console.log(Math.abs(index - 10) + 1);
        }

        foGaleria.kepBeallit(Math.abs(index - 10));
        console.log(Math.abs(index - 10));

        if (index === 9) {
            balGaleria.kepBeallit(index);
            console.log(index);
            index = 0;
        } else {
            balGaleria.kepBeallit(Math.abs(index - 10) - 1);
            console.log(Math.abs(index - 10) - 1);
        }
    });
});