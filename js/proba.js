

var adatok = [];
$.ajax({
    //dataType: 'json',
    type: "GET",
    url: 'php/proba.php',
    data: {
        //"top 9 c.*, m.marka", "Cikk", "Cikk c inner join Modell m on c.modell = m.modell", "order by keszlet desc", "Modell"
        mit: "top 9 c.*, m.marka",
        tablaNeve: "Cikk",
        honnan: "Cikk c inner join Modell m on c.modell = m.modell",
        where: "order by keszlet desc",
        segedTabla: "Modell"
    },
    datatype: "text",

    success: function (data) {
        const obj = JSON.parse(data);

        console.log(obj);
        console.log(typeof obj);

        obj.forEach((value) => {
            console.log(value);
            //adatok.push(value);
        });
    }

});
