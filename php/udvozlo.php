
<?php
if (isset($_SESSION['keresztnev'])) {
    ?>
    <div id="panel">
        <h1>Üdv <?php echo utf8_encode($_SESSION['keresztnev']) ?></h1>
        <form method="post">
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
