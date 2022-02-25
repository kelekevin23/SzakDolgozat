<?php

$mit = $_GET['mit'];
$tablaNeve = $_GET['tablaNeve'];
$honnan = $_GET['honnan'];
$where = $_GET['where'];
$segedTabla = $_GET['segedTabla'];

my_func($mit, $tablaNeve, $honnan, $where, $segedTabla);

function my_func($mit, $tablaNeve, $honnan, $where, $segedTabla) {
    
    include_once 'Ab.php';
    $ab = new Ab();
    $lista = $ab->selectTobbtablas($mit, $tablaNeve, $honnan, $where, $segedTabla);
    
    echo json_encode($lista);

}

