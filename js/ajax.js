class Ajax{


    constructor(){
    }
    
    getAjax(eleresiUt, tomb, data, myCallback){
        $.ajax({
            type: "GET",
            url: eleresiUt,
            data: data,
            datatype: "text",

            success: function (data) {
                const obj = JSON.parse(data);
                obj.forEach((value) => {
                    tomb.push(value);
                });
                console.log(tomb);
                myCallback(tomb);
            }
        });

    }
}