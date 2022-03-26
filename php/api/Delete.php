<?php

$tablaNeve = $_GET['tablaNeve'];
$where = $_GET['where'];

$update = new Delete();
$update->delete($tablaNeve, $where);

class Delete {

    public function __construct() {
        
    }

    public function delete($tablaNeve, $where) {
        include_once '../Ab.php';
        $ab = new Ab();
        $ab->delete($tablaNeve, $where);
    }

}
