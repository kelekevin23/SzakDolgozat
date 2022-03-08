
<?php
if (isset($_SESSION['felhasznalonev'])) {
    ?>
    <div id="panel">
        <p id="udvozles">Üdv <?php echo utf8_encode($_SESSION['felhasznalonev']) ?></p>
        <form method="post" id="kijelentkezesForm">
            <button type="submit" id="kijelentkezes" name="kijelentkezes">Kijelentkezés</button>
        </form>                     
    </div>
    <?php
} else {
    ?>
    <div id="panel">
        <button id="belepes">Belépés</button>
        <button id="regisztracio">Regisztráció</button>                        
    </div>
    <?php
}

if (isset($_POST["kijelentkezes"])) {
    session_destroy();
    $aktualisOldal = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $aktualisOldal = basename($aktualisOldal);
    if ($aktualisOldal == "index.php") {
        header('location: index.php');
    } else {
        echo $aktualisOldal;
        header('location: ../index.php');
    }
    
}
?>
