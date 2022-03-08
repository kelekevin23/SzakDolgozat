$(function () {
    new Kosar();
});
class Kosar {

    constructor() {
        this.kosarTomb = [];
        this.valami = JSON.parse(localStorage.getItem("kosar"));
        console.log(this.valami);
        if (this.valami !== null) {
            this.kosarTomb = this.valami;
            this.megjelenit();
        }
    }

    setAdatok(obj, db, marka) {
        let tombbe = {
            adat: obj,
            darab: db,
            marka: marka
        };
        this.kosarTomb.push(tombbe);

        let adathalmaz = JSON.stringify(this.kosarTomb);
        localStorage.setItem("kosar", adathalmaz);

        this.megjelenit();
    }

    megjelenit() {
        this.osszeg = 0;

        let adatok = ['modell', 'cikkszam', 'magassag', 'szelesseg', 'melyseg', 'urmertek', 'szin'];
        let tablazat = "";
        tablazat += "<table class=kosarTablazat>";

        tablazat += "<tr>";
        tablazat += "<th>marka</th>";
        for (let i = 0; i < adatok.length; i++) {
            tablazat += "<th>" + adatok[i] + "</th>";
        }
        tablazat += "<th>darab</th>";
        tablazat += "<th>ar</th>";
        tablazat += "</tr>";

        for (let index = 0; index < this.kosarTomb.length; index++) {
            this.osszeg += this.kosarTomb[index].adat.ar;
            tablazat += "<tr>";


            tablazat += "<td>" + this.kosarTomb[index].marka + "</td>";
            for (let i = 0; i < adatok.length; i++) {
                for (var item in this.kosarTomb[index].adat) {
                    if (adatok[i] === item) {
                        tablazat += "<td>" + this.kosarTomb[index].adat[adatok[i]] + "</td>";
                    }
                }
            }

            tablazat += "<td class=jobb>" + this.kosarTomb[index].darab + "</td>";
            let reszOsszeg = this.kosarTomb[index].adat.ar * this.kosarTomb[index].darab;
            tablazat += "<td class=jobb>" + reszOsszeg + " Ft</td>";
            tablazat += "<td><button class=gombok id=" + index + ">X</button></td></tr>";

            //localStorage.removeItem("lastname");
            //Adat = Localstorage.getItem("kulcs");
            //this.kosarTomb = JSON.parse(localStorage.getItem("kulcs"));
            //this.kosarTomb = localStorage.getItem("kulcs");
            //localStorage.setItem("kulcs", this.kosarTomb[index]);

        }
        tablazat += "</table>";


        $(".kosarAdatok").html(tablazat);
        $(".kosarAdatok").append("<button class=torolGomb>Kosár törlése</button>");

        $(".torolGomb").on("click", (event) => {
            this.kosarTomb = [];
            let adathalmaz = JSON.stringify(this.kosarTomb);
            localStorage.setItem("kosar", adathalmaz);
            this.megjelenit();
        });

        $(".gombok").on("click", (event) => {
            this.kosarTomb.splice($(event.target).attr("id"), 1);
            let adathalmaz = JSON.stringify(this.kosarTomb);
            localStorage.setItem("kosar", adathalmaz);
            this.megjelenit();

        });
    }

}