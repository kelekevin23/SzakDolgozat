class Kosar {

    constructor() {
        this.kosarTomb = [];
        /*this.valami = JSON.parse(localStorage.getItem("kosar"));

        this.osszelem = $("#osszAr");

        if (this.valami != null) {
            this.kosarTomb = this.valami;
            //  this.megjelenit();
        }*/


    }

    setAdatok(obj, db) {
        this.tombbe = [];
        this.tombbe.push(obj);
        this.tombbe.push(db);
        this.kosarTomb.push(this.tombbe);

        let adathalmaz = JSON.stringify(this.kosarTomb);
        localStorage.setItem("kosar", adathalmaz);

        console.log(this.kosarTomb);
        //this.megjelenit();
    }

    megjelenit() {
        this.osszeg = 0;

        var tablazat = "";
        tablazat += "<table class=tablazat>";


        for (let index = 0; index < this.kosarTomb.length; index++) {
            /*this.osszeg += this.kosarTomb[index][1];
             tablazat += "<tr>";
             tablazat += "<td>" + this.kosarTomb[index][0] + "</td>";
             tablazat += "<td></td>";
             tablazat += "<td class=jobb>" + this.kosarTomb[index][1] + "Ft</td>";
             tablazat += "<td><button class=gombok id=" + index + ">X</button></td></tr>";*/

            //localStorage.removeItem("lastname");
            //Adat = Localstorage.getItem("kulcs");
            //this.kosarTomb = JSON.parse(localStorage.getItem("kulcs"));
            //this.kosarTomb = localStorage.getItem("kulcs");
            //localStorage.setItem("kulcs", this.kosarTomb[index]);

        }
        tablazat += "</table>";

        if (!this.osszeg === 0) {
            this.osszelem.html("<button class=torolGomb >Kosár törlése</button>Végösszeg: " + this.osszeg + "Ft");
            this.osszelem.css("border-top", "1px solid black");

            $("#link").html("Tovább a fizetéshez");
            $("#link").attr("href", "fizetes.html");
        } else {
            $("#link").empty();
            this.osszelem.empty();
            this.osszelem.css("border-top", "none");
        }

        $(".kosar").html(tablazat);

        $(".torolGomb").on("click", (event) => {
            this.kosarTomb = [];
            this.megjelenit();
        });

        $(".gombok").on("click", (event) => {
            this.kosarTomb.splice($(event.target).attr("id"), 1);
            let adathalmaz = JSON.stringify(this.kosarTomb);
            localStorage.setItem("kulcs", adathalmaz);
            this.megjelenit();

        });
    }

}