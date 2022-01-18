<?php

class Ab {

    //osztály változók
    //láthatóságok: private, public, protected
    private $host = "localhost";
    private $felhazsnalonev = "root";
    private $jelszo = "";
    private $abNev = "felhasznalok";
    private $kapcsolat;

    function getKapcsolat() {
        return $this->kapcsolat;
    }

    public function __construct() {
        $this->kapcsolat = new mysqli($this->host, $this->felhazsnalonev, $this->jelszo, $this->abNev);
        $szoveg = "";
        if ($this->kapcsolat->connect_error) {
            //$szoveg="<p>Hiba az adatbázishoz csatlakozáskor!</p>";
            $szoveg = "<p>Hiba: " . $this->kapcsolat->connect_error . ".</p>";
        }

        //ékezetes betűk
        $this->kapcsolat->query("SET NAMES UTF8");
        $this->kapcsolat->query("set character set UTF8");
        $this->kapcsolat->query("set collation_connection='utf8_hungary_ci'");

        echo $szoveg;
    }

    public function kapcsolatBezar() {
        $this->kapcsolat->close();
        //echo "Kapcsolat zárva.";
    }
    
}
