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
    //private $serverName = "WIN10X64HUN61\SQLEXPRESS";
    private $connectionInfo = array("Database" => "Szakdoga_adattal", "CharacterSet" => "UTF-8");
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

    public function select($mit, $tablaNeve, $where) {
        $oszlopok = "SELECT distinct COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME like '" . $tablaNeve . "'";
        $sql = "SELECT " . $mit . " FROM " . $tablaNeve . " " . $where;
        $tomb = array();
        $adatok = sqlsrv_query($this->kapcsolat, $sql);

        $oszlopLekerdezes = sqlsrv_query($this->kapcsolat, $oszlopok);
        $oszlopNevek = array();
        while ($row = sqlsrv_fetch_array($oszlopLekerdezes, SQLSRV_FETCH_ASSOC)) {
            array_push($oszlopNevek, $row['COLUMN_NAME']);
        }

        if ($mit == "*") {
            while ($row = sqlsrv_fetch_array($adatok, SQLSRV_FETCH_ASSOC)) {
                //$tomb[$mit]=$row[$mit];
                for ($index = 0; $index < count($oszlopNevek); $index++) {
                    $tomb[$oszlopNevek[$index]] = $row[$oszlopNevek[$index]];
                }
            }
        } else {
            while ($row = sqlsrv_fetch_array($adatok, SQLSRV_FETCH_ASSOC)) {
                $tomb[$mit] = $row[$mit];
            }
        }


        return $tomb;
    }

    public function selectTobbtablas($mit, $tablaNeve, $honnan, $where, $segedTabla) {

        if ($segedTabla === "") {
            $oszlopok = "SELECT distinct COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME like '" . $tablaNeve . "'";
        } else {
            $oszlopok = "SELECT distinct COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME like '" . $tablaNeve . "' or TABLE_NAME like '" . $segedTabla . "'";
        }

        $oszlopLekerdezes = sqlsrv_query($this->kapcsolat, $oszlopok);
        $oszlopNevek = array();
        while ($row = sqlsrv_fetch_array($oszlopLekerdezes, SQLSRV_FETCH_ASSOC)) {
            array_push($oszlopNevek, $row['COLUMN_NAME']);
        }

        //var_dump($oszlopNevek);
        if ($where === "") {
            $sql = "SELECT " . $mit . " FROM " . $honnan;
        } else {
            $sql = "SELECT " . $mit . " FROM " . $honnan . " " . $where;
        }

        if ($honnan === "" and $segedTabla === "") {
            $sql = "SELECT " . $mit . " FROM " . $tablaNeve . " " . $where;
        }

        // echo $sql;
        $tomb = array();
        $adatok = sqlsrv_query($this->kapcsolat, $sql, array(), array("Scrollable" => "buffered"));

        if (sqlsrv_num_rows($adatok) > 0) {
            while ($row = sqlsrv_fetch_array($adatok, SQLSRV_FETCH_ASSOC)) {
                for ($index = 0; $index < count($oszlopNevek); $index++) {
                    $type = gettype($row[$oszlopNevek[$index]]);
                    if ($type != "object") {
                        $seged[$oszlopNevek[$index]] = strval($row[$oszlopNevek[$index]]);
                    }
                    //echo serialize($row[$oszlopNevek[$index]]);
                }
                array_push($tomb, $seged);
                //$tomb[] = array_map('utf8_encode', $seged);
            }
        }

        /*  $myJSON = json_encode($tomb, JSON_UNESCAPED_UNICODE);
          $bytes = file_put_contents("top10.json", $myJSON); */

        //var_dump($tomb);
        //return json_encode($tomb);  
        return $tomb;
    }

    public function insert($tablaNeve, $oszlopok, $ertekek) {
        $sql = "INSERT INTO " . $tablaNeve . " " . $oszlopok . " VALUES (" . $ertekek . ")";
        // echo $sql;
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
        echo $sql;
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
