
<?php

class Menu {

    public function __construct() {
        
    }

    public function navIndex() {
        ?>
        <div id = "menu">
            <li><a href = "index.php">Főoldal</a></li>
            <li><a href = "php/borondok.php">Bőröndök</a></li>
            <li><a href = "php/kapcsolat.php">Kapcsolat</a></li>
            <li><a href = "php/kosar.php">Kosár</a></li>
        </div>
        <?php
    }

    public function navOldalak() {
        ?>
        <div id = "menu">
            <li><a href = "../index.php">Főoldal</a></li>
            <li><a href = "borondok.php">Bőröndök</a></li>
            <li><a href = "kapcsolat.php">Kapcsolat</a></li>
            <li><a href = "kosar.php">Kosár</a></li>
        </div>
        <?php
    }

}
