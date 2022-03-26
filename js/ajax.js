class Ajax {

    constructor() {
    }

    selectAjax(eleresiUt, tomb, data, myCallback) {
        $.ajax({
            type: "GET",
            url: eleresiUt,
            data: data,
            datatype: "text",

            success: function (result) {
                //console.log(data);
                const obj = JSON.parse(result);
                obj.forEach((value) => {
                    tomb.push(value);
                });
                myCallback(tomb);
            },
            error: function () {
                "Sikertleen adatlekérés";
            }
        });

    }
    insertAjax(eleresiUt, tomb, data, myCallback) {
        $.ajax({
            type: "POST",
            url: eleresiUt,
            data: data,
            datatype: "text",
            error: function () {
                "Sikertleen adatfeltöltés";
            }
        });

    }
    updateAjax(eleresiUt, tomb, data, myCallback) {
        $.ajax({
            type: "PUT",
            url: eleresiUt,
            data: data,
            datatype: "text",
            error: function () {
                "Sikertleen adatfrissítés";
            }
        });

    }
    deleteAjax(eleresiUt, tomb, data, myCallback) {
        $.ajax({
            type: "DELETE",
            url: eleresiUt,
            data: data,
            datatype: "text",
            error: function () {
                "Sikertleen adattörlés";
            }
        });

    }
}