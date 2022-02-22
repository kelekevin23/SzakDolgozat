<?php

$mit = $_GET['mit'];
$tablaNeve = $_GET['tablaNeve'];
$honnan = $_GET['honnan'];
$where = $_GET['where'];
$segedTabla = $_GET['segedTabla'];
//$mit, $tablaNeve, $honnan, $where, $segedTabla
//"top 9 c.*, m.marka", "Cikk", "Cikk c inner join Modell m on c.modell = m.modell", "order by keszlet desc", "Modell"
my_func($mit, $tablaNeve, $honnan, $where, $segedTabla);

function my_func($mit, $tablaNeve, $honnan, $where, $segedTabla) {
    
    include_once 'Ab.php';
    $ab = new Ab();
    $lista = $ab->select($mit, $tablaNeve, $honnan, $where, $segedTabla);
    
    echo json_encode($lista);
    //var_dump($lista);
}

