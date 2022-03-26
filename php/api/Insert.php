<?php

$tablaNeve = $_GET['tablaNeve'];
$oszlopok = $_GET['oszlopok'];
$ertekek = $_GET['ertekek'];

$insert = new Insert();
$insert->insert($tablaNeve, $oszlopok, $ertekek);

class Insert {

    public function __construct() {
        
    }

    public function insert($tablaNeve, $oszlopok, $ertekek) {
        include_once '../Ab.php';
        $ab = new Ab();
        $ab->insert($tablaNeve, $oszlopok, $ertekek);
    }

}
