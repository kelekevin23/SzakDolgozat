<?php
include_once 'Ab.php';
$ab = new Ab();

$adat = $ab->select("Felhasznalok", "");


echo "<br>Adatok<br>";

var_dump($adat);
?>