<!DOCTYPE html>
<?php
include_once '../session.php';
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Szakdolgozat</title>
        <script src="../../js/jquery-3.6.0.min.js"></script>
        <script src="../../js/menu.js"></script>
        <script src="../../js/ajax.js"></script>
        <script src="../../js/admin.js"></script>
        <script src="../../js/bejelentkezes_regisztracio.js"></script>
        <link href="../../css/szerkezet.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/tartalom.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/tartalomFelhasznalok.css" rel="stylesheet" type="text/css"/>
        <link href="../../css/reszponzivitas.css" rel="stylesheet" type="text/css"/>   
    </head>
    <body>
        <main>
            <div class="header-container">
                <header>
                    <h1>B-Shop</h1>
                    <div class="kereso-panel">
                        <input type="text" placeholder="Keresés..." name="kereso" id="keresosav">
                    </div>
                    <?php
                    include_once '../udvozlo.php';
                    ?>

                </header>
                <nav>
                    <?php
                    include_once '../nav.php';
                    $menu = new Menu();
                    $menu->navAdmin();
                    ?>
                </nav>
            </div>
            <section class="adminRendezes">

                <div class="rendelesStatusz">
                    <div id="csomagRendelesek"></div>

                    <div id="kivalasztott">
                        <form class="osszecsomagolas" method="post">
                            <label for="rendszam">Kiválasztott rendszám:</label>
                            <input type="text" id="rendszam" name="rendszam" value="" readonly="readonly">
                            <button type="submit" name="kivalasztas" id="kivalasztas">Összecsomagolva!</button>
                        </form>
                    </div>
                </div>

                <div class="borondBeszerzes">
                    <div id="borondSzerkesztes"></div>

                </div>
            </section>
        </main>
    </body>
</html>
<?php
include_once '../Ab.php';
$ab = new Ab();

function test_input3($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if (isset($_POST["kivalasztas"])) {
    $rendszam = test_input3($_POST["rendszam"]);
    $fnev = $_SESSION['felhasznalonev'];
    if ($rendszam !== "") {
        $ab->update("Rendeles", "rstatusz = 2", "rend_szam = " . $rendszam);
    }
}
if (isset($_POST["szerkesztes"])) {
    $index = test_input3($_POST["szerkesztes"]);
    
    $adottId = test_input3($_POST["id" . $index]);
    $cikkszam = test_input3($_POST["cikkszam" . $index]);
    $darabszam = test_input3($_POST["darabszam" . $index]);

    $ab->update("Cikk", "keszlet +=" . $darabszam, " cikkszam like " . $cikkszam);
    $ab->delete("Beszerzes", " id = " . $adottId);
}
?>