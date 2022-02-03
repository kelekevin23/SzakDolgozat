<?php

class Ab {

    private $host = "localhost";
    private $felhasznalonev = "root";
    private $jelszo = "";
    private $abNev = "felhasznalok";
    private $kapcsolat;

    function getKapcsolat() {
        return $this->kapcsolat;
    }

    public function __construct() {
        $this->kapcsolat = new mysqli($this->host, $this->felhasznalonev, $this->jelszo, $this->abNev);
        $szoveg = "";
        if ($this->kapcsolat->connect_error) {
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
    }

    public function select($tablaNeve, $where) {
        $sql = "SELECT * FROM " . $tablaNeve . " WHERE " . $where;
        $sql = $this->kapcsolat->query($sql);
        return $sql;
    }

    public function update($tablaNeve, $ujErtekek, $where) {
        $sql = "UPDATE " . $tablaNeve . " SET " . $ujErtekek . " WHERE " . $where;
        $sql = $this->kapcsolat->query($sql);
        if ($sql == true) {
            return true;
        } else {
            return false;
        }
    }

    public function insert($tablaNeve, $oszlopok, $ertekek) {
        $sql = "INSERT INTO " . $tablaNeve . " " . $oszlopok . " VALUES " . $ertekek;
        $sql = $this->kapcsolat->query($sql);
        if ($sql == true) {
            return $sql;
        } else {
            return false;
        }
    }

    public function delete($tablaNeve, $where) {
        $sql = "DELETE FROM " . $tablaNeve . " WHERE " . $where;
        $sql = $this->kapcsolat->query($sql);
        if ($sql == true) {
            return true;
        } else {
            return false;
        }
    }

}
