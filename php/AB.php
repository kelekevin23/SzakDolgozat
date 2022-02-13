<?php

class Ab {
    /*
      private $host = "localhost";
      private $felhasznalonev = "root";
      private $jelszo = "";
      private $abNev = "felhasznalok";
      private $kapcsolat;
     */

    private $serverName = "DESKTOP-HFFA4M4";
    private $connectionInfo = array("Database" => "Szakdoga_adattal");
    private $kapcsolat;

    function getKapcsolat() {
        return $this->kapcsolat;
    }

    public function __construct() {

        $this->kapcsolat = sqlsrv_connect($this->serverName, $this->connectionInfo);
        /* $this->kapcsolat = new mysqli($this->host, $this->felhasznalonev, $this->jelszo, $this->abNev);
          $szoveg = "";
          if ($this->kapcsolat->connect_error) {
          $szoveg = "<p>Hiba: " . $this->kapcsolat->connect_error . ".</p>";
          }

          //ékezetes betűk
          $this->kapcsolat->query("SET NAMES UTF8");
          $this->kapcsolat->query("set character set UTF8");
          $this->kapcsolat->query("set collation_connection='utf8_hungary_ci'");

          echo $szoveg; */
    }

    public function kapcsolatBezar() {
        //$this->kapcsolat->close();
        sqlsrv_close($this->kapcsolat);
    }

    public function select($tablaNeve, $where) {
        /* $sql = "SELECT * FROM " . $tablaNeve . " WHERE " . $where;
          $sql = $this->kapcsolat->query($sql);
          return $sql; */

        if ($where === "") {
            $sql = "SELECT * FROM " . $tablaNeve;
        } else {
            $sql = "SELECT * FROM " . $tablaNeve . " WHERE " . $where;
        }


        echo $sql;
        $vmi = sqlsrv_query($this->kapcsolat, $sql);
        $adatok = array();

        if (sqlsrv_query($this->kapcsolat, $sql)) {
            while ($row = sqlsrv_fetch_array($vmi, SQLSRV_FETCH_ASSOC)) {
                // echo $row['modell'] . ", " . $row['marka'] . "<br />";
                array_push($adatok, $row['felhasznalonev'] . ", " . $row['vezeteknev'] . "<br />");
            }
        }
        return $adatok;
    }

    public function insert($tablaNeve, $oszlopok, $ertekek) {

        $sql = "INSERT INTO " . $tablaNeve . " " . $oszlopok . " VALUES (" . $ertekek . ")";

        echo $sql;
        echo '<br>Ellenőrzés<br>';
        $result = sqlsrv_query($this->kapcsolat, $sql);
        /* $vmi = sqlsrv_query($this->kapcsolat, $sql);

          if (sqlsrv_query($this->kapcsolat, $sql)) {
          echo 'valami';
          while ($row = sqlsrv_fetch_array($vmi, SQLSRV_FETCH_ASSOC)) {
          echo $row['felhasznalonev'] . "<br />";
          }
          } else{
          echo 'semmi';
          } */

        if ($result === false) {
            die(print_r(sqlsrv_errors(), true));
        }
    }

    public function update($tablaNeve, $ujErtekek, $where) {
        /* $sql = "UPDATE " . $tablaNeve . " SET " . $ujErtekek . " WHERE " . $where;
          $sql = $this->kapcsolat->query($sql);
          if ($sql == true) {
          return true;
          } else {
          return false;
          } */
        if ($where === "") {
            $sql = "UPDATE " . $tablaNeve . " SET " . $ujErtekek;
        } else {
            $sql = "UPDATE " . $tablaNeve . " SET " . $ujErtekek . " WHERE " . $where;
        }

        $vmi = sqlsrv_query($this->kapcsolat, $sql);
    }

    public function delete($tablaNeve, $where) {
        /* $sql = "DELETE FROM " . $tablaNeve . " WHERE " . $where;
          $sql = $this->kapcsolat->query($sql);
          if ($sql == true) {
          return true;
          } else {
          return false;
          } */
        if ($where === "") {
            $sql = "DELETE FROM " . $tablaNeve;
        } else {
            $sql = "DELETE FROM " . $tablaNeve . " WHERE " . $where;
        }

        $vmi = sqlsrv_query($this->kapcsolat, $sql);
    }

}
