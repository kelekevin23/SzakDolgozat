$(function () {
    new Kosar();
});
class Kosar {

    constructor() {
        this.kosarTomb = [];
        this.valami = JSON.parse(localStorage.getItem("kosar"));
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
        tablazat += "<th>kep</th>";
        tablazat += "<th></th>";
        tablazat += "</tr>";

        let eleres;
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

            tablazat += "<td class=darab>" + this.kosarTomb[index].darab + "</td>";
            let reszOsszeg = this.kosarTomb[index].adat.ar * this.kosarTomb[index].darab;
            tablazat += "<td class=reszOsszeg >" + reszOsszeg + " Ft</td>";
            //tablazat += "<td><button class=kepGomb id=" + index + ">Kép mutatása</button></td>";


            let eleres = "../kepek/" + this.kosarTomb[index].marka.substring(0, 2) + "/" + this.kosarTomb[index].adat.modell+ this.kosarTomb[index].adat.kepElerese + this.kosarTomb[index].adat.szin + "1.jpg";
            //eleres = "../kepek/Sa/COSMOLITE SPINNER/55-40-20-36/piros1.jpg";
            console.log(eleres);
            tablazat += "<td class=kepbetolt><img src= ></td>";

            $(".kepbetolt img").attr("src", eleres);
            tablazat += "<td><button class=gombok id=" + index + ">X</button></td></tr>";

            //localStorage.removeItem("lastname");
            //Adat = Localstorage.getItem("kulcs");
            //this.kosarTomb = JSON.parse(localStorage.getItem("kulcs"));
            //this.kosarTomb = localStorage.getItem("kulcs");
            //localStorage.setItem("kulcs", this.kosarTomb[index]);

        }
        tablazat += "</table>";

        
        $(".kosarAdatok").html(tablazat);
        $(".kosarGombok").html("<button class=torolGomb>Kosár törlése</button>");
        $(".kosarGombok").append("<a href=rendeles.php><button class=rendeles>Rendelés folytatása...</button></a>");

        if (this.kosarTomb.length === 0) {
            $(".rendeles").attr('disabled', true);
        } else {
            $(".rendeles").attr('disabled', false);
        }
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